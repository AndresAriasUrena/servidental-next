import { NextResponse } from 'next/server';

export async function GET() {
  try {
    console.log('Testing WooCommerce connection...');
    console.log('WOOCOMMERCE_URL:', process.env.WOOCOMMERCE_URL);
    console.log('Consumer Key exists:', !!process.env.WOOCOMMERCE_CONSUMER_KEY);
    console.log('Consumer Secret exists:', !!process.env.WOOCOMMERCE_CONSUMER_SECRET);
    console.log('Consumer Key length:', process.env.WOOCOMMERCE_CONSUMER_KEY?.length);
    console.log('Consumer Secret length:', process.env.WOOCOMMERCE_CONSUMER_SECRET?.length);

    const testUrl = `${process.env.WOOCOMMERCE_URL}/wp-json/wc/v3/products?consumer_key=${process.env.WOOCOMMERCE_CONSUMER_KEY}&consumer_secret=${process.env.WOOCOMMERCE_CONSUMER_SECRET}&per_page=1`;
    
    console.log('Test URL (without credentials):', `${process.env.WOOCOMMERCE_URL}/wp-json/wc/v3/products?per_page=1`);

    const response = await fetch(testUrl, {
      method: 'GET',
      headers: {
        'User-Agent': 'ServidentalCR-NextJS/1.0'
      }
    });

    console.log('Response status:', response.status);
    console.log('Response headers:', Object.fromEntries(response.headers.entries()));

    if (response.ok) {
      const data = await response.json();
      return NextResponse.json({
        success: true,
        status: response.status,
        dataLength: data.length,
        firstProduct: data[0]?.name || 'No products found'
      });
    } else {
      const errorText = await response.text();
      console.log('Error response:', errorText);
      
      return NextResponse.json({
        success: false,
        status: response.status,
        error: errorText
      });
    }
  } catch (error) {
    console.error('Test error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}