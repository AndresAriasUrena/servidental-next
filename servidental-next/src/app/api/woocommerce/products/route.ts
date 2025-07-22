import { NextRequest, NextResponse } from 'next/server';
import https from 'https';

async function makeWooCommerceRequest(endpoint: string, params: URLSearchParams) {
  return new Promise((resolve, reject) => {
    const url = new URL(process.env.WOOCOMMERCE_URL!);
    
    const queryParams = new URLSearchParams({
      consumer_key: process.env.WOOCOMMERCE_CONSUMER_KEY!,
      consumer_secret: process.env.WOOCOMMERCE_CONSUMER_SECRET!,
      ...Object.fromEntries(params.entries())
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
            resolve({
              data: jsonData,
              total: res.headers['x-wp-total'] ? parseInt(res.headers['x-wp-total'] as string) : jsonData.length,
              totalPages: res.headers['x-wp-totalpages'] ? parseInt(res.headers['x-wp-totalpages'] as string) : 1,
              headers: res.headers
            });
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

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Log para debugging
    console.log('API Request params:', Object.fromEntries(searchParams.entries()));
    
    const response = await makeWooCommerceRequest('products', searchParams) as any;
    
    console.log(`Found ${response.data.length} products, total: ${response.total}`);
    
    return NextResponse.json({
      data: response.data,
      total: response.total,
      total_pages: response.totalPages,
      current_page: parseInt(searchParams.get('page') || '1'),
      per_page: parseInt(searchParams.get('per_page') || '12')
    });
    
  } catch (error) {
    console.error('WooCommerce API Error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch products',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}