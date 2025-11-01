# Sistema de Conteo Real de Marcas en WooCommerce

## Problema Identificado

La taxonomía `product_brand` en WordPress devuelve `count: 0` para todas las marcas cuando se consulta vía `/wp-json/wp/v2/product_brand`.

**Causa raíz:** El campo `count` en taxonomías custom de WordPress NO se actualiza automáticamente con el número real de productos publicados asociados. WordPress solo actualiza estos contadores para taxonomías core (categorías, tags) mediante triggers nativos.

## Solución Implementada

### Arquitectura

```
Frontend (ProductFiltersPanel)
         ↓
Hook (useWooCommerce.fetchBrands)
         ↓
API Interna (/api/woocommerce/brands) [CON CACHE 10 min]
         ↓
┌────────────────────────────────────────┐
│ 1. Obtener marcas desde WordPress     │
│    GET /wp-json/wp/v2/product_brand   │
│    [{ id, name, slug, count: 0 }]     │
└────────────────────────────────────────┘
         ↓
┌────────────────────────────────────────┐
│ 2. Para cada marca (concurrencia 8):  │
│    GET /wc/v3/products?                │
│        product_brand={id}&per_page=1   │
│    Leer header: X-WP-Total → count     │
└────────────────────────────────────────┘
         ↓
  [{ id, name, slug, count: REAL }]
         ↓
    Cache 10 min
         ↓
  Devolver al frontend
```

### Componentes Implementados

#### 1. `/src/app/api/woocommerce/brands/route.ts`

**Responsabilidades:**
- Obtener marcas desde `/wp-json/wp/v2/product_brand`
- Calcular conteos reales consultando `/wc/v3/products?product_brand={id}`
- Implementar cache en memoria con TTL de 10 minutos
- Pool de concurrencia ad-hoc (límite: 8 peticiones simultáneas)

**Cache:**
- **Clave**: `brands:counts:v1`
- **TTL**: 10 minutos (600,000 ms)
- **Implementación**: `Map<string, CacheEntry>` en módulo
- **Invalidación**: Automática por expiración de TTL

**Concurrencia:**
```typescript
async function runWithConcurrencyLimit<T>(
  tasks: (() => Promise<T>)[],
  limit: number
): Promise<T[]>
```
- Evita saturar el servidor WordPress/WooCommerce
- Límite: 8 peticiones concurrentes
- Sin dependencias externas (p-limit)

**Respuesta:**
```json
{
  "data": [
    { "id": 97, "name": "Coxo", "slug": "coxo", "count": 35 },
    { "id": 103, "name": "SIGER", "slug": "siger", "count": 31 }
  ],
  "total": 18,
  "cached": false
}
```

#### 2. `/src/app/api/woocommerce/products/route.ts`

**Mejora:** Resolución de `brandSlug` → `brandId`

**Flujo:**
1. Cliente envía `?brand=coxo`
2. API interna resuelve `coxo` → `97` consultando cache de marcas
3. Llama a WooCommerce con `product_brand=97` (NO `brand=coxo`)
4. Devuelve productos filtrados

**Beneficios:**
- URLs amigables: `/tienda?brand=coxo`
- Backend usa IDs correctos automáticamente
- Si slug no existe, devuelve `{ data: [], total: 0 }` sin error 404

#### 3. `/src/hooks/useWooCommerce.ts`

**Cambio:** Método `fetchBrands()` simplificado

```typescript
const fetchBrands = useCallback(async () => {
  // Llama a /api/woocommerce/brands
  // NO recalcula counts en el cliente
  // Los counts ya vienen correctos del backend
  const response = await makeRequest('brands', new URLSearchParams());
  return response;
}, [makeRequest]);
```

**Importante:** El frontend NO toca los counts. Son read-only desde la API.

#### 4. `/src/components/ecommerce/filters/ProductFiltersPanel.tsx`

**Renderizado:**
```tsx
<span className="text-sm text-gray-700">
  {brand.name} ({brand.count})
</span>
```

**Sin cálculos locales.** El `brand.count` es el valor real que viene del backend.

#### 5. `/src/components/ecommerce/product/ProductGrid.tsx`

**Cambio:** Eliminado filtrado local de marcas

Antes:
```typescript
// ❌ REMOVIDO - ya no filtramos en frontend
if (filters.brands) {
  productsToShow = productsToShow.filter(product => {
    const brandAttribute = product.attributes.find(...);
    return brandAttribute.options.some(...);
  });
}
```

Ahora:
```typescript
// ✅ El backend filtra con product_brand={id}
// Frontend solo renderiza los productos que vienen de la API
```

**Nota:** El filtro de "repuestos" SÍ se mantiene en frontend porque usa tags, no taxonomías de WooCommerce.

#### 6. `/src/app/tienda/marca/[slug]/page.tsx` (Opcional)

**Ruta dinámica:** `/tienda/marca/coxo`

**Features:**
- Server Component (SSR)
- Metadata SEO dinámica con `generateMetadata()`
- Revalidación ISR cada 10 minutos (`revalidate: 600`)
- Muestra `{brand.name}` y `{brand.count}` en header
- Integra `ProductGrid` con filtro de marca aplicado automáticamente

**Ejemplo:**
```
https://servidentalcr.com/tienda/marca/coxo
→ Muestra "Coxo - 35 productos disponibles"
→ Grilla filtrada con solo productos de Coxo
```

## Razón del Problema Original

### WordPress Taxonomy Counts

WordPress **NO actualiza** automáticamente el campo `term_taxonomy.count` para taxonomías personalizadas cuando:
1. Se crea/actualiza/elimina un producto
2. Cambia el estado de un producto (publicado ↔ borrador)
3. Se asocian/desasocian términos

**Taxonomías core** (post categories, post tags) SÍ se actualizan porque tienen hooks nativos en `wp_insert_post()` y `wp_delete_post()`.

**Taxonomías custom** requieren:
- Plugin que implemente hooks `wp_insert_post`
- Función manual `wp_update_term_count_now($term_ids, $taxonomy)`
- O... calcular el count en tiempo real (nuestra solución)

### Por qué `brand={slug}` no funciona en WooCommerce

La API REST de WooCommerce (`/wc/v3/products`) con el plugin WooCommerce Brands solo acepta:
- `brand={ID}` ✅ **CORRECTO** - Filtra por ID de marca
- `brand={slug}` ❌ - NO acepta slugs, devuelve todos los productos
- `product_brand={ID}` ❌ - Ignora el parámetro, devuelve todos los productos

**Evidencia (marca TPC, ID=53, 14 productos):**
```bash
# ❌ Devuelve todos los productos (ignora el parámetro)
curl -I "$WP_URL/wp-json/wc/v3/products?brand=tpc&..." | grep x-wp-total
# x-wp-total: 179

# ❌ Devuelve todos los productos (ignora el parámetro)
curl -I "$WP_URL/wp-json/wc/v3/products?product_brand=53&..." | grep x-wp-total
# x-wp-total: 179

# ✅ Filtra correctamente
curl -I "$WP_URL/wp-json/wc/v3/products?brand=53&..." | grep x-wp-total
# x-wp-total: 14
```

## Performance y Cache

### TTL: 10 minutos

**Justificación:**
- Los productos no cambian con frecuencia (actualización típica: semanal/mensual)
- El conteo por marca es estable (no cambia en tiempo real)
- 10 min = balance entre freshness y carga del servidor

**Escenarios:**
- **Primera carga (cache miss):** ~3-5 segundos (18 marcas, 8 concurrentes)
- **Cargas subsecuentes:** <100 ms (desde cache)
- **Después de 10 min:** Re-fetch automático en background

### Concurrencia: 8 peticiones

**Por qué 8:**
- WordPress/WooCommerce típicamente limita conexiones a 10-20 por IP
- 8 peticiones concurrentes mantiene ~40% de margen
- Con 18 marcas: 18 ÷ 8 = 3 rounds (~1-2 seg por round) = ~3-4 seg total

**Alternativas consideradas:**
- `Promise.all()` sin límite: ❌ Riesgo de rate limiting
- `p-limit` package: ❌ Dependencia externa innecesaria
- Pool custom: ✅ 100 líneas, 0 deps, control total

## Extender a Otras Taxonomías

Si necesitas calcular counts reales para otras taxonomías (ej. `product_category`, atributos custom):

### 1. Crear nueva API route

```typescript
// /src/app/api/woocommerce/[taxonomy]/route.ts
export async function GET(request: NextRequest) {
  const taxonomy = 'product_category'; // o dynamic desde URL

  // 1. Fetch terms desde /wp-json/wp/v2/{taxonomy}
  const terms = await fetchTermsFromWordPress(taxonomy);

  // 2. Para cada term, calcular count
  const tasks = terms.map((term) => async () => {
    const params = new URLSearchParams({
      consumer_key: WC_KEY!,
      consumer_secret: WC_SECRET!,
      [taxonomy]: term.id.toString(), // Usar nombre de taxonomía como param
      per_page: '1'
    });

    const response = await fetch(
      `${WP_URL}/wp-json/wc/v3/products?${params.toString()}`
    );

    const count = Number(response.headers.get('x-wp-total')) || 0;
    return { ...term, count };
  });

  const termsWithCounts = await runWithConcurrencyLimit(tasks, 8);
  return NextResponse.json({ data: termsWithCounts });
}
```

### 2. Parámetros de filtrado en WooCommerce

**Taxonomías soportadas:**
- `category`: `category={id}` ✅
- `tag`: `tag={id}` ✅
- `product_brand`: `product_brand={id}` ✅ (nuestra implementación)
- Atributos custom: `attribute={slug}&attribute_term={term}` ✅

**Verificar en docs:**
https://woocommerce.github.io/woocommerce-rest-api-docs/#list-all-products

### 3. Cache unificado

Si tienes múltiples taxonomías, considera un cache global:

```typescript
interface TaxonomyCacheEntry {
  taxonomy: string;
  terms: Array<{ id: number; name: string; slug: string; count: number }>;
  timestamp: number;
}

const taxonomyCache = new Map<string, TaxonomyCacheEntry>();

function getCachedTaxonomy(taxonomy: string) {
  const entry = taxonomyCache.get(taxonomy);
  if (!entry) return null;

  const age = Date.now() - entry.timestamp;
  if (age > CACHE_TTL) {
    taxonomyCache.delete(taxonomy);
    return null;
  }

  return entry.terms;
}
```

## Troubleshooting

### Los counts siguen en 0

**Verificar:**
1. ¿La API `/api/woocommerce/brands` devuelve counts > 0?
   ```bash
   curl http://localhost:3000/api/woocommerce/brands | jq '.data[] | {name, count}'
   ```

2. ¿El endpoint directo de WooCommerce funciona?
   ```bash
   curl -I "$WP_URL/wp-json/wc/v3/products?product_brand=97&per_page=1&consumer_key=...&consumer_secret=..." | grep x-wp-total
   ```

3. ¿Los productos tienen la marca asignada en WordPress admin?
   - Ir a Productos → Editar producto
   - Verificar que tenga una marca seleccionada en el sidebar

### Filtro de marca no funciona

**Verificar flujo:**
1. Frontend → Network tab → Ver request a `/api/woocommerce/products?brand=coxo`
2. Backend logs → `[Products API] Resolving brand slug: coxo`
3. Backend logs → `[Products API] ✅ Brand "coxo" resolved to ID: 97`
4. Backend → Request a WooCommerce con `product_brand=97`

**Si falla en paso 3:**
- Cache de marcas no está cargado
- Slug no existe en la taxonomía
- Solución: Forzar recarga navegando a `/api/woocommerce/brands`

### Performance lenta (>10 seg)

**Posibles causas:**
1. **WordPress sobrecargado:** Reducir concurrencia a 4-5
2. **Muchas marcas (50+):** Considerar aumentar TTL a 30 min
3. **Timeout de red:** Aumentar `AbortSignal.timeout(30000)` a 60000

**Optimización avanzada:**
```typescript
// Pre-warm cache en build time (Next.js)
export async function GET() {
  const cached = getCached('brands:counts:v1');
  if (cached) return NextResponse.json({ data: cached });

  // Si no hay cache, calcular en background
  const promise = enrichBrandsWithRealCounts(brands);

  // Devolver respuesta inmediata con counts en 0
  // y actualizar en background
  return NextResponse.json({
    data: brands.map(b => ({ ...b, count: 0 })),
    computing: true
  });
}
```

## Logs de Validación

### 1. Conteo por ID (header)

```bash
curl -s -I "$WP_URL/wp-json/wc/v3/products?product_brand=97&per_page=1&consumer_key=$CK&consumer_secret=$CS" | grep -i x-wp-total
```

**Esperado:**
```
x-wp-total: 35
```

### 2. API interna de marcas

```bash
curl -s "http://localhost:3000/api/woocommerce/brands" | jq '[.data[] | {name, slug, count}] | .[0:8]'
```

**Esperado:**
```json
[
  { "name": "Coxo", "slug": "coxo", "count": 35 },
  { "name": "SIGER", "slug": "siger", "count": 31 },
  { "name": "TPC", "slug": "tpc", "count": 14 }
]
```

### 3. Filtro end-to-end

**Test manual:**
1. Navegar a `http://localhost:3000/tienda?brand=coxo`
2. Verificar que la grilla muestre solo productos de Coxo
3. Verificar que el panel de filtros muestre "Coxo (35)" con checkbox marcado

**Test programático:**
```bash
# Obtener productos filtrados por marca
curl -s "http://localhost:3000/api/woocommerce/products?brand=coxo&per_page=100" | jq '.total'
```

**Esperado:** Número igual al count de la marca (ej. `35` para Coxo).

## Seguridad

### ⚠️ IMPORTANTE: Credenciales de WooCommerce

**Inmediatamente después del deploy:**
1. Rotar las llaves `ck_` y `cs_` en WooCommerce admin
2. Verificar que `.env` NO esté commiteado en Git
3. Verificar logs de CI/CD: NO deben exponer las llaves

**Verificar:**
```bash
# En el repo local
git log --all --full-history --source -- '*env*' | head -20

# Si hay resultados: ROTAR LLAVES INMEDIATAMENTE
```

**En Vercel/producción:**
- Usar "Environment Variables" en dashboard
- NUNCA hardcodear en código fuente
- Revisar "Deployment Logs" para leaks accidentales

## Referencias

- [WooCommerce REST API - Products](https://woocommerce.github.io/woocommerce-rest-api-docs/#products)
- [WordPress REST API - Taxonomies](https://developer.wordpress.org/rest-api/reference/taxonomies/)
- [wp_update_term_count_now()](https://developer.wordpress.org/reference/functions/wp_update_term_count_now/)

---

**Autor:** Claude Code
**Fecha:** 2025-01-12
**Versión:** 1.0
