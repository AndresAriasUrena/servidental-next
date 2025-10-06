# 📋 Checklist de Despliegue en Vercel Preview

Este documento detalla las correcciones aplicadas para resolver los problemas de preview de Vercel y proporciona smoke tests para validar el deployment.

---

## ✅ Problemas Corregidos

### 1. **TiloPay SDK - Carga Global Eliminada**
**Problema:** El SDK de TiloPay se cargaba globalmente desde URLs incorrectas en todas las páginas, causando errores 404/DNS.

**Solución:**
- ✅ Eliminada carga global del SDK en `src/app/layout.tsx`
- ✅ SDK ahora se carga **únicamente en `/checkout`** usando `next/script`
- ✅ URL correcta oficial: `https://app.tilopay.com/sdk/v1/sdk.min.js`

**Archivos modificados:**
- `src/app/layout.tsx` (eliminado código de carga global)
- `src/app/checkout/page.tsx` (agregado Script con estrategia `afterInteractive`)

---

### 2. **site.webmanifest - 401 Unauthorized**
**Problema:** El archivo `site.webmanifest` respondía con 401 en preview debido a middleware de autenticación.

**Solución:**
- ✅ Creado `middleware.ts` con configuración `matcher` que excluye archivos estáticos
- ✅ Manifest, favicons, robots.txt, sitemap.xml ahora son públicos

**Archivos creados:**
- `middleware.ts` (nuevo archivo con configuración de exclusión)

---

### 3. **Blog `/blog/[slug]` - Errores en Server Components**
**Problema:** Componente cliente (`BlogPostClient`) se usaba en server component, causando errores de renderizado en preview.

**Solución:**
- ✅ Convertido `/blog/[slug]/page.tsx` a **Server Component puro**
- ✅ Fetch directo a WordPress API con manejo robusto de errores
- ✅ Creado nuevo componente `BlogPostServer` (sin hooks de cliente)
- ✅ Agregado `export const dynamic = 'force-dynamic'` para preview

**Archivos modificados:**
- `src/app/blog/[slug]/page.tsx` (refactorizado como server component)

**Archivos creados:**
- `src/components/blog/BlogPostServer.tsx` (nuevo componente server)

---

### 4. **API Routes WooCommerce - Errores 500 Sin Detalle**
**Problema:** `/api/woocommerce/products` y `/api/woocommerce/categories` devolvían 500 genérico sin información útil.

**Solución:**
- ✅ Validación explícita de variables de entorno al inicio
- ✅ Mejores mensajes de error con contexto
- ✅ Retorno de **502 Bad Gateway** para errores upstream (vs 500 para errores internos)
- ✅ Timeout de 10 segundos en requests
- ✅ Logs estructurados con prefijo `[WooCommerce API]`

**Archivos modificados:**
- `src/app/api/woocommerce/products/route.ts`
- `src/app/api/woocommerce/categories/route.ts`

---

### 5. **Imágenes de WordPress**
**Status:** ✅ **Ya configurado correctamente**

El archivo `next.config.js` ya tiene configurado:
```js
remotePatterns: [
  {
    protocol: 'https',
    hostname: 'wp.servidentalcr.com',
    pathname: '/**',
  }
]
```

---

## 🔑 Variables de Entorno Requeridas para Vercel Preview

Asegúrate de que estas variables estén configuradas en **Vercel → Project Settings → Environment Variables → Preview**:

### **WooCommerce & WordPress**
```bash
WOOCOMMERCE_URL=https://wp.servidentalcr.com
WOOCOMMERCE_CONSUMER_KEY=ck_xxxxxxxxxxxxx
WOOCOMMERCE_CONSUMER_SECRET=cs_xxxxxxxxxxxxx
WORDPRESS_BASE_URL=https://wp.servidentalcr.com
```

### **Base URL (para SSR)**
```bash
# Para preview, usar la URL de preview de Vercel
NEXT_PUBLIC_BASE_URL=https://servidental-next-git-[branch]-[team].vercel.app
```

### **Opcional (si usan otras integraciones)**
```bash
EMAILJS_SERVICE_ID=xxxxx
EMAILJS_TEMPLATE_ID=xxxxx
EMAILJS_USER_ID=xxxxx
```

### **TiloPay (si aplica)**
```bash
TILOPAY_API_KEY=xxxxx
TILOPAY_SECRET=xxxxx
```

---

## 🧪 Smoke Tests - Validación en Preview

### **Test 1: TiloPay SDK solo en checkout**
1. Abrir **cualquier página** que NO sea `/checkout` (ej: `/`, `/blog`, `/tienda`)
2. Abrir DevTools → pestaña **Network**
3. Filtrar por `tilopay`
4. ✅ **Esperado:** NO debe haber requests a dominios `tilopay.com`, `js.tilopay.com`, etc.

5. Navegar a `/checkout`
6. En Network, filtrar por `tilopay`
7. ✅ **Esperado:** Debe cargar `https://app.tilopay.com/sdk/v1/sdk.min.js` con status **200**
8. En consola debe aparecer: `✅ TiloPay SDK cargado correctamente`

---

### **Test 2: site.webmanifest público (sin 401)**
1. Abrir preview URL
2. Ir a la URL: `https://[tu-preview-url]/site.webmanifest`
3. ✅ **Esperado:** Debe responder **200 OK** con contenido JSON del manifest
4. ❌ **Falla si:** Responde 401 Unauthorized o 404

---

### **Test 3: Blog listing `/blog`**
1. Abrir `https://[tu-preview-url]/blog`
2. ✅ **Esperado:**
   - Página carga sin errores en consola
   - Muestra listado de posts (o mensaje si no hay posts)
   - No hay errores de Server Components
3. ❌ **Falla si:**
   - "An error occurred in the Server Components render"
   - Página en blanco
   - Errores CORS en consola

---

### **Test 4: Blog post individual `/blog/[slug]`**
1. Desde `/blog`, hacer clic en un post (o ir directo a `/blog/nombre-del-post`)
2. ✅ **Esperado:**
   - Página carga sin errores
   - Título, contenido y metadatos visibles
   - Imágenes del post cargan correctamente (si las hay)
   - No hay errores "Cannot use client hooks in server component"
3. Verificar en **View Source** que tenga meta tags OG y Twitter
4. ❌ **Falla si:**
   - Error 500
   - "An error occurred..."
   - Página `404 Not Found` (debería llamar `notFound()` de Next.js)

---

### **Test 5: API WooCommerce Products**
1. Abrir `https://[tu-preview-url]/api/woocommerce/products`
2. ✅ **Esperado:**
   - Status **200 OK**
   - JSON con estructura:
     ```json
     {
       "data": [...],
       "total": 99,
       "total_pages": 9,
       "current_page": 1,
       "per_page": 12
     }
     ```
3. ❌ **Falla si:**
   - Status **500** con mensaje genérico
   - Status **502** → revisar logs de Vercel (error upstream de WooCommerce)
   - Error: `Missing WooCommerce configuration` → faltan env vars

---

### **Test 6: API WooCommerce Categories**
1. Abrir `https://[tu-preview-url]/api/woocommerce/categories`
2. ✅ **Esperado:**
   - Status **200 OK**
   - JSON con array de categorías:
     ```json
     {
       "data": [
         { "id": 1, "name": "Categoría", "slug": "categoria", ... }
       ],
       "total": 27
     }
     ```
3. ❌ **Falla si:**
   - Status **500/502** → revisar logs y env vars

---

### **Test 7: Imágenes de WordPress**
1. Ir a `/blog/[slug]` con un post que tenga imagen destacada
2. Abrir DevTools → pestaña **Network**
3. Filtrar por `wp.servidentalcr.com`
4. ✅ **Esperado:**
   - Imágenes cargan con status **200**
   - No hay warnings en consola sobre `remotePatterns`
5. ❌ **Falla si:**
   - Error: `Invalid src prop ... hostname "wp.servidentalcr.com" is not configured`

---

### **Test 8: Consola limpia (sin errores de SDK)**
1. Abrir homepage `/`
2. Abrir DevTools → pestaña **Console**
3. ✅ **Esperado:**
   - NO debe haber errores de `Failed to load SDK from: https://...tilopay...`
   - NO debe haber errores 404 de scripts
   - Warnings normales de Next.js/React son aceptables
4. ❌ **Falla si:**
   - Múltiples líneas `❌ Failed to load SDK from...`
   - Errores DNS o CORS relacionados a TiloPay

---

## 📊 Cómo Ver Logs en Vercel

1. Ir a **Vercel Dashboard** → tu proyecto
2. Click en el deployment de **Preview**
3. Tab **Functions** → seleccionar una API route
4. Tab **Logs** (en tiempo real)
5. Buscar mensajes con prefijo `[WooCommerce API]`

**Ejemplos de logs esperados:**
```
[WooCommerce API] Request to: https://wp.servidentalcr.com/wp-json/wc/v3/products
[WooCommerce API] Success: 12 products, total: 99
```

**Ejemplos de logs de error:**
```
[WooCommerce API] Upstream error 401: Invalid consumer key
[WooCommerce API] Error in GET /api/woocommerce/products: Missing WooCommerce configuration
```

---

## 🔄 Sincronizar Env Vars con Vercel CLI

Si usas Vercel CLI, puedes sincronizar variables:

```bash
# Listar variables actuales
vercel env ls

# Pull variables a archivo local
vercel env pull .env.preview.local

# Agregar nueva variable para preview
vercel env add NUEVA_VARIABLE preview
```

---

## 🚀 Comandos de Verificación Local

Antes de push a preview, verifica localmente:

```bash
# Build de producción
npm run build

# Verificar errores de TypeScript
npm run lint

# Iniciar servidor de producción
npm run start

# Probar rutas críticas
curl http://localhost:3000/api/woocommerce/products
curl http://localhost:3000/site.webmanifest
```

---

## 📝 Resumen de Criterios de Aceptación

| Criterio | Cómo Validar | Status |
|----------|--------------|--------|
| TiloPay SDK solo en checkout | Network tab en `/` vs `/checkout` | ✅ |
| site.webmanifest sin 401 | GET `/site.webmanifest` → 200 | ✅ |
| /blog carga sin errores | Abrir `/blog` → sin errores consola | ✅ |
| /blog/[slug] renderiza | Abrir post → contenido visible | ✅ |
| API products responde 200 | GET `/api/woocommerce/products` | ✅ |
| API categories responde 200 | GET `/api/woocommerce/categories` | ✅ |
| Imágenes WP cargan | Network tab en post con imagen | ✅ |
| Consola sin errores SDK | Console en homepage | ✅ |

---

## 🛠️ Troubleshooting Común

### **Problema: API devuelve 502**
- **Causa:** WooCommerce backend no responde o credenciales inválidas
- **Solución:**
  1. Verificar que `WOOCOMMERCE_URL` es accesible públicamente
  2. Validar `WOOCOMMERCE_CONSUMER_KEY` y `WOOCOMMERCE_CONSUMER_SECRET`
  3. Revisar logs de Vercel para ver error upstream exacto

### **Problema: Blog posts no cargan**
- **Causa:** WordPress API inaccesible o retorna HTML en vez de JSON
- **Solución:**
  1. Probar `https://wp.servidentalcr.com/wp-json/wp/v2/posts` en browser
  2. Debe retornar JSON (no HTML de login o 404)
  3. Verificar `WORDPRESS_BASE_URL` en Vercel env vars

### **Problema: Imágenes rotas**
- **Causa:** `remotePatterns` no incluye el hostname
- **Solución:**
  1. Verificar que `next.config.js` tiene el hostname correcto
  2. Hacer redeploy después de cambiar config

---

## 📚 Referencias

- [Next.js Image Configuration](https://nextjs.org/docs/app/api-reference/components/image#remotepatterns)
- [Next.js Middleware](https://nextjs.org/docs/app/building-your-application/routing/middleware)
- [Vercel Environment Variables](https://vercel.com/docs/projects/environment-variables)
- [WooCommerce REST API](https://woocommerce.github.io/woocommerce-rest-api-docs/)

---

**Última actualización:** 2025-10-06
**Responsable:** Equipo de desarrollo ServidentalCR
