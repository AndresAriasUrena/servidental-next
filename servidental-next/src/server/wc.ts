/**
 * WooCommerce API Helper
 * Maneja autenticación y requests genéricas al REST API de WooCommerce
 */

interface WooCommerceRequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: any;
  timeout?: number;
}

/**
 * Realiza una request autenticada al API de WooCommerce
 */
export async function wooCommerceRequest<T = any>(
  endpoint: string,
  options: WooCommerceRequestOptions = {}
): Promise<T> {
  const { method = 'GET', body, timeout = 12000 } = options;

  const baseUrl = process.env.WOOCOMMERCE_URL;
  const consumerKey = process.env.WOOCOMMERCE_CONSUMER_KEY;
  const consumerSecret = process.env.WOOCOMMERCE_CONSUMER_SECRET;

  if (!baseUrl || !consumerKey || !consumerSecret) {
    throw new Error('[WC] Missing WooCommerce credentials in environment variables');
  }

  const url = new URL(`${baseUrl}/wp-json/wc/v3/${endpoint}`);
  url.searchParams.set('consumer_key', consumerKey);
  url.searchParams.set('consumer_secret', consumerSecret);

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url.toString(), {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'User-Agent': 'ServidentalCR-NextJS/1.0',
      },
      body: body ? JSON.stringify(body) : undefined,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`[WC] API Error ${response.status}:`, errorText);
      throw new Error(`WooCommerce API error: ${response.status}`);
    }

    // Capturar headers de paginación si existen
    const totalPages = response.headers.get('X-WP-TotalPages');
    const total = response.headers.get('X-WP-Total');

    const data = await response.json();

    // Si hay headers de paginación, incluirlos en la respuesta
    if (totalPages && total) {
      return {
        data,
        pagination: {
          total: parseInt(total, 10),
          totalPages: parseInt(totalPages, 10),
        },
      } as T;
    }

    return data as T;
  } catch (error) {
    clearTimeout(timeoutId);

    if (error instanceof Error && error.name === 'AbortError') {
      console.error('[WC] Request timeout');
      throw new Error('Request timeout');
    }

    console.error('[WC] Request failed:', error);
    throw error;
  }
}

/**
 * Obtiene las reviews de un producto
 */
export async function getProductReviews(
  productId: number,
  page: number = 1,
  perPage: number = 10
) {
  const endpoint = `products/reviews?product=${productId}&status=approved&per_page=${perPage}&page=${page}`;

  console.log(`[Reviews] Fetching reviews for product ${productId}, page ${page}`);

  return wooCommerceRequest<{
    data: any[];
    pagination: { total: number; totalPages: number };
  }>(endpoint);
}

/**
 * Crea una nueva review (en estado "hold" para moderación)
 */
export async function createProductReview(data: {
  product_id: number;
  review: string;
  reviewer: string;
  reviewer_email: string;
  rating: number;
}) {
  console.log(`[Reviews] Creating review for product ${data.product_id}`);

  return wooCommerceRequest('products/reviews', {
    method: 'POST',
    body: {
      ...data,
      status: 'hold', // Siempre en moderación
    },
  });
}

/**
 * Obtiene información del producto incluyendo average_rating y rating_count
 */
export async function getProductRatingSummary(productId: number) {
  console.log(`[Reviews] Fetching rating summary for product ${productId}`);

  const product = await wooCommerceRequest<any>(`products/${productId}`);

  return {
    average: parseFloat(product.average_rating) || 0,
    count: parseInt(product.rating_count, 10) || 0,
  };
}
