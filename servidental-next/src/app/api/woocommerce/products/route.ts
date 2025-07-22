import { NextRequest, NextResponse } from 'next/server';

async function makeWooCommerceRequest(endpoint: string, params: URLSearchParams) {
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
    console.error('WooCommerce request failed:', error);
    throw error;
  }
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