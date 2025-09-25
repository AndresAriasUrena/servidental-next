import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      wooOrderId,
      orderNumber,
      transactionId,
      paymentStatus,
      paymentMethod
    } = body;

    // Validaciones
    if (!wooOrderId || !paymentStatus) {
      return NextResponse.json(
        { error: 'Información incompleta para actualizar la orden' },
        { status: 400 }
      );
    }

    console.log('🔄 Updating WooCommerce order:', wooOrderId, 'to status:', paymentStatus);

    // WooCommerce API credentials
    const woocommerceUrl = process.env.WOOCOMMERCE_URL;
    const consumerKey = process.env.WOOCOMMERCE_CONSUMER_KEY;
    const consumerSecret = process.env.WOOCOMMERCE_CONSUMER_SECRET;

    if (!woocommerceUrl || !consumerKey || !consumerSecret) {
      return NextResponse.json(
        { error: 'Configuración de WooCommerce incompleta' },
        { status: 500 }
      );
    }

    // Preparar datos de actualización
    const updateData = {
      status: paymentStatus === 'completed' ? 'processing' : paymentStatus,
      set_paid: paymentStatus === 'completed',
      meta_data: [
        {
          key: '_tilopay_transaction_id',
          value: transactionId || orderNumber || '',
        },
        {
          key: '_payment_method_title',
          value: paymentMethod || 'TiloPay',
        },
        {
          key: '_paid_date',
          value: new Date().toISOString(),
        },
      ],
    };

    // Actualizar la orden en WooCommerce
    const wooResponse = await fetch(`${woocommerceUrl}/wp-json/wc/v3/orders/${wooOrderId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64')}`,
      },
      body: JSON.stringify(updateData),
    });

    if (!wooResponse.ok) {
      const errorText = await wooResponse.text();
      console.error('Error updating WooCommerce order:', errorText);
      return NextResponse.json(
        { 
          error: 'Error al actualizar la orden en WooCommerce',
          details: errorText
        },
        { status: wooResponse.status }
      );
    }

    const updatedOrder = await wooResponse.json();
    console.log('✅ WooCommerce order updated successfully:', updatedOrder.id, 'Status:', updatedOrder.status);

    return NextResponse.json({
      success: true,
      order: {
        id: updatedOrder.id,
        status: updatedOrder.status,
        total: updatedOrder.total,
        date_paid: updatedOrder.date_paid,
      },
    });

  } catch (error) {
    console.error('Error updating WooCommerce order:', error);
    return NextResponse.json(
      { 
        error: 'Error interno del servidor',
        details: error instanceof Error ? error.message : 'Error desconocido'
      },
      { status: 500 }
    );
  }
}