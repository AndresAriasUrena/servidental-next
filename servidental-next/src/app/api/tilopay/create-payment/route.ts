import { NextRequest, NextResponse } from 'next/server';
import { getTilopayBearerToken, validateTilopayConfig, tilopayConfig } from '@/lib/tilopay';

export async function POST(request: NextRequest) {
  try {
    // Validate configuration
    validateTilopayConfig();

    console.log('💳 Creating TiloPay payment...');

    const body = await request.json();
    const { amount, currency, orderNumber, customerInfo, items } = body;

    // Validate required fields
    if (!amount || !currency || !orderNumber || !customerInfo) {
      return NextResponse.json(
        { error: 'Missing required payment data' },
        { status: 400 }
      );
    }

    console.log('Payment data:', { amount, currency, orderNumber });

    let bearerToken: string | null = null;
    let paymentResponse: Response;

    try {
      // Try to get Bearer token for API calls
      bearerToken = await getTilopayBearerToken();
      console.log('✅ Authentication successful, proceeding with payment creation...');

      // Create payment with TiloPay API using Bearer token
      paymentResponse = await fetch(tilopayConfig.paymentUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${bearerToken}`,
        },
        body: JSON.stringify({
          amount: amount,
          currency: currency,
          orderNumber: orderNumber,
          description: `Pedido ${orderNumber} - ${items?.length || 0} productos`,
          billToFirstName: customerInfo.firstName,
          billToLastName: customerInfo.lastName,
          billToEmail: customerInfo.email,
          billToPhone: customerInfo.phone || '',
          billToAddress: customerInfo.address?.line1 || '',
          billToCity: customerInfo.address?.city || '',
          billToState: customerInfo.address?.state || '',
          billToPostalCode: customerInfo.address?.postalCode || '',
          billToCountry: customerInfo.address?.country || 'CR',
          successUrl: `${process.env.NEXT_PUBLIC_TILOPAY_REDIRECT}?status=success&orderNumber=${orderNumber}`,
          cancelUrl: `${process.env.NEXT_PUBLIC_TILOPAY_REDIRECT}?status=cancel&orderNumber=${orderNumber}`,
          notificationUrl: process.env.NEXT_PUBLIC_TILOPAY_REDIRECT,
        }),
      });
    } catch (authError) {
      console.error('❌ Authentication failed, trying direct payment creation...', authError);
      
      // If authentication fails, try direct payment creation with credentials
      paymentResponse = await fetch(tilopayConfig.paymentUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          // Include credentials directly in payment request
          api_key: process.env.TILOPAY_API_KEY,
          api_user: process.env.TILOPAY_API_USER,
          api_password: process.env.TILOPAY_API_PASS,
          // Payment data
          amount: amount,
          currency: currency,
          orderNumber: orderNumber,
          description: `Pedido ${orderNumber} - ${items?.length || 0} productos`,
          billToFirstName: customerInfo.firstName,
          billToLastName: customerInfo.lastName,
          billToEmail: customerInfo.email,
          billToPhone: customerInfo.phone || '',
          billToAddress: customerInfo.address?.line1 || '',
          billToCity: customerInfo.address?.city || '',
          billToState: customerInfo.address?.state || '',
          billToPostalCode: customerInfo.address?.postalCode || '',
          billToCountry: customerInfo.address?.country || 'CR',
          successUrl: `${process.env.NEXT_PUBLIC_TILOPAY_REDIRECT}?status=success&orderNumber=${orderNumber}`,
          cancelUrl: `${process.env.NEXT_PUBLIC_TILOPAY_REDIRECT}?status=cancel&orderNumber=${orderNumber}`,
          notificationUrl: process.env.NEXT_PUBLIC_TILOPAY_REDIRECT,
        }),
      });
    }

    if (!paymentResponse.ok) {
      const errorData = await paymentResponse.text();
      console.error('TiloPay payment creation failed:', errorData);
      console.error('Response status:', paymentResponse.status);
      console.error('Response headers:', Object.fromEntries(paymentResponse.headers.entries()));
      
      // Try alternative endpoints if 404
      if (paymentResponse.status === 404) {
        console.log('🔄 Trying alternative TiloPay payment endpoints...');
        
        const alternativeEndpoints = [
          // Try checkout endpoints instead of payments
          'https://app.tilopay.com/api/v1/checkout',
          'https://app.tilopay.com/api/v1/orders', 
          'https://app.tilopay.com/api/checkout',
          'https://app.tilopay.com/checkout',
          // Try different payment paths
          'https://app.tilopay.com/api/payments',
          'https://tilopay.com/api/v1/payments',
          'https://tilopay.com/api/payments',
        ];
        
        for (const endpoint of alternativeEndpoints) {
          // Try different payload structures for different endpoints
          const payloadStructures = [
            // Structure 1: Standard payment payload
            {
              amount: amount,
              currency: currency,
              orderNumber: orderNumber,
              description: `Pedido ${orderNumber} - ${items?.length || 0} productos`,
              billToFirstName: customerInfo.firstName,
              billToLastName: customerInfo.lastName,
              billToEmail: customerInfo.email,
              billToPhone: customerInfo.phone || '',
              billToAddress: customerInfo.address?.line1 || '',
              billToCity: customerInfo.address?.city || '',
              billToState: customerInfo.address?.state || '',
              billToPostalCode: customerInfo.address?.postalCode || '',
              billToCountry: customerInfo.address?.country || 'CR',
              successUrl: `${process.env.NEXT_PUBLIC_TILOPAY_REDIRECT}?status=success&orderNumber=${orderNumber}`,
              cancelUrl: `${process.env.NEXT_PUBLIC_TILOPAY_REDIRECT}?status=cancel&orderNumber=${orderNumber}`,
              notificationUrl: process.env.NEXT_PUBLIC_TILOPAY_REDIRECT,
            },
            // Structure 2: Checkout-style payload
            {
              total: amount,
              currency: currency,
              reference: orderNumber,
              description: `Pedido ${orderNumber}`,
              customer: {
                name: `${customerInfo.firstName} ${customerInfo.lastName}`,
                email: customerInfo.email,
                phone: customerInfo.phone || '',
              },
              billing: {
                firstName: customerInfo.firstName,
                lastName: customerInfo.lastName,
                email: customerInfo.email,
                phone: customerInfo.phone || '',
                address: customerInfo.address?.line1 || '',
                city: customerInfo.address?.city || '',
                state: customerInfo.address?.state || '',
                zip: customerInfo.address?.postalCode || '',
                country: customerInfo.address?.country || 'CR',
              },
              redirectUrls: {
                success: `${process.env.NEXT_PUBLIC_TILOPAY_REDIRECT}?status=success&orderNumber=${orderNumber}`,
                cancel: `${process.env.NEXT_PUBLIC_TILOPAY_REDIRECT}?status=cancel&orderNumber=${orderNumber}`,
                notification: process.env.NEXT_PUBLIC_TILOPAY_REDIRECT,
              }
            },
            // Structure 3: With credentials included
            {
              apiuser: process.env.TILOPAY_API_USER,
              password: process.env.TILOPAY_API_PASS,
              amount: amount,
              currency: currency,
              orderNumber: orderNumber,
              description: `Pedido ${orderNumber} - ${items?.length || 0} productos`,
              billToFirstName: customerInfo.firstName,
              billToLastName: customerInfo.lastName,
              billToEmail: customerInfo.email,
              successUrl: `${process.env.NEXT_PUBLIC_TILOPAY_REDIRECT}?status=success&orderNumber=${orderNumber}`,
              cancelUrl: `${process.env.NEXT_PUBLIC_TILOPAY_REDIRECT}?status=cancel&orderNumber=${orderNumber}`,
            }
          ];
          
          for (let i = 0; i < payloadStructures.length; i++) {
            try {
              console.log(`🔄 Trying endpoint: ${endpoint} with payload structure ${i + 1}`);
              const altResponse = await fetch(endpoint, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  ...(bearerToken && { 'Authorization': `Bearer ${bearerToken}` }),
                },
                body: JSON.stringify(payloadStructures[i]),
              });
              
              console.log(`📊 Response status: ${altResponse.status} for ${endpoint} structure ${i + 1}`);
              
              if (altResponse.ok) {
                console.log(`✅ Alternative endpoint ${endpoint} worked with payload structure ${i + 1}!`);
                const altPaymentData = await altResponse.json();
                console.log('Payment response data:', altPaymentData);
                
                return NextResponse.json({
                  success: true,
                  paymentUrl: altPaymentData.paymentUrl || altPaymentData.checkout_url || altPaymentData.redirectUrl,
                  orderNumber: orderNumber,
                  paymentId: altPaymentData.id || altPaymentData.paymentId,
                });
              } else {
                const errorText = await altResponse.text();
                console.log(`❌ Structure ${i + 1} failed: ${altResponse.status} - ${errorText.substring(0, 200)}`);
              }
            } catch (altError) {
              console.log(`❌ Alternative endpoint ${endpoint} structure ${i + 1} failed:`, altError instanceof Error ? altError.message : String(altError));
            }
          }
        }
      }
      
      // Try to diagnose TiloPay API availability
      console.log('🔍 Attempting to diagnose TiloPay API endpoints...');
      try {
        const diagnosticResponse = await fetch('https://app.tilopay.com/api/v1/', {
          method: 'GET',
          headers: {
            ...(bearerToken && { 'Authorization': `Bearer ${bearerToken}` }),
          },
        });
        console.log('🔍 TiloPay API base endpoint status:', diagnosticResponse.status);
      } catch (diagError) {
        console.log('🔍 TiloPay API base endpoint failed:', diagError instanceof Error ? diagError.message : String(diagError));
      }

      // PRODUCTION MODE: Do not provide mock URLs when production testing is enabled
      if (tilopayConfig.productionTest) {
        console.log('🚫 Production test mode: No mock fallbacks available');
        throw new Error(`TiloPay payment creation failed in production mode: ${paymentResponse.status} - ${errorData}. Please check TiloPay account configuration and API endpoints.`);
      }

      // Only provide mock URL in development mode
      if (process.env.NODE_ENV === 'development') {
        console.log('🧪 Development mode: Creating mock payment URL for testing...');
        const mockPaymentUrl = `https://tilopay.com/mock-payment?amount=${amount}&order=${orderNumber}`;
        
        return NextResponse.json({
          success: true,
          paymentUrl: mockPaymentUrl,
          orderNumber: orderNumber,
          paymentId: 'mock-' + orderNumber,
          mock: true,
        });
      }
      
      throw new Error(`Payment creation failed: ${paymentResponse.status} - ${errorData}`);
    }

    const paymentData = await paymentResponse.json();
    console.log('✅ TiloPay payment created successfully');

    return NextResponse.json({
      success: true,
      paymentUrl: paymentData.paymentUrl || paymentData.checkout_url,
      orderNumber: orderNumber,
      paymentId: paymentData.id,
    });

  } catch (error) {
    console.error('❌ TiloPay Payment Creation Error:', error);

    const errorMessage = error instanceof Error ? error.message : 'Unknown payment creation error';
    
    // PRODUCTION MODE: Do not provide mock URLs when production testing is enabled
    if (tilopayConfig.productionTest) {
      console.log('🚫 Production test mode: Payment creation failed with no fallbacks');
      return NextResponse.json(
        {
          success: false,
          error: 'Payment creation failed in production mode',
          details: errorMessage,
          note: 'Please check TiloPay account configuration, API endpoints, and credentials',
        },
        { status: 500 }
      );
    }

    // In development, provide a fallback mock URL
    if (process.env.NODE_ENV === 'development') {
      console.log('🧪 Development fallback: Creating mock payment URL...');
      const body = await request.json().catch(() => ({}));
      const mockPaymentUrl = `https://tilopay.com/mock-payment?amount=${body.amount || 0}&order=${body.orderNumber || 'unknown'}`;
      
      return NextResponse.json({
        success: true,
        paymentUrl: mockPaymentUrl,
        orderNumber: body.orderNumber || 'unknown',
        paymentId: 'mock-' + (body.orderNumber || Date.now()),
        mock: true,
        note: 'This is a mock payment URL for development testing',
      });
    }
    
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to create payment',
        details: errorMessage,
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed. Use POST to create payment.' },
    { status: 405 }
  );
}