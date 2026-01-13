import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      customerInfo,
      cartItems,
      total,
      appliedCoupons, // Applied coupons from cart
      paymentIntentId, // For ONVO compatibility (legacy)
      paymentMethod,
      tilopayOrderNumber,
      tilopayData,
      billingAddress,
      shippingAddress,
      customer_note, // Add customer notes support
      personal_info, // New structured personal info
      shipping_option, // New shipping options
      shipping_other_details,
      contact_data // Optional contact data
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
    
    // Build comprehensive customer notes from new structured data
    let structuredCustomerNote = customer_note || '';
    
    if (personal_info) {
      const noteComponents = [];
      
      if (customer_note) {
        noteComponents.push(`NOTAS DEL CLIENTE: ${customer_note}`);
      }
      
      noteComponents.push(`--- INFORMACIÓN DETALLADA DEL CLIENTE ---`);
      noteComponents.push(`Nombre/Razón Social: ${personal_info.company_name || 'N/A'}`);
      noteComponents.push(`Cédula: ${personal_info.id_number || 'N/A'}`);
      if (personal_info.hacienda_code) {
        noteComponents.push(`Código de actividad de Hacienda: ${personal_info.hacienda_code}`);
      }

      // Add client type information
      if (personal_info.client_type) {
        const clientTypeLabels = {
          'odontologo': 'Odontólogo',
          'tecnico': 'Técnico Dental',
          'otro': 'Otro'
        };
        let clientTypeDisplay = clientTypeLabels[personal_info.client_type] || personal_info.client_type;
        if (personal_info.client_type === 'otro' && personal_info.client_type_other) {
          clientTypeDisplay += `: ${personal_info.client_type_other}`;
        }
        noteComponents.push(`Tipo de cliente: ${clientTypeDisplay}`);
      }
      
      if (personal_info.contact_numbers) {
        noteComponents.push(`Celular: ${personal_info.contact_numbers.cellphone || 'N/A'}`);
        if (personal_info.contact_numbers.other) {
          noteComponents.push(`Teléfono adicional: ${personal_info.contact_numbers.other}`);
        }
      }
      
      if (personal_info.emails) {
        noteComponents.push(`Email facturación: ${personal_info.emails.billing || 'N/A'}`);
        if (personal_info.emails.other) {
          noteComponents.push(`Email adicional: ${personal_info.emails.other}`);
        }
      }
      
      if (personal_info.address) {
        noteComponents.push(`Dirección: ${personal_info.address.province}, ${personal_info.address.canton}, ${personal_info.address.district}`);
        if (personal_info.address.other_details) {
          noteComponents.push(`Otras señas: ${personal_info.address.other_details}`);
        }
        if (personal_info.address.waze_link) {
          noteComponents.push(`Enlace Waze: ${personal_info.address.waze_link}`);
        }
      }
      
      // Shipping information
      if (shipping_option) {
        noteComponents.push(`--- INFORMACIÓN DE ENVÍO ---`);
        const shippingOptions = {
          'messenger': 'Envío por mensajería ($9)',
          'pickup': 'Retiro en instalaciones (Sin costo)',
          'other': 'Otro'
        };
        noteComponents.push(`Opción de envío: ${shippingOptions[shipping_option] || shipping_option}`);
        
        if (shipping_option === 'other' && shipping_other_details) {
          noteComponents.push(`Detalles de envío: ${shipping_other_details}`);
        }
      }
      
      // Contact data (optional)
      if (contact_data && (contact_data.name || contact_data.email || contact_data.phone)) {
        noteComponents.push(`--- DATOS DE CONTACTO ADICIONALES ---`);
        if (contact_data.name) {
          noteComponents.push(`Nombre contacto: ${contact_data.name}`);
        }
        if (contact_data.email) {
          noteComponents.push(`Email contacto: ${contact_data.email}`);
        }
        if (contact_data.phone) {
          noteComponents.push(`Teléfono contacto: ${contact_data.phone}`);
        }
      }
      
      structuredCustomerNote = noteComponents.join('\n');
    }
    
    // Preparar datos para WooCommerce
    const orderData = {
      payment_method: isTilopay ? 'tilopay' : 'onvo_pay',
      payment_method_title: isTilopay ? 'TiloPay' : 'ONVO Pay',
      set_paid: paymentIntentId ? true : false, // Solo marcar como pagado si ONVO ya procesó el pago
      customer_note: structuredCustomerNote, // Enhanced customer notes with structured data
      billing: {
        first_name: personal_info?.company_name || customerInfo.firstName || billingAddress?.first_name || '',
        last_name: '', // Company name goes in first_name for business
        company: personal_info?.company_name || '',
        address_1: personal_info?.address ? `${personal_info.address.province}, ${personal_info.address.canton}, ${personal_info.address.district}` : (billingAddress?.address_1 || ''),
        address_2: personal_info?.address?.other_details || billingAddress?.address_2 || '',
        city: personal_info?.address?.canton || billingAddress?.city || '',
        state: personal_info?.address?.province || billingAddress?.state || '',
        postcode: billingAddress?.postcode || '',
        country: billingAddress?.country || 'CR',
        email: personal_info?.emails?.billing || customerInfo.email || billingAddress?.email || '',
        phone: personal_info?.contact_numbers?.cellphone || customerInfo.phone || billingAddress?.phone || '',
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
        variation_id: item.variationId || 0,
        quantity: item.quantity,
        name: item.name,
        price: item.price,
        ...(item.variationAttributes && item.variationAttributes.length > 0 ? {
          meta_data: item.variationAttributes.map((attr: any) => ({
            key: attr.name,
            value: attr.option
          }))
        } : {})
      })),
      coupon_lines: appliedCoupons?.map((coupon: any) => ({
        code: coupon.code,
        discount: coupon.discount.toString(),
        discount_tax: '0'
      })) || [],
      shipping_lines: [
        {
          method_id: shipping_option === 'messenger' ? 'messenger_delivery' : 'flat_rate',
          method_title: shipping_option === 'messenger' ? 'Envío por mensajería' : 
                       shipping_option === 'pickup' ? 'Retiro en instalaciones' : 'Envío personalizado',
          total: shipping_option === 'messenger' ? '9' : '0',
        },
      ],
      meta_data: [
        // Payment-specific metadata
        ...(isTilopay ? [
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
        ]),
        
        // New structured customer information metadata
        ...(personal_info ? [
          {
            key: '_customer_id_number',
            value: personal_info.id_number || '',
          },
          {
            key: '_customer_company_name',
            value: personal_info.company_name || '',
          },
          {
            key: '_customer_hacienda_code',
            value: personal_info.hacienda_code || '',
          },
          {
            key: '_customer_client_type',
            value: personal_info.client_type || '',
          },
          {
            key: '_customer_client_type_other',
            value: personal_info.client_type_other || '',
          },
          {
            key: '_customer_cellphone',
            value: personal_info.contact_numbers?.cellphone || '',
          },
          {
            key: '_customer_phone_other',
            value: personal_info.contact_numbers?.other || '',
          },
          {
            key: '_customer_email_billing',
            value: personal_info.emails?.billing || '',
          },
          {
            key: '_customer_email_other',
            value: personal_info.emails?.other || '',
          },
          {
            key: '_customer_province',
            value: personal_info.address?.province || '',
          },
          {
            key: '_customer_canton',
            value: personal_info.address?.canton || '',
          },
          {
            key: '_customer_district',
            value: personal_info.address?.district || '',
          },
          {
            key: '_customer_address_details',
            value: personal_info.address?.other_details || '',
          },
          {
            key: '_customer_waze_link',
            value: personal_info.address?.waze_link || '',
          },
        ] : []),
        
        // Shipping metadata
        {
          key: '_shipping_option',
          value: shipping_option || 'messenger',
        },
        {
          key: '_shipping_other_details',
          value: shipping_other_details || '',
        },
        
        // Contact data metadata (optional)
        ...(contact_data ? [
          {
            key: '_contact_data_name',
            value: contact_data.name || '',
          },
          {
            key: '_contact_data_email',
            value: contact_data.email || '',
          },
          {
            key: '_contact_data_phone',
            value: contact_data.phone || '',
          },
        ] : []),
        {
          key: '_order_source',
          value: 'Next.js Frontend',
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
        order_key: order.order_key,
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