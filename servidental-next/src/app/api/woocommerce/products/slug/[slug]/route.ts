import { NextRequest, NextResponse } from 'next/server';
import { getBrandMap } from '@/server/brands';
import type { WooCommerceProduct, PrimaryBrand } from '@/types/woocommerce';

async function makeWooCommerceRequest(endpoint: string, params: URLSearchParams = new URLSearchParams()) {
  try {
    const queryParams = new URLSearchParams({
      consumer_key: process.env.WOOCOMMERCE_CONSUMER_KEY!,
      consumer_secret: process.env.WOOCOMMERCE_CONSUMER_SECRET!,
      ...Object.fromEntries(params.entries())
    });

    const apiUrl = `${process.env.WOOCOMMERCE_URL}/wp-json/wc/v3/${endpoint}?${queryParams.toString()}`;

    console.log('Making request to:', `${process.env.WOOCOMMERCE_URL}/wp-json/wc/v3/${endpoint}`);

    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'User-Agent': 'ServidentalCR-NextJS/1.0',
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API Error ${response.status}: ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('WooCommerce product by slug request failed:', error);
    throw error;
  }
}

/**
 * Inyectar primaryBrand en un producto
 */
async function injectPrimaryBrand(product: WooCommerceProduct): Promise<WooCommerceProduct> {
  try {
    const brandMap = await getBrandMap();

    const firstBrand = product.brands?.[0];

    if (!firstBrand) {
      console.log(`[Product By Slug API] ⚠️  Product ${product.id} (${product.name}) has no brands`);
      return product;
    }

    const brandMeta = brandMap.get(firstBrand.id);

    if (!brandMeta) {
      console.log(`[Product By Slug API] ⚠️  Brand ${firstBrand.id} (${firstBrand.name}) not found in brand map`);
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

    const primaryBrand: PrimaryBrand = {
      id: firstBrand.id,
      name: firstBrand.name,
      slug: firstBrand.slug,
      logoUrl: brandMeta.imageSrc || null
    };

    console.log(`[Product By Slug API] ✅ primaryBrand set for "${firstBrand.slug}" (id ${firstBrand.id})`);

    return {
      ...product,
      primaryBrand
    };
  } catch (error) {
    console.error('[Product By Slug API] Error injecting primaryBrand:', error);
    return product;
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    let allProducts: any[] = [];
    let foundProduct = null;
    let page = 1;
    const maxPages = 3;

    while (page <= maxPages && !foundProduct) {
      const searchParams = new URLSearchParams({
        per_page: '100',
        page: page.toString()
      });

      const pageProducts = await makeWooCommerceRequest('products', searchParams) as any[];

      if (!pageProducts || pageProducts.length === 0) {
        break;
      }

      foundProduct = pageProducts.find((product: any) => product.slug === slug);

      if (foundProduct) {
        break;
      }

      allProducts = allProducts.concat(pageProducts);
      page++;
    }

    let products = foundProduct ? [foundProduct] : [];


    if (products && products.length > 0) {
      // Inyectar primaryBrand antes de retornar
      const productWithBrand = await injectPrimaryBrand(products[0]);
      return NextResponse.json(productWithBrand);
    } else {

      return NextResponse.json(
        {
          error: 'Producto no encontrado',
          message: `No se encontró ningún producto con el slug: ${slug}`,
          slug: slug
        },
        { status: 404 }
      );
    }

  } catch (error) {
    console.error('WooCommerce API Error:', error);
    return NextResponse.json(
      {
        error: 'Failed to fetch product',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}