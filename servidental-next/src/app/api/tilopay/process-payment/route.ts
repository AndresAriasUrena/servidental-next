import { NextRequest, NextResponse } from 'next/server';
import { createPayment, validateTilopayConfig, generateOrderNumber } from '@/lib/tilopay';

export async function POST(request: NextRequest) {
  try {
    console.log('🚀 Processing TiloPay Payment Link...');

    const body = await request.json();
    const { amount, currency, orderNumber, customerInfo, items } = body;

    // Validate required fields
    if (!amount || !currency || !customerInfo) {
      return NextResponse.json(
        { error: 'Missing required payment data' },
        { status: 400 }
      );
    }

    console.log('Payment request data:', { amount, currency, orderNumber });

    // Validate TiloPay configuration
    try {
      validateTilopayConfig();
    } catch (configError) {
      console.error('❌ TiloPay configuration error:', configError);
      return NextResponse.json(
        { 
          success: false,
          error: 'TiloPay configuration error',
          details: configError instanceof Error ? configError.message : 'Invalid configuration'
        },
        { status: 500 }
      );
    }

    // Generate order number if not provided
    const finalOrderNumber = orderNumber || generateOrderNumber('SRV');

    // Prepare payment input for TiloPay
    const paymentInput = {
      amount: parseFloat(amount.toString()),
      currency: currency || 'USD',
      orderNumber: finalOrderNumber,
      customerInfo: {
        firstName: customerInfo.firstName,
        lastName: customerInfo.lastName,
        email: customerInfo.email,
      }
    };

    console.log('Creating TiloPay payment link...');

    // Create payment link with TiloPay
    const paymentResult = await createPayment(paymentInput);

    if (!paymentResult.success) {
      console.error('❌ TiloPay payment creation failed:', paymentResult.error);
      return NextResponse.json(
        {
          success: false,
          error: 'Payment link creation failed',
          details: paymentResult.error,
          message: paymentResult.message,
        },
        { status: 500 }
      );
    }

    console.log('✅ TiloPay payment link created successfully');

    return NextResponse.json({
      success: true,
      paymentUrl: paymentResult.data?.url,
      orderNumber: finalOrderNumber,
      reference: paymentResult.data?.reference,
      paymentId: paymentResult.data?.id,
    });

  } catch (error) {
    console.error('❌ Process Payment Route Error:', error);

    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to process payment',
        details: errorMessage,
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed. Use POST to process payment.' },
    { status: 405 }
  );
}