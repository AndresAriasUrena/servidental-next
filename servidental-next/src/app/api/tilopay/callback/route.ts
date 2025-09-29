import { NextRequest, NextResponse } from 'next/server';
import { parseTilopayCallback, isPaymentSuccessful } from '@/lib/tilopay';

export async function GET(request: NextRequest) {
  try {
    console.log('🔔 TiloPay callback received');

    // Parse query parameters from the callback
    const searchParams = request.nextUrl.searchParams;
    const query: Record<string, string> = {};
    
    for (const [key, value] of searchParams.entries()) {
      query[key] = value;
    }

    console.log('📝 Callback query parameters:', query);

    // Parse TiloPay callback parameters
    const callbackParams = parseTilopayCallback(query);
    console.log('📋 Parsed callback params:', callbackParams);

    const { orderNumber, code, description, amount, currency, status } = callbackParams;

    // Determine if payment was successful
    const paymentSuccessful = isPaymentSuccessful(callbackParams);
    console.log(`💳 Payment ${paymentSuccessful ? 'successful' : 'failed'} for order: ${orderNumber}`);

    // Log the transaction for review
    console.log('📊 Transaction details:', {
      orderNumber,
      code,
      description,
      amount,
      currency,
      status,
      success: paymentSuccessful,
      timestamp: new Date().toISOString(),
    });

    // TODO: Here you would typically:
    // 1. Validate the callback authenticity (if TiloPay provides signature verification)
    // 2. Update the order status in WooCommerce
    // 3. Send confirmation emails
    // 4. Log the transaction in your database

    if (paymentSuccessful && orderNumber) {
      try {
        // TODO: Implement WooCommerce order update
        console.log(`✅ Would update WooCommerce order ${orderNumber} to 'processing' status`);
        
        // For now, we'll just log the success
        console.log('🎉 Payment confirmed - redirecting to success page');
        
        // Redirect to success page
        const successUrl = new URL('/checkout/success', request.url);
        successUrl.searchParams.set('orderNumber', orderNumber);
        if (amount) successUrl.searchParams.set('amount', amount);
        if (currency) successUrl.searchParams.set('currency', currency);
        
        return NextResponse.redirect(successUrl);
        
      } catch (updateError) {
        console.error('❌ Failed to update order:', updateError);
        
        // Even if order update fails, redirect to success since payment was processed
        const successUrl = new URL('/checkout/success', request.url);
        successUrl.searchParams.set('orderNumber', orderNumber);
        successUrl.searchParams.set('note', 'payment-confirmed-update-pending');
        
        return NextResponse.redirect(successUrl);
      }
    } else {
      console.log('❌ Payment failed or cancelled - redirecting to failure page');
      
      // Redirect to failure page
      const failureUrl = new URL('/checkout/failure', request.url);
      if (orderNumber) failureUrl.searchParams.set('orderNumber', orderNumber);
      failureUrl.searchParams.set('reason', description || 'Payment failed');
      
      return NextResponse.redirect(failureUrl);
    }

  } catch (error) {
    console.error('❌ TiloPay Callback Error:', error);
    
    // Redirect to failure page with error info
    const failureUrl = new URL('/checkout/failure', request.url);
    failureUrl.searchParams.set('reason', 'callback-processing-error');
    
    return NextResponse.redirect(failureUrl);
  }
}

// Also handle POST in case TiloPay sends POST callbacks
export async function POST(request: NextRequest) {
  try {
    console.log('🔔 TiloPay callback received via POST');

    // Get JSON body if available
    let body = {};
    try {
      body = await request.json();
      console.log('📝 Callback POST body:', body);
    } catch (e) {
      console.log('📝 No JSON body in POST callback');
    }

    // Also check query parameters
    const searchParams = request.nextUrl.searchParams;
    const query: Record<string, string> = {};
    
    for (const [key, value] of searchParams.entries()) {
      query[key] = value;
    }

    // Combine body and query parameters
    const allParams = { ...query, ...body };
    console.log('📋 Combined callback data:', allParams);

    // Parse and process the same as GET
    const callbackParams = parseTilopayCallback(allParams);
    const paymentSuccessful = isPaymentSuccessful(callbackParams);
    
    console.log(`💳 Payment ${paymentSuccessful ? 'successful' : 'failed'} for order: ${callbackParams.orderNumber}`);

    // Return JSON response for POST callbacks
    return NextResponse.json({
      success: true,
      message: 'Callback received',
      paymentSuccessful,
      orderNumber: callbackParams.orderNumber,
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    console.error('❌ TiloPay POST Callback Error:', error);
    
    return NextResponse.json(
      {
        success: false,
        error: 'Callback processing failed',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}