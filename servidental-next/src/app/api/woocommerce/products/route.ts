import { NextRequest, NextResponse } from 'next/server';
import { getBrandMap } from '@/server/brands';
import { sanitizeProductHtml, normalizeDescription } from '@/server/sanitize';
import { extractResourcesFromMeta } from '@/server/productResources';
import type { WooCommerceProduct, PrimaryBrand } from '@/types/woocommerce';

// Validar variables de entorno
const WP_URL = process.env.WOOCOMMERCE_URL;
const WC_KEY = process.env.WOOCOMMERCE_CONSUMER_KEY;
const WC_SECRET = process.env.WOOCOMMERCE_CONSUMER_SECRET;

const MAX_BRAND_FILTERS = 10;
const MAX_BRAND_FILTER_LENGTH = 1_000;

async function resolveBrandSlugToId(slug: string, signal: AbortSignal): Promise<number | null> {
  if (!WP_URL) throw new Error('WordPress no está configurado');

  const query = new URLSearchParams({ slug });
  const response = await fetch(`${WP_URL}/wp-json/wp/v2/product_brand?${query}`, {
    headers: { Accept: 'application/json' },
    signal,
    next: { revalidate: 600 },
  });
  if (!response.ok) throw new Error('No se pudieron consultar las marcas');

  const brands: unknown = await response.json();
  if (!Array.isArray(brands)) throw new Error('Respuesta de marcas inválida');
  const match = brands.find((brand) => brand?.slug === slug);
  if (!match) return null;
  if (!Number.isSafeInteger(match.id) || match.id < 1) throw new Error('ID de marca inválido');
  return match.id;
}

async function makeWooCommerceRequest(endpoint: string, params: URLSearchParams) {
  // Validar credenciales
  if (!WP_URL || !WC_KEY || !WC_SECRET) {
    throw new Error('Missing WooCommerce configuration. Check env vars: WOOCOMMERCE_URL, WOOCOMMERCE_CONSUMER_KEY, WOOCOMMERCE_CONSUMER_SECRET');
  }

  try {
    const queryParams = new URLSearchParams(params);
    queryParams.set('status', 'publish');
    queryParams.set('context', 'view');
    queryParams.set('consumer_key', WC_KEY);
    queryParams.set('consumer_secret', WC_SECRET);

    const apiUrl = `${WP_URL}/wp-json/wc/v3/${endpoint}?${queryParams.toString()}`;

    console.log('[WooCommerce API] Request to:', `${WP_URL}/wp-json/wc/v3/${endpoint}`);

    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'User-Agent': 'ServidentalCR-NextJS/1.0',
        'Accept': 'application/json'
      },
      signal: AbortSignal.timeout(30000),
      next: { revalidate: 300 }
    });

    if (!response.ok) {
      throw new Error(`Upstream WooCommerce API returned ${response.status}`);
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

function projectPublicProduct(product: WooCommerceProduct, grid: boolean) {
  const terms = (values: WooCommerceProduct['categories'] = []) =>
    values.map(({ id, name, slug }) => ({ id, name, slug }));
  const images = product.images ?? [];
  const brand = product.primaryBrand;
  const publicProduct = {
    id: product.id,
    name: product.name,
    slug: product.slug,
    sku: product.sku,
    type: product.type,
    status: product.status,
    price: product.price,
    regular_price: product.regular_price,
    sale_price: product.sale_price,
    stock_status: product.stock_status,
    images: (grid ? images.slice(0, 1) : images).map(({ id, src, name, alt }) => ({ id, src, name, alt })),
    categories: terms(product.categories),
    tags: terms(product.tags),
    brands: terms(product.brands),
    primaryBrand: brand && { id: brand.id, name: brand.name, slug: brand.slug, logoUrl: brand.logoUrl },
    short_description: sanitizeProductHtml(product.short_description || ''),
    resources: extractResourcesFromMeta(product.meta_data),
  };

  if (grid) return publicProduct;

  return {
    ...publicProduct,
    description: sanitizeProductHtml(normalizeDescription(product.description || '')),
    attributes: (product.attributes ?? []).map(({ id, name, position, visible, variation, options }) =>
      ({ id, name, position, visible, variation, options })
    ),
    variations: product.variations,
    average_rating: product.average_rating,
    rating_count: product.rating_count,
  };
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

      if (!firstBrand) {
        return product;
      }

      // Buscar metadata de la marca en el mapa
      const brandMeta = brandMap.get(firstBrand.id);

      if (!brandMeta) {
        console.log(`[Products API] ⚠️  Brand ${firstBrand.id} (${firstBrand.name}) not found in brand map`);
        return {
          ...product,
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

    const brandFilter = searchParams.get('brand') ?? '';
    if (brandFilter.length > MAX_BRAND_FILTER_LENGTH) {
      return NextResponse.json({ error: 'Filtro de marcas demasiado largo' }, { status: 400 });
    }
    const brandSlugs = [...new Set(brandFilter.split(',').map((slug) => slug.trim()).filter(Boolean))];
    if (brandSlugs.length > MAX_BRAND_FILTERS || brandSlugs.some((slug) => slug.length > 200)) {
      return NextResponse.json({ error: 'Filtro de marcas inválido' }, { status: 400 });
    }
    if (!brandSlugs.length) searchParams.delete('brand');

    // ============================================
    // RESOLUCIÓN DE CATEGORY SLUG → ID
    // Convierte slug de categoría a ID para filtrar en WooCommerce
    // ============================================
    const categorySlug = searchParams.get('category_slug');

    if (categorySlug) {
      console.log(`[Products API] Resolving category slug "${categorySlug}"...`);

      if (!WP_URL || !WC_KEY || !WC_SECRET) {
        console.error('[Products API] ❌ WooCommerce credentials not configured');
      } else {
        try {
          // Consultar categorías por slug
          const categoriesUrl = new URLSearchParams({
            consumer_key: WC_KEY,
            consumer_secret: WC_SECRET,
            slug: categorySlug,
            per_page: '1'
          });

          const catResponse = await fetch(`${WP_URL}/wp-json/wc/v3/products/categories?${categoriesUrl.toString()}`, {
            method: 'GET',
            signal: AbortSignal.timeout(10000),
            next: { revalidate: 3600 } // Cache por 1 hora
          });

          if (catResponse.ok) {
            const categories = await catResponse.json();

            if (Array.isArray(categories) && categories.length > 0) {
              const categoryId = categories[0].id;
              console.log(`[Products API] ✅ Category "${categorySlug}" resolved to ID: ${categoryId}`);

              // Remover category_slug y agregar category con el ID
              searchParams.delete('category_slug');

              // Si ya existe un parámetro category, agregarlo (separado por coma)
              const existingCategory = searchParams.get('category');
              if (existingCategory) {
                searchParams.set('category', `${existingCategory},${categoryId}`);
              } else {
                searchParams.set('category', String(categoryId));
              }
            } else {
              console.warn(`[Products API] ⚠️  Category slug "${categorySlug}" not found`);
              searchParams.delete('category_slug');
            }
          }
        } catch (error) {
          console.error('[Products API] Error resolving category slug:', error);
          searchParams.delete('category_slug');
        }
      }
    }

    // ============================================
    // RESOLUCIÓN DE BRAND SLUG(S) → ID(S)
    // Soporte para múltiples marcas separadas por coma
    // ============================================
    if (brandSlugs.length > 0) {
      let brandIds: number[];
      try {
        const signal = AbortSignal.timeout(10_000);
        const resolved = await Promise.all(brandSlugs.map((slug) => resolveBrandSlugToId(slug, signal)));
        brandIds = resolved.filter((id): id is number => id !== null);
      } catch {
        return NextResponse.json(
          { error: 'No se pudieron consultar las marcas. Intentalo nuevamente.' },
          { status: 502 }
        );
      }

      if (brandIds.length === 0) {
        return NextResponse.json({
          data: [],
          total: 0,
          total_pages: 0,
          current_page: 1,
          per_page: parseInt(searchParams.get('per_page') || '12', 10),
        });
      }

      searchParams.set('brand', brandIds.join(','));
    }

    // ============================================
    // LLAMADA A WOOCOMMERCE
    // ============================================
    const response = await makeWooCommerceRequest('products', searchParams) as any;

    console.log(`[WooCommerce API] Success: ${response.data.length} products, total: ${response.total}`);

    // ============================================
    // INYECTAR PRIMARY BRAND CON LOGO
    // ============================================
    const publishedProducts = response.data.filter(
      (product: WooCommerceProduct) => product?.status === 'publish'
    );
    const productsWithBrand = await injectPrimaryBrand(publishedProducts);

    const grid = searchParams.get('view') === 'grid';
    const finalProducts = productsWithBrand.map((product) => projectPublicProduct(product, grid));

    return NextResponse.json({
      data: finalProducts,
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
          upstream: true
        },
        { status: 502 }
      );
    }

    // Retornar 500 para otros errores
    return NextResponse.json(
      {
        error: 'Failed to fetch products',
      },
      { status: 500 }
    );
  }
}
