import { NextRequest, NextResponse } from 'next/server';
import { 
  getTilopayBearerToken, 
  verifyTilopayTransaction, 
  mapTilopayStatusToWooCommerce,
  type TilopayWebhookPayload 
} from '@/lib/tilopay';

// In-memory cache for processed orders (prevent double processing)
// In production, consider using Redis or database
const processedOrders = new Set<string>();

export async function POST(request: NextRequest) {
  try {
    console.log('🔔 TiloPay callback received via POST');
    
    const body = await request.json();
    return await processCallback(body);
    
  } catch (error) {
    console.error('❌ TiloPay POST callback error:', error);
    return NextResponse.json(
      { error: 'Failed to process callback' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    console.log('🔔 TiloPay callback received via GET');
    
    const { searchParams } = new URL(request.url);
    
    // Convert URL params to object
    const callbackData: any = {};
    searchParams.forEach((value, key) => {
      callbackData[key] = value;
    });
    
    return await processCallback(callbackData);
    
  } catch (error) {
    console.error('❌ TiloPay GET callback error:', error);
    return NextResponse.json(
      { error: 'Failed to process callback' },
      { status: 500 }
    );
  }
}

async function processCallback(data: any): Promise<NextResponse> {
  console.log('📄 Processing TiloPay callback data:', data);
  
  try {
    // Extract key information from callback
    const {
      orderNumber,
      transactionId,
      status,
      amount,
      currency,
      paymentMethod,
      reference
    } = data;

    if (!orderNumber) {
      throw new Error('Missing orderNumber in callback data');
    }

    // Idempotency check - prevent double processing
    const idempotencyKey = `${orderNumber}-${transactionId || 'unknown'}`;
    if (processedOrders.has(idempotencyKey)) {
      console.log(`⚠️ Order ${orderNumber} already processed, skipping`);
      return NextResponse.json({ 
        success: true, 
        message: 'Order already processed' 
      });
    }

    console.log(`🔍 Processing order: ${orderNumber}, status: ${status}`);

    // Server-to-Server verification (when available)
    let verificationResult = null;
    try {
      const bearerToken = await getTilopayBearerToken();
      verificationResult = await verifyTilopayTransaction(bearerToken, orderNumber);
      console.log('✅ S2S verification successful:', verificationResult);
    } catch (verifyError) {
      console.warn('⚠️ S2S verification failed, proceeding with callback data:', verifyError);
      // Continue with callback data if S2S verification is not available
    }

    // Map TiloPay status to WooCommerce
    const wooStatus = mapTilopayStatusToWooCommerce(status);
    console.log(`📝 Mapping status: ${status} → ${wooStatus}`);

    // Update WooCommerce order
    const orderUpdateResult = await updateWooCommerceOrder(orderNumber, {
      status: wooStatus,
      transactionId: transactionId || '',
      paymentMethod: paymentMethod || 'TiloPay',
      amount: amount || 0,
      currency: currency || 'CRC',
      tilopayData: data,
    });

    // Mark as processed
    processedOrders.add(idempotencyKey);

    console.log(`✅ Order ${orderNumber} processed successfully`);

    return NextResponse.json({
      success: true,
      orderNumber,
      woocommerceStatus: wooStatus,
      orderUpdateResult,
    });

  } catch (error) {
    console.error('❌ Callback processing error:', error);
    
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to process payment callback',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

async function updateWooCommerceOrder(orderNumber: string, paymentData: any) {
  try {
    console.log(`📝 Updating WooCommerce order: ${orderNumber}`);

    // Call WooCommerce API to update order
    const response = await fetch(`${process.env.WOOCOMMERCE_URL}/wp-json/wc/v3/orders`, {
      method: 'GET',
      headers: {
        'Authorization': `Basic ${Buffer.from(`${process.env.WOOCOMMERCE_CONSUMER_KEY}:${process.env.WOOCOMMERCE_CONSUMER_SECRET}`).toString('base64')}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`WooCommerce API error: ${response.status}`);
    }

    const orders = await response.json();
    
    // Find order by order number (might be in meta data)
    const order = orders.find((o: any) => 
      o.number === orderNumber || 
      o.meta_data?.some((meta: any) => meta.key === 'tilopay_order_number' && meta.value === orderNumber)
    );

    if (!order) {
      throw new Error(`Order not found: ${orderNumber}`);
    }

    // Update order status and payment info
    const updateResponse = await fetch(`${process.env.WOOCOMMERCE_URL}/wp-json/wc/v3/orders/${order.id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Basic ${Buffer.from(`${process.env.WOOCOMMERCE_CONSUMER_KEY}:${process.env.WOOCOMMERCE_CONSUMER_SECRET}`).toString('base64')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        status: paymentData.status,
        transaction_id: paymentData.transactionId,
        meta_data: [
          ...order.meta_data,
          {
            key: 'tilopay_transaction_id',
            value: paymentData.transactionId,
          },
          {
            key: 'tilopay_payment_method',
            value: paymentData.paymentMethod,
          },
          {
            key: 'tilopay_callback_data',
            value: JSON.stringify(paymentData.tilopayData),
          },
        ],
      }),
    });

    if (!updateResponse.ok) {
      throw new Error(`Failed to update WooCommerce order: ${updateResponse.status}`);
    }

    const updatedOrder = await updateResponse.json();
    console.log(`✅ WooCommerce order ${orderNumber} updated successfully`);
    
    return updatedOrder;

  } catch (error) {
    console.error('❌ WooCommerce update error:', error);
    throw error;
  }
}