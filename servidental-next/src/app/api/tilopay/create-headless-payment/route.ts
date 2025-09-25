import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    console.log('🔗 Creating headless TiloPay payment...');

    const body = await request.json();
    const { amount, currency, orderNumber, wooOrderId, customerInfo, items } = body;

    // Validate required fields
    if (!amount || !currency || !orderNumber || !customerInfo || !wooOrderId) {
      return NextResponse.json(
        { error: 'Missing required payment data' },
        { status: 400 }
      );
    }

    console.log('Payment data:', { amount, currency, orderNumber, wooOrderId });

    // For headless architecture, we need to use TiloPay's hosted checkout
    // Since we can't use their API directly (404 errors), we'll use a different approach
    
    // Create a payment form URL that posts to TiloPay with the configured credentials
    const tilopayCredentials = {
      apiuser: process.env.TILOPAY_API_USER,
      password: process.env.TILOPAY_API_PASS,
      key: process.env.TILOPAY_API_KEY
    };

    // Build the payment parameters
    const paymentParams = {
      // Authentication
      ...tilopayCredentials,
      
      // Payment details
      amount: amount,
      currency: currency,
      orderNumber: orderNumber,
      description: `Pedido ${orderNumber} - ${items?.length || 0} productos`,
      
      // Customer info
      billToFirstName: customerInfo.firstName,
      billToLastName: customerInfo.lastName,
      billToEmail: customerInfo.email,
      billToPhone: customerInfo.phone || '',
      billToAddress: customerInfo.address?.line1 || '',
      billToCity: customerInfo.address?.city || '',
      billToState: customerInfo.address?.state || '',
      billToPostalCode: customerInfo.address?.postalCode || '',
      billToCountry: customerInfo.address?.country || 'CR',
      
      // Callback URLs - must point to your Next.js app
      successUrl: `${process.env.NEXT_PUBLIC_TILOPAY_REDIRECT}?status=success&orderNumber=${orderNumber}&wooOrderId=${wooOrderId}`,
      cancelUrl: `${process.env.NEXT_PUBLIC_TILOPAY_REDIRECT}?status=cancel&orderNumber=${orderNumber}&wooOrderId=${wooOrderId}`,
      notificationUrl: `${process.env.NEXT_PUBLIC_TILOPAY_REDIRECT}?status=notification&orderNumber=${orderNumber}&wooOrderId=${wooOrderId}`,
    };

    // Try different TiloPay payment endpoints that might work
    const possibleEndpoints = [
      'https://app.tilopay.com/payment',
      'https://app.tilopay.com/checkout',
      'https://tilopay.com/payment',
      'https://tilopay.com/checkout',
      'https://secure.tilopay.com/payment',
      'https://payment.tilopay.com',
    ];

    let paymentUrl = null;
    let workingEndpoint = null;

    // Try to find a working endpoint by testing with a simple request
    for (const endpoint of possibleEndpoints) {
      try {
        console.log(`🔍 Testing endpoint: ${endpoint}`);
        const testResponse = await fetch(endpoint, {
          method: 'HEAD',
          signal: AbortSignal.timeout(3000), // 3 second timeout
        });
        
        if (testResponse.status !== 404) {
          workingEndpoint = endpoint;
          console.log(`✅ Found working endpoint: ${endpoint} (Status: ${testResponse.status})`);
          break;
        }
      } catch (error) {
        console.log(`❌ Endpoint ${endpoint} failed:`, error instanceof Error ? error.message : String(error));
      }
    }

    // Create payment form URL with all parameters
    const baseUrl = process.env.NODE_ENV === 'production' 
      ? 'https://servidentalcr.com' 
      : 'http://localhost:3000';
    
    const formParams = new URLSearchParams({
      amount: String(amount),
      currency: String(currency),
      orderNumber: String(orderNumber),
      wooOrderId: String(wooOrderId),
      firstName: customerInfo.firstName,
      lastName: customerInfo.lastName,
      email: customerInfo.email,
      phone: customerInfo.phone || '',
      address: customerInfo.address?.line1 || '',
      city: customerInfo.address?.city || '',
      state: customerInfo.address?.state || '',
      postalCode: customerInfo.address?.postalCode || '',
      country: customerInfo.address?.country || 'CR',
    });

    paymentUrl = `${baseUrl}/tilopay-payment?${formParams.toString()}`;
    console.log('✅ TiloPay payment form URL created for direct POST integration');

    return NextResponse.json({
      success: true,
      paymentUrl: paymentUrl,
      orderNumber: orderNumber,
      wooOrderId: wooOrderId,
      paymentId: orderNumber,
    });

  } catch (error) {
    console.error('❌ Headless TiloPay Payment Creation Error:', error);

    const errorMessage = error instanceof Error ? error.message : 'Unknown payment creation error';
    
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to create headless payment',
        details: errorMessage,
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed. Use POST to create headless payment.' },
    { status: 405 }
  );
}