import { NextRequest, NextResponse } from 'next/server';
import https from 'https';
import { sanitizeProductHtml, normalizeDescription } from '@/server/sanitize';

async function makeWooCommerceRequest(endpoint: string) {
  return new Promise((resolve, reject) => {
    const url = new URL(process.env.WOOCOMMERCE_URL!);
    
    const queryParams = new URLSearchParams({
      consumer_key: process.env.WOOCOMMERCE_CONSUMER_KEY!,
      consumer_secret: process.env.WOOCOMMERCE_CONSUMER_SECRET!,
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
    
    console.log('Fetching product ID:', productId);

    const product = await makeWooCommerceRequest(`products/${productId}`) as any;

    // Verificar que el producto esté publicado
    if (product.status !== 'publish') {
      console.log(`Product ${productId} has status "${product.status}" - returning 404`);
      return NextResponse.json(
        {
          error: 'Product not found',
          message: 'Este producto no está disponible públicamente'
        },
        { status: 404 }
      );
    }

    // Sanitizar descripciones HTML
    const sanitizedProduct = {
      ...product,
      short_description: sanitizeProductHtml(product.short_description || ''),
      description: sanitizeProductHtml(normalizeDescription(product.description || ''))
    };

    return NextResponse.json(sanitizedProduct);
    
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