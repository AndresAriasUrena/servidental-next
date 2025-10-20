import { NextRequest, NextResponse } from 'next/server';
import { getBrandMap } from '@/server/brands';
import { sanitizeProductHtml, normalizeDescription } from '@/server/sanitize';
import { extractResourcesFromMeta } from '@/server/productResources';
import type { WooCommerceProduct, PrimaryBrand } from '@/types/woocommerce';

// Validar variables de entorno
const WP_URL = process.env.WOOCOMMERCE_URL;
const WC_KEY = process.env.WOOCOMMERCE_CONSUMER_KEY;
const WC_SECRET = process.env.WOOCOMMERCE_CONSUMER_SECRET;

// ============================================
// CACHE PARA MAPEO SLUG → ID DE MARCAS
// ============================================
let brandSlugToIdCache: Map<string, number> | null = null;
let brandCacheTimestamp = 0;
const BRAND_CACHE_TTL = 10 * 60 * 1000; // 10 minutos

/**
 * Resolver slug de marca a ID consultando WordPress REST API directamente
 */
async function resolveBrandSlugToId(slug: string): Promise<number | null> {
  try {
    // Verificar si el cache está vigente
    const now = Date.now();
    if (brandSlugToIdCache && (now - brandCacheTimestamp) < BRAND_CACHE_TTL) {
      const cachedId = brandSlugToIdCache.get(slug);
      if (cachedId !== undefined) {
        console.log(`[Products API] 💾 Cache hit: brand "${slug}" -> ID ${cachedId}`);
        return cachedId;
      }
    }

    // Cache expirado, inexistente, o slug no encontrado
    console.log(`[Products API] 🔄 Resolving brand slug "${slug}" via WordPress REST API...`);

    if (!WP_URL) {
      console.error('[Products API] ❌ WOOCOMMERCE_URL not configured');
      return null;
    }

    // Estrategia 1: Intentar consulta directa por slug
    const directUrl = `${WP_URL}/wp-json/wp/v2/product_brand?slug=${encodeURIComponent(slug)}`;

    try {
      const directResponse = await fetch(directUrl, {
        method: 'GET',
        headers: {
          'User-Agent': 'ServidentalCR-NextJS/1.0',
          'Accept': 'application/json'
        },
        signal: AbortSignal.timeout(10000),
        next: { revalidate: 0 }
      });

      if (directResponse.ok) {
        const brands = await directResponse.json();

        if (Array.isArray(brands) && brands.length > 0) {
          const brandId = brands[0].id;
          console.log(`[Products API] ✅ Direct lookup: "${slug}" -> ID ${brandId}`);

          // Actualizar cache con este resultado
          if (!brandSlugToIdCache) brandSlugToIdCache = new Map();
          brandSlugToIdCache.set(slug, brandId);
          brandCacheTimestamp = now;

          return brandId;
        }
      }
    } catch (directError) {
      console.warn(`[Products API] ⚠️  Direct slug lookup failed, falling back to full list...`, directError);
    }

    // Estrategia 2: Fallback - Cargar todas las marcas y construir mapa completo
    console.log('[Products API] 📋 Loading all brands to build slug→id map...');

    const allBrandsUrl = `${WP_URL}/wp-json/wp/v2/product_brand?per_page=100`;
    const allBrandsResponse = await fetch(allBrandsUrl, {
      method: 'GET',
      headers: {
        'User-Agent': 'ServidentalCR-NextJS/1.0',
        'Accept': 'application/json'
      },
      signal: AbortSignal.timeout(15000),
      next: { revalidate: 0 }
    });

    if (!allBrandsResponse.ok) {
      console.error(`[Products API] ❌ Failed to fetch all brands: ${allBrandsResponse.status}`);
      return null;
    }

    const allBrands = await allBrandsResponse.json();

    if (!Array.isArray(allBrands)) {
      console.error('[Products API] ❌ Invalid response format from WordPress brands API');
      return null;
    }

    // Reconstruir cache completo
    brandSlugToIdCache = new Map();
    allBrands.forEach((brand: any) => {
      if (brand.slug && brand.id) {
        brandSlugToIdCache!.set(brand.slug, brand.id);
      }
    });

    brandCacheTimestamp = now;
    console.log(`[Products API] ✅ Brand map rebuilt: ${brandSlugToIdCache.size} brands cached`);

    const resolvedId = brandSlugToIdCache.get(slug) || null;

    if (resolvedId) {
      console.log(`[Products API] ✅ Fallback resolved: "${slug}" -> ID ${resolvedId}`);
    } else {
      console.warn(`[Products API] ⚠️  Brand slug "${slug}" not found in ${brandSlugToIdCache.size} brands`);
    }

    return resolvedId;
  } catch (error) {
    console.error('[Products API] ❌ Error resolving brand slug to ID:', error);
    return null;
  }
}

async function makeWooCommerceRequest(endpoint: string, params: URLSearchParams) {
  // Validar credenciales
  if (!WP_URL || !WC_KEY || !WC_SECRET) {
    throw new Error('Missing WooCommerce configuration. Check env vars: WOOCOMMERCE_URL, WOOCOMMERCE_CONSUMER_KEY, WOOCOMMERCE_CONSUMER_SECRET');
  }

  try {
    // Agregar filtro status=publish por defecto si no se especifica
    if (!params.has('status')) {
      params.set('status', 'publish');
    }

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
      signal: AbortSignal.timeout(30000),
      next: { revalidate: 0 }
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

/**
 * Inyectar primaryBrand en cada producto
 * Toma la primera marca del array brands[] si existe
 */
async function injectPrimaryBrand(products: WooCommerceProduct[]): Promise<WooCommerceProduct[]> {
  try {
    // Obtener el mapa de marcas con logos
    const brandMap = await getBrandMap();

    console.log(`[Products API] Injecting primaryBrand for ${products.length} products...`);

    let brandsSet = 0;

    const enrichedProducts = products.map((product) => {
      // Tomar la primera marca del array brands[] si existe
      const firstBrand = product.brands?.[0];

      // Sanitizar descripciones HTML
      const short_description = sanitizeProductHtml(product.short_description || '');
      const description = sanitizeProductHtml(normalizeDescription(product.description || ''));

      // Extraer recursos desde meta_data
      const meta = Array.isArray(product.meta_data) ? product.meta_data : [];
      const resources = extractResourcesFromMeta(meta);

      if (!firstBrand) {
        console.log(`[Products API] ⚠️  Product ${product.id} (${product.name}) has no brands`);
        return {
          ...product,
          short_description,
          description,
          resources
        };
      }

      // Buscar metadata de la marca en el mapa
      const brandMeta = brandMap.get(firstBrand.id);

      if (!brandMeta) {
        console.log(`[Products API] ⚠️  Brand ${firstBrand.id} (${firstBrand.name}) not found in brand map`);
        return {
          ...product,
          short_description,
          description,
          resources,
          primaryBrand: {
            id: firstBrand.id,
            name: firstBrand.name,
            slug: firstBrand.slug,
            logoUrl: null
          }
        };
      }

      // Inyectar primaryBrand con logo
      brandsSet++;

      const primaryBrand: PrimaryBrand = {
        id: firstBrand.id,
        name: firstBrand.name,
        slug: firstBrand.slug,
        logoUrl: brandMeta.imageSrc || null
      };

      console.log(`[Products API] brand "${firstBrand.slug}" -> id ${firstBrand.id}; primaryBrand set`);

      return {
        ...product,
        short_description,
        description,
        resources,
        primaryBrand
      };
    });

    console.log(`[Products API] ✅ primaryBrand set on ${brandsSet}/${products.length} products`);

    return enrichedProducts;
  } catch (error) {
    console.error('[Products API] Error injecting primaryBrand:', error);
    // En caso de error, devolver productos sin modificar
    return products;
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

    // ============================================
    // INYECTAR PRIMARY BRAND CON LOGO
    // ============================================
    const productsWithBrand = await injectPrimaryBrand(response.data);

    return NextResponse.json({
      data: productsWithBrand,
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
