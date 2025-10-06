import { NextRequest, NextResponse } from 'next/server';

// Validar variables de entorno
const WP_URL = process.env.WOOCOMMERCE_URL;
const WC_KEY = process.env.WOOCOMMERCE_CONSUMER_KEY;
const WC_SECRET = process.env.WOOCOMMERCE_CONSUMER_SECRET;

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
      // Timeout de 10 segundos
      signal: AbortSignal.timeout(10000)
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`[WooCommerce API] Upstream error ${response.status}:`, errorText);
      throw new Error(`Upstream WooCommerce API returned ${response.status}: ${errorText}`);
    }

    const jsonData = await response.json();
    const total = response.headers.get('x-wp-total');

    return {
      data: jsonData,
      total: total ? parseInt(total) : jsonData.length,
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

    // Default parameters for categories
    if (!searchParams.has('per_page')) {
      searchParams.set('per_page', '100');
    }

    console.log('[WooCommerce API] Categories request params:', Object.fromEntries(searchParams.entries()));

    const response = await makeWooCommerceRequest('products/categories', searchParams) as any;

    console.log(`[WooCommerce API] Success: ${response.data.length} categories`);

    return NextResponse.json(response);

  } catch (error) {
    console.error('[WooCommerce API] Error in GET /api/woocommerce/categories:', error);

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
        error: 'Failed to fetch categories',
        detail: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}