import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      customerInfo,
      cartItems,
      total,
      paymentIntentId, // For ONVO compatibility (legacy)
      paymentMethod,
      tilopayOrderNumber,
      tilopayData,
      billingAddress,
      shippingAddress
    } = body;

    // Validaciones
    if (!customerInfo || !cartItems || !total) {
      return NextResponse.json(
        { error: 'Información incompleta para crear la orden' },
        { status: 400 }
      );
    }

    // Determine payment method
    const isTilopay = paymentMethod === 'TiloPay' || tilopayOrderNumber;
    
    // Preparar datos para WooCommerce
    const orderData = {
      payment_method: isTilopay ? 'tilopay' : 'onvo_pay',
      payment_method_title: isTilopay ? 'TiloPay' : 'ONVO Pay',
      set_paid: true, // Marcar como pagado porque ya se procesó
      billing: {
        first_name: customerInfo.firstName || billingAddress?.first_name || '',
        last_name: customerInfo.lastName || billingAddress?.last_name || '',
        address_1: billingAddress?.address_1 || '',
        address_2: billingAddress?.address_2 || '',
        city: billingAddress?.city || '',
        state: billingAddress?.state || '',
        postcode: billingAddress?.postcode || '',
        country: billingAddress?.country || 'CR',
        email: customerInfo.email || billingAddress?.email || '',
        phone: customerInfo.phone || billingAddress?.phone || '',
      },
      shipping: {
        first_name: customerInfo.firstName || shippingAddress?.first_name || '',
        last_name: customerInfo.lastName || shippingAddress?.last_name || '',
        address_1: shippingAddress?.address_1 || '',
        address_2: shippingAddress?.address_2 || '',
        city: shippingAddress?.city || '',
        state: shippingAddress?.state || '',
        postcode: shippingAddress?.postcode || '',
        country: shippingAddress?.country || 'CR',
      },
      line_items: cartItems.map((item: any) => ({
        product_id: item.id,
        quantity: item.quantity,
        name: item.name,
        price: item.price,
      })),
      shipping_lines: [
        {
          method_id: 'flat_rate',
          method_title: 'Envío estándar',
          total: '0', // Por ahora gratis, puedes calcular según tu lógica
        },
      ],
      meta_data: isTilopay ? [
        {
          key: '_tilopay_order_number',
          value: tilopayOrderNumber || '',
        },
        {
          key: '_payment_via',
          value: 'TiloPay',
        },
        {
          key: '_transaction_id',
          value: tilopayOrderNumber || '',
        },
        {
          key: '_tilopay_callback_data',
          value: JSON.stringify(tilopayData || {}),
        },
      ] : [
        {
          key: '_onvo_payment_intent_id',
          value: paymentIntentId || '',
        },
        {
          key: '_payment_via',
          value: 'ONVO Pay',
        },
        {
          key: '_transaction_id',
          value: paymentIntentId || '',
        },
      ],
    };

    // Crear la orden en WooCommerce
    const woocommerceUrl = process.env.WOOCOMMERCE_URL;
    const consumerKey = process.env.WOOCOMMERCE_CONSUMER_KEY;
    const consumerSecret = process.env.WOOCOMMERCE_CONSUMER_SECRET;

    if (!woocommerceUrl || !consumerKey || !consumerSecret) {
      return NextResponse.json(
        { error: 'Configuración de WooCommerce incompleta' },
        { status: 500 }
      );
    }

    console.log('Creando orden en WooCommerce:', JSON.stringify(orderData, null, 2));

    const wooResponse = await fetch(`${woocommerceUrl}/wp-json/wc/v3/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64')}`,
      },
      body: JSON.stringify(orderData),
    });

    if (!wooResponse.ok) {
      const errorText = await wooResponse.text();
      console.error('Error de WooCommerce:', errorText);
      return NextResponse.json(
        { 
          error: 'Error al crear la orden en WooCommerce',
          details: errorText
        },
        { status: wooResponse.status }
      );
    }

    const order = await wooResponse.json();
    console.log('Orden creada exitosamente:', order.id);

    return NextResponse.json({
      success: true,
      order: {
        id: order.id,
        number: order.number,
        status: order.status,
        total: order.total,
        date_created: order.date_created,
      },
    });

  } catch (error) {
    console.error('Error creando orden:', error);
    return NextResponse.json(
      { 
        error: 'Error interno del servidor',
        details: error instanceof Error ? error.message : 'Error desconocido'
      },
      { status: 500 }
    );
  }
} 