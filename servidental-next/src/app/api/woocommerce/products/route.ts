import { NextRequest, NextResponse } from 'next/server';

// Validar variables de entorno
const WP_URL = process.env.WOOCOMMERCE_URL;
const WC_KEY = process.env.WOOCOMMERCE_CONSUMER_KEY;
const WC_SECRET = process.env.WOOCOMMERCE_CONSUMER_SECRET;

// ============================================
// CACHE PARA MAPEO SLUG → ID DE MARCAS
// ============================================
interface BrandMapping {
  slug: string;
  id: number;
}

let brandSlugToIdCache: Map<string, number> | null = null;
let brandCacheTimestamp = 0;
const BRAND_CACHE_TTL = 10 * 60 * 1000; // 10 minutos

/**
 * Resolver slug de marca a ID consultando nuestra API interna de marcas
 */
async function resolveBrandSlugToId(slug: string): Promise<number | null> {
  try {
    // Verificar si el cache está vigente
    const now = Date.now();
    if (brandSlugToIdCache && (now - brandCacheTimestamp) < BRAND_CACHE_TTL) {
      return brandSlugToIdCache.get(slug) || null;
    }

    // Cache expirado o inexistente, recargar
    console.log('[Products API] Reloading brand slug→id mappings...');

    // Llamar a nuestra API interna de marcas
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/woocommerce/brands`, {
      method: 'GET',
      headers: {
        'User-Agent': 'ServidentalCR-NextJS/1.0',
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      console.error('[Products API] Failed to fetch brands for slug resolution');
      return null;
    }

    const result = await response.json();
    const brands = result.data || [];

    // Construir el mapa slug → id
    brandSlugToIdCache = new Map();
    brands.forEach((brand: any) => {
      brandSlugToIdCache!.set(brand.slug, brand.id);
    });

    brandCacheTimestamp = now;
    console.log(`[Products API] ✅ Brand mappings loaded: ${brandSlugToIdCache.size} brands`);

    return brandSlugToIdCache.get(slug) || null;
  } catch (error) {
    console.error('[Products API] Error resolving brand slug to ID:', error);
    return null;
  }
}

async function makeWooCommerceRequest(endpoint: string, params: URLSearchParams) {
  // Validar credenciales
  if (!WP_URL || !WC_KEY || !WC_SECRET) {
    throw new Error('Missing WooCommerce configuration. Check env vars: WOOCOMMERCE_URL, WOOCOMMERCE_CONSUMER_KEY, WOOCOMMERCE_CONSUMER_SECRET');
  }

  try {
    const queryParams = new URLSearchParams({
      consumer_key: WC_KEY,
      consumer_secret: WC_SECRET,
      ...Object.fromEntries(params.entries())
    });

    const apiUrl = `${WP_URL}/wp-json/wc/v3/${endpoint}?${queryParams.toString()}`;

    console.log('[WooCommerce API] Request to:', `${WP_URL}/wp-json/wc/v3/${endpoint}`);

    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'User-Agent': 'ServidentalCR-NextJS/1.0',
        'Accept': 'application/json'
      },
      // Timeout de 30 segundos
      signal: AbortSignal.timeout(30000)
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`[WooCommerce API] Upstream error ${response.status}:`, errorText);
      throw new Error(`Upstream WooCommerce API returned ${response.status}: ${errorText}`);
    }

    const jsonData = await response.json();
    const total = response.headers.get('x-wp-total');
    const totalPages = response.headers.get('x-wp-totalpages');

    return {
      data: jsonData,
      total: total ? parseInt(total) : jsonData.length,
      totalPages: totalPages ? parseInt(totalPages) : 1,
      headers: response.headers
    };
  } catch (error) {
    console.error('[WooCommerce API] Request failed:', error);
    throw error;
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    console.log('[WooCommerce API] Products request params:', Object.fromEntries(searchParams.entries()));

    // ============================================
    // RESOLUCIÓN DE BRAND SLUG → ID
    // ============================================
    const brandSlug = searchParams.get('brand');

    if (brandSlug) {
      console.log(`[Products API] Resolving brand slug: ${brandSlug}`);

      const brandId = await resolveBrandSlugToId(brandSlug);

      if (brandId === null) {
        console.warn(`[Products API] Brand slug "${brandSlug}" not found`);
        // Retornar resultado vacío en lugar de error 404
        return NextResponse.json({
          data: [],
          total: 0,
          total_pages: 0,
          current_page: 1,
          per_page: parseInt(searchParams.get('per_page') || '12'),
          message: `Brand "${brandSlug}" not found`
        });
      }

      console.log(`[Products API] ✅ Brand "${brandSlug}" resolved to ID: ${brandId}`);

      // Remover el parámetro 'brand' (slug) y agregar 'brand' (id)
      // IMPORTANTE: WooCommerce usa 'brand' (no 'product_brand')
      searchParams.delete('brand');
      searchParams.set('brand', brandId.toString());

      console.log(`[Products API] 🔍 Final params before WooCommerce:`, Object.fromEntries(searchParams.entries()));
    }

    // ============================================
    // LLAMADA A WOOCOMMERCE
    // ============================================
    const response = await makeWooCommerceRequest('products', searchParams) as any;

    console.log(`[WooCommerce API] Success: ${response.data.length} products, total: ${response.total}`);

    return NextResponse.json({
      data: response.data,
      total: response.total,
      total_pages: response.totalPages,
      current_page: parseInt(searchParams.get('page') || '1'),
      per_page: parseInt(searchParams.get('per_page') || '12')
    });

  } catch (error) {
    console.error('[WooCommerce API] Error in GET /api/woocommerce/products:', error);

    // Retornar 502 Bad Gateway si el problema es con el upstream
    if (error instanceof Error && error.message.includes('Upstream')) {
      return NextResponse.json(
        {
          error: 'WooCommerce API error',
          detail: error.message,
          upstream: true
        },
        { status: 502 }
      );
    }

    // Retornar 500 para otros errores
    return NextResponse.json(
      {
        error: 'Failed to fetch products',
        detail: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}