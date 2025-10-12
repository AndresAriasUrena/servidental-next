import { NextRequest, NextResponse } from 'next/server';

// ============================================
// CACHE EN MEMORIA
// ============================================
interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

const cache = new Map<string, CacheEntry<any>>();
const CACHE_TTL = 10 * 60 * 1000; // 10 minutos

function getCached<T>(key: string): T | null {
  const entry = cache.get(key);
  if (!entry) return null;

  const age = Date.now() - entry.timestamp;
  if (age > CACHE_TTL) {
    cache.delete(key);
    return null;
  }

  return entry.data as T;
}

function setCache<T>(key: string, data: T): void {
  cache.set(key, { data, timestamp: Date.now() });
}

// ============================================
// VALIDACIÓN DE ENV
// ============================================
const WP_URL = process.env.WOOCOMMERCE_URL;
const WC_KEY = process.env.WOOCOMMERCE_CONSUMER_KEY;
const WC_SECRET = process.env.WOOCOMMERCE_CONSUMER_SECRET;

if (!WP_URL || !WC_KEY || !WC_SECRET) {
  console.error('❌ Missing WooCommerce environment variables');
}

// ============================================
// TIPOS
// ============================================
interface WordPressBrand {
  id: number;
  name: string;
  slug: string;
  description?: string;
  count?: number; // Este viene en 0 desde WP, lo recalcularemos
}

interface BrandWithRealCount {
  id: number;
  name: string;
  slug: string;
  count: number;
}

// ============================================
// POOL DE CONCURRENCIA AD HOC
// ============================================
async function runWithConcurrencyLimit<T>(
  tasks: (() => Promise<T>)[],
  limit: number
): Promise<T[]> {
  const results: T[] = [];
  const executing: Promise<void>[] = [];

  for (const task of tasks) {
    const promise = task().then((result) => {
      results.push(result);
    });

    executing.push(promise);

    if (executing.length >= limit) {
      await Promise.race(executing);
      // Remover las promesas completadas
      executing.splice(
        0,
        executing.findIndex((p) => {
          let completed = false;
          p.then(() => { completed = true; }).catch(() => { completed = true; });
          return completed;
        })
      );
    }
  }

  await Promise.all(executing);
  return results;
}

// ============================================
// FUNCIONES AUXILIARES
// ============================================

/**
 * Obtener todas las marcas desde la taxonomía product_brand de WordPress
 */
async function fetchBrandsFromWordPress(): Promise<WordPressBrand[]> {
  if (!WP_URL) throw new Error('WOOCOMMERCE_URL not configured');

  const url = `${WP_URL}/wp-json/wp/v2/product_brand?per_page=100`;

  console.log('[Brands API] Fetching brands from WordPress taxonomy...');

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'User-Agent': 'ServidentalCR-NextJS/1.0',
      'Accept': 'application/json'
    },
    signal: AbortSignal.timeout(30000)
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`WordPress API returned ${response.status}: ${errorText}`);
  }

  const brands: WordPressBrand[] = await response.json();
  console.log(`[Brands API] ✅ Fetched ${brands.length} brands from WordPress`);

  return brands;
}

/**
 * Obtener el conteo real de productos para una marca específica
 * usando el endpoint de WooCommerce con product_brand={id}
 */
async function fetchRealCountForBrand(brandId: number): Promise<number> {
  if (!WP_URL || !WC_KEY || !WC_SECRET) {
    console.error(`[Brands API] Missing credentials for brand ${brandId}`);
    return 0;
  }

  try {
    const params = new URLSearchParams({
      consumer_key: WC_KEY,
      consumer_secret: WC_SECRET,
      brand: brandId.toString(), // ✅ CORRECTO: usar 'brand' no 'product_brand'
      per_page: '1'
    });

    const url = `${WP_URL}/wp-json/wc/v3/products?${params.toString()}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'User-Agent': 'ServidentalCR-NextJS/1.0',
        'Accept': 'application/json'
      },
      signal: AbortSignal.timeout(30000)
    });

    if (!response.ok) {
      console.error(`[Brands API] Failed to fetch count for brand ${brandId}: ${response.status}`);
      return 0;
    }

    // Leer el header x-wp-total que contiene el conteo real
    const totalHeader = response.headers.get('x-wp-total');
    const count = totalHeader ? Number(totalHeader) : 0;

    console.log(`[Brands API] Brand ${brandId}: count = ${count}`);
    return count;

  } catch (error) {
    console.error(`[Brands API] Error fetching count for brand ${brandId}:`, error);
    return 0;
  }
}

/**
 * Calcular conteos reales para todas las marcas con concurrencia limitada
 */
async function enrichBrandsWithRealCounts(
  brands: WordPressBrand[]
): Promise<BrandWithRealCount[]> {
  console.log(`[Brands API] Calculating real counts for ${brands.length} brands...`);

  // Crear tareas para cada marca
  const tasks = brands.map((brand) => async (): Promise<BrandWithRealCount> => {
    const count = await fetchRealCountForBrand(brand.id);
    return {
      id: brand.id,
      name: brand.name,
      slug: brand.slug,
      count
    };
  });

  // Ejecutar con límite de concurrencia de 8
  const brandsWithCounts = await runWithConcurrencyLimit(tasks, 8);

  // Ordenar por nombre
  brandsWithCounts.sort((a, b) => a.name.localeCompare(b.name));

  console.log('[Brands API] ✅ Real counts calculated successfully');
  return brandsWithCounts;
}

// ============================================
// HANDLER PRINCIPAL
// ============================================
export async function GET(request: NextRequest) {
  try {
    console.log('[Brands API] GET request received');

    // Validar configuración
    if (!WP_URL || !WC_KEY || !WC_SECRET) {
      return NextResponse.json(
        {
          error: 'Server configuration error',
          detail: 'Missing WooCommerce credentials. Check environment variables.'
        },
        { status: 500 }
      );
    }

    // Intentar obtener del cache
    const CACHE_KEY = 'brands:counts:v1';
    const cached = getCached<BrandWithRealCount[]>(CACHE_KEY);

    if (cached) {
      console.log('[Brands API] ✅ Serving from cache');
      return NextResponse.json({
        data: cached,
        total: cached.length,
        cached: true
      });
    }

    // No hay cache, calcular
    console.log('[Brands API] Cache miss, fetching fresh data...');

    // 1. Obtener marcas desde WordPress
    const wordpressBrands = await fetchBrandsFromWordPress();

    if (wordpressBrands.length === 0) {
      console.log('[Brands API] ⚠️  No brands found in WordPress taxonomy product_brand');
      return NextResponse.json({
        data: [],
        total: 0,
        message: 'No brands found in product_brand taxonomy'
      });
    }

    // 2. Calcular conteos reales desde WooCommerce
    const brandsWithCounts = await enrichBrandsWithRealCounts(wordpressBrands);

    // 3. Guardar en cache
    setCache(CACHE_KEY, brandsWithCounts);

    console.log(`[Brands API] ✅ Success: ${brandsWithCounts.length} brands with real counts`);

    return NextResponse.json({
      data: brandsWithCounts,
      total: brandsWithCounts.length,
      cached: false
    });

  } catch (error) {
    console.error('[Brands API] Error in GET handler:', error);

    return NextResponse.json(
      {
        error: 'Failed to fetch brands',
        detail: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// ============================================
// FUNCIÓN AUXILIAR EXPORTADA PARA USO INTERNO
// ============================================

/**
 * Resolver slug de marca a ID
 * Útil para otras APIs internas
 */
export async function resolveBrandSlugToId(slug: string): Promise<number | null> {
  try {
    const CACHE_KEY = 'brands:counts:v1';
    let brands = getCached<BrandWithRealCount[]>(CACHE_KEY);

    // Si no hay cache, forzar recarga
    if (!brands) {
      const wordpressBrands = await fetchBrandsFromWordPress();
      brands = await enrichBrandsWithRealCounts(wordpressBrands);
      setCache(CACHE_KEY, brands);
    }

    const brand = brands.find((b) => b.slug === slug);
    return brand ? brand.id : null;
  } catch (error) {
    console.error('[Brands API] Error resolving slug to ID:', error);
    return null;
  }
}
