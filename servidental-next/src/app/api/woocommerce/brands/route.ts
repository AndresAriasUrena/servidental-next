import { NextRequest, NextResponse } from 'next/server';
import { fetchAllBrandsWithMeta, getBrandById } from '@/server/brands';

// ============================================
// CACHE EN MEMORIA PARA COUNTS
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
// ENV VALIDATION
// ============================================
const WP_URL = process.env.WOOCOMMERCE_URL;
const WC_KEY = process.env.WOOCOMMERCE_CONSUMER_KEY;
const WC_SECRET = process.env.WOOCOMMERCE_CONSUMER_SECRET;

// ============================================
// TIPOS
// ============================================
interface BrandWithCountAndLogo {
  id: number;
  name: string;
  slug: string;
  count: number;
  logoUrl: string | null; // URL del logo o null
}

// ============================================
// POOL DE CONCURRENCIA
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
// CONTEO REAL POR MARCA
// ============================================
async function fetchRealCountForBrand(brandId: number): Promise<number> {
  if (!WP_URL || !WC_KEY || !WC_SECRET) {
    console.error(`[Brands API] Missing credentials for brand ${brandId}`);
    return 0;
  }

  try {
    const params = new URLSearchParams({
      consumer_key: WC_KEY,
      consumer_secret: WC_SECRET,
      brand: brandId.toString(),
      per_page: '1'
    });

    const url = `${WP_URL}/wp-json/wc/v3/products?${params.toString()}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'User-Agent': 'ServidentalCR-NextJS/1.0',
        'Accept': 'application/json'
      },
      signal: AbortSignal.timeout(30000),
      next: { revalidate: 0 }
    });

    if (!response.ok) {
      console.error(`[Brands API] Failed to fetch count for brand ${brandId}: ${response.status}`);
      return 0;
    }

    const totalHeader = response.headers.get('x-wp-total');
    const count = totalHeader ? Number(totalHeader) : 0;

    return count;

  } catch (error) {
    console.error(`[Brands API] Error fetching count for brand ${brandId}:`, error);
    return 0;
  }
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
    const CACHE_KEY = 'brands:with-counts-and-logos:v1';
    const cached = getCached<BrandWithCountAndLogo[]>(CACHE_KEY);

    if (cached) {
      console.log('[Brands API] ✅ Serving from cache');
      const withLogo = cached.filter((b) => b.logoUrl !== null).length;
      console.log(`[Brands API] ${withLogo}/${cached.length} brands with logos (cached)`);

      return NextResponse.json({
        data: cached,
        total: cached.length,
        cached: true
      });
    }

    // No hay cache, calcular
    console.log('[Brands API] Cache miss, fetching fresh data...');

    // 1. Obtener marcas con metadata y logos (desde server/brands.ts)
    const brandsWithMeta = await fetchAllBrandsWithMeta();

    if (brandsWithMeta.length === 0) {
      console.log('[Brands API] ⚠️  No brands found');
      return NextResponse.json({
        data: [],
        total: 0,
        message: 'No brands found'
      });
    }

    // 2. Calcular conteos reales en paralelo
    console.log(`[Brands API] Calculating real counts for ${brandsWithMeta.length} brands...`);

    const tasks = brandsWithMeta.map((brand) => async (): Promise<BrandWithCountAndLogo> => {
      const count = await fetchRealCountForBrand(brand.id);
      return {
        id: brand.id,
        name: brand.name,
        slug: brand.slug,
        count,
        logoUrl: brand.imageSrc || null // imageSrc viene de server/brands.ts
      };
    });

    const brandsWithCountsAndLogos = await runWithConcurrencyLimit(tasks, 8);

    // Ordenar por nombre
    brandsWithCountsAndLogos.sort((a, b) => a.name.localeCompare(b.name));

    // 3. Estadísticas
    const withLogo = brandsWithCountsAndLogos.filter((b) => b.logoUrl !== null).length;
    const total = brandsWithCountsAndLogos.length;
    console.log(`[Brands API] ✅ Success: ${total} brands, logoOK=${withLogo}/${total}`);

    // Listar marcas sin logo
    const withoutLogo = brandsWithCountsAndLogos.filter((b) => b.logoUrl === null);
    if (withoutLogo.length > 0) {
      console.log('[Brands API] ⚠️  Brands without logo:', withoutLogo.map(b => b.slug).join(', '));
    }

    // 4. Guardar en cache
    setCache(CACHE_KEY, brandsWithCountsAndLogos);

    return NextResponse.json({
      data: brandsWithCountsAndLogos,
      total: brandsWithCountsAndLogos.length,
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
    const CACHE_KEY = 'brands:with-counts-and-logos:v1';
    let brands = getCached<BrandWithCountAndLogo[]>(CACHE_KEY);

    // Si no hay cache, forzar recarga
    if (!brands) {
      const brandsWithMeta = await fetchAllBrandsWithMeta();

      const tasks = brandsWithMeta.map((brand) => async (): Promise<BrandWithCountAndLogo> => {
        const count = await fetchRealCountForBrand(brand.id);
        return {
          id: brand.id,
          name: brand.name,
          slug: brand.slug,
          count,
          logoUrl: brand.imageSrc || null
        };
      });

      brands = await runWithConcurrencyLimit(tasks, 8);
      setCache(CACHE_KEY, brands);
    }

    const brand = brands.find((b) => b.slug === slug);
    return brand ? brand.id : null;
  } catch (error) {
    console.error('[Brands API] Error resolving slug to ID:', error);
    return null;
  }
}
