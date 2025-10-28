import { NextRequest, NextResponse } from 'next/server';
import https from 'https';

async function makeWooCommerceRequest(endpoint: string) {
  return new Promise((resolve, reject) => {
    const url = new URL(process.env.WOOCOMMERCE_URL!);

    const queryParams = new URLSearchParams({
      consumer_key: process.env.WOOCOMMERCE_CONSUMER_KEY!,
      consumer_secret: process.env.WOOCOMMERCE_CONSUMER_SECRET!,
      per_page: '100', // Get all variations
      status: 'publish' // Only published variations
    });

    const apiPath = `/wp-json/wc/v3/${endpoint}?${queryParams.toString()}`;

    const options = {
      hostname: url.hostname,
      port: url.port || 443,
      path: apiPath,
      method: 'GET',
      headers: {
        'User-Agent': 'ServidentalCR-NextJS/1.0'
      }
    };

    const req = https.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        try {
          if (res.statusCode === 200) {
            const jsonData = JSON.parse(data);
            resolve(jsonData);
          } else {
            reject(new Error(`API Error ${res.statusCode}: ${data}`));
          }
        } catch (error) {
          reject(new Error(`Parse Error: ${error}`));
        }
      });
    });

    req.on('error', (error) => {
      reject(new Error(`Request Error: ${error.message}`));
    });

    req.setTimeout(10000, () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });

    req.end();
  });
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: productId } = await params;

    console.log('Fetching variations for product ID:', productId);

    const variations = await makeWooCommerceRequest(`products/${productId}/variations`) as any[];

    // Filter only purchasable and in-stock variations
    const availableVariations = variations.filter(v =>
      v.purchasable && v.status === 'publish'
    );

    return NextResponse.json(availableVariations);

  } catch (error) {
    console.error('WooCommerce Variations API Error:', error);
    return NextResponse.json(
      {
        error: 'Failed to fetch product variations',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
