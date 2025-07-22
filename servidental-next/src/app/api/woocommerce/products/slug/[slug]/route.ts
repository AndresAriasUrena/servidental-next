import { NextRequest, NextResponse } from 'next/server';

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

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    
    console.log('Searching for product with slug:', slug);
    console.log('WooCommerce URL:', process.env.WOOCOMMERCE_URL);
    console.log('Consumer Key exists:', !!process.env.WOOCOMMERCE_CONSUMER_KEY);
    console.log('Consumer Secret exists:', !!process.env.WOOCOMMERCE_CONSUMER_SECRET);
    
    // Search by name/content and then filter by exact slug match
    console.log('Searching for product with slug:', slug);
    const searchParams = new URLSearchParams({
      search: slug,
      per_page: '50'
    });
    let products = await makeWooCommerceRequest('products', searchParams) as any[];
    
    // Filter by exact slug match
    if (products && products.length > 0) {
      const exactMatch = products.find((product: any) => product.slug === slug);
      if (exactMatch) {
        products = [exactMatch];
      } else {
        products = [];
      }
    }
    
    // If still no exact match, try searching with broader terms
    if (!products || products.length === 0) {
      console.log('Exact slug search failed, trying broader search...');
      // Extract words from slug for broader search
      const searchTerms = slug.replace(/-/g, ' ').split(' ').slice(0, 3).join(' ');
      const broadSearchParams = new URLSearchParams({
        search: searchTerms,
        per_page: '50'
      });
      products = await makeWooCommerceRequest('products', broadSearchParams) as any[];
      
      // Filter by exact slug match
      if (products && products.length > 0) {
        const exactMatch = products.find((product: any) => product.slug === slug);
        if (exactMatch) {
          products = [exactMatch];
        } else {
          products = [];
        }
      }
    }
    
    if (products && products.length > 0) {
      console.log('Found product:', products[0].name, 'with slug:', products[0].slug);
      return NextResponse.json(products[0]);
    } else {
      console.log('No product found with slug:', slug);
      return NextResponse.json(
        { error: 'Product not found' },
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