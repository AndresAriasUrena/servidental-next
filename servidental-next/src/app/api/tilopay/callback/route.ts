// /src/app/api/tilopay/callback/route.ts
// TiloPay payment callback handler - redirects user after payment
import { NextResponse } from 'next/server';

// ——— Funciones de integración con WooCommerce ———
async function markWooOrderPaid(wooOrderId: number | string, payload: any) {
  try {
    console.log(`✅ Marking WooCommerce order ${wooOrderId} as paid...`);
    
    const response = await fetch(`${process.env.WOOCOMMERCE_URL}/wp-json/wc/v3/orders/${wooOrderId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${Buffer.from(`${process.env.WOOCOMMERCE_CONSUMER_KEY}:${process.env.WOOCOMMERCE_CONSUMER_SECRET}`).toString('base64')}`
      },
      body: JSON.stringify({
        status: 'processing',
        meta_data: [
          {
            key: '_tilopay_order_id',
            value: payload.tilopayOrderId || ''
          },
          {
            key: '_tilopay_link_id', 
            value: payload.tilopayLinkId || ''
          },
          {
            key: '_tilopay_last4',
            value: payload.last4 || ''
          },
          {
            key: '_tilopay_card_brand',
            value: payload.brand || ''
          },
          {
            key: '_tilopay_order_hash',
            value: payload.orderHash || ''
          },
          {
            key: '_tilopay_callback_data',
            value: JSON.stringify(payload)
          },
          {
            key: '_payment_method_title',
            value: 'TiloPay'
          },
          {
            key: '_transaction_id',
            value: payload.tilopayOrderId || payload.orderNumber
          }
        ]
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`❌ Failed to update WooCommerce order ${wooOrderId}:`, errorText);
      return false;
    }

    const updatedOrder = await response.json();
    console.log(`✅ WooCommerce order ${wooOrderId} marked as processing:`, updatedOrder.id);
    return true;
  } catch (error) {
    console.error(`❌ Error marking WooCommerce order ${wooOrderId} as paid:`, error);
    return false;
  }
}

async function markWooOrderFailed(wooOrderId: number | string, reason: string, payload: any) {
  try {
    console.log(`❌ Marking WooCommerce order ${wooOrderId} as failed...`);
    
    const response = await fetch(`${process.env.WOOCOMMERCE_URL}/wp-json/wc/v3/orders/${wooOrderId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${Buffer.from(`${process.env.WOOCOMMERCE_CONSUMER_KEY}:${process.env.WOOCOMMERCE_CONSUMER_SECRET}`).toString('base64')}`
      },
      body: JSON.stringify({
        status: 'failed',
        customer_note: `Pago TiloPay fallido: ${reason}`,
        meta_data: [
          {
            key: '_tilopay_failure_reason',
            value: reason
          },
          {
            key: '_tilopay_callback_data',
            value: JSON.stringify(payload)
          },
          {
            key: '_payment_method_title',
            value: 'TiloPay (Failed)'
          }
        ]
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`❌ Failed to update WooCommerce order ${wooOrderId} as failed:`, errorText);
      return false;
    }

    const updatedOrder = await response.json();
    console.log(`❌ WooCommerce order ${wooOrderId} marked as failed:`, updatedOrder.id);
    return true;
  } catch (error) {
    console.error(`❌ Error marking WooCommerce order ${wooOrderId} as failed:`, error);
    return false;
  }
}

// ——— Función para resolver wooOrderId por orderNumber ———
async function resolveWooOrderId(orderNumber: string): Promise<string | null> {
  try {
    console.log(`🔍 Resolving WooCommerce order ID for orderNumber: ${orderNumber}`);
    
    // Buscar órdenes que tengan el orderNumber en metadata
    const response = await fetch(`${process.env.WOOCOMMERCE_URL}/wp-json/wc/v3/orders?meta_key=_tilopay_order_number&meta_value=${orderNumber}&per_page=1`, {
      headers: {
        'Authorization': `Basic ${Buffer.from(`${process.env.WOOCOMMERCE_CONSUMER_KEY}:${process.env.WOOCOMMERCE_CONSUMER_SECRET}`).toString('base64')}`
      }
    });

    if (!response.ok) {
      console.error('❌ Failed to search WooCommerce orders');
      return null;
    }

    const orders = await response.json();
    if (orders && orders.length > 0) {
      console.log(`✅ Found WooCommerce order: ${orders[0].id}`);
      return orders[0].id.toString();
    }

    console.log(`⚠️ No WooCommerce order found for orderNumber: ${orderNumber}`);
    return null;
  } catch (error) {
    console.error('❌ Error resolving WooCommerce order ID:', error);
    return null;
  }
}

// ——— (Opcional pero recomendado) Verificación server-to-server ———
async function verifyWithTilopay(_tilopayOrderId?: string, _orderHash?: string) {
  // TODO: Hacer fetch a la API de TiloPay con Bearer token y confirmar estado real.
  // Esto requiere endpoint específico de TiloPay que no está documentado en el ejemplo
  // return { ok: true/false, raw: {...} }
  console.log('🔍 TiloPay server-to-server verification not implemented yet');
  return { ok: true, raw: null };
}

export async function GET(req: Request) {
  try {
    console.log('🔔 TiloPay callback GET received');
    const { searchParams } = new URL(req.url);

    // Parámetros típicos que TiloPay envía (pueden variar por cuenta/versión)
    const code = searchParams.get('code');                    // "200" éxito, otros = fallo/cancel
    const description = searchParams.get('description');      // texto de respuesta
    const orderNumber = searchParams.get('orderNumber');      // tu reference
    const tilopayOrderId = searchParams.get('tilopayOrderId');
    const tilopayLinkId = searchParams.get('tilopayLinkId');
    const last4 = searchParams.get('last4CreditCardNumber');
    const brand = searchParams.get('creditCardBrand');
    const orderHash = searchParams.get('orderHash');

    console.log('📝 TiloPay callback parameters:', {
      code, description, orderNumber, tilopayOrderId, tilopayLinkId, last4, brand, orderHash
    });

    if (!orderNumber) {
      console.error('❌ Missing orderNumber in callback');
      return NextResponse.redirect(new URL(`/checkout/failure?reason=${encodeURIComponent('missing_order_number')}`, req.url));
    }

    // Resolver wooOrderId por orderNumber
    const wooOrderId = await resolveWooOrderId(orderNumber);
    if (!wooOrderId) {
      console.error(`❌ Could not resolve WooCommerce order for orderNumber: ${orderNumber}`);
      return NextResponse.redirect(new URL(`/checkout/failure?order=${encodeURIComponent(orderNumber)}&reason=${encodeURIComponent('order_not_found')}`, req.url));
    }

    const payload = {
      code, description, orderNumber, tilopayOrderId, tilopayLinkId, last4, brand, orderHash, wooOrderId
    };

    // Doble chequeo recomendado
    const verification = await verifyWithTilopay(tilopayOrderId || undefined, orderHash || undefined);
    // TiloPay success codes: '1' = approved, '200' = success (depends on configuration)
    const successByCode = code === '1' || code === '200';
    const success = successByCode && verification.ok;

    console.log(`💳 Payment result: code=${code}, success=${success}, verification=${verification.ok}`);

    if (success) {
      console.log('✅ Payment successful - updating order and redirecting to success');
      await markWooOrderPaid(wooOrderId, payload);
      return NextResponse.redirect(new URL(`/checkout/success?order=${encodeURIComponent(orderNumber)}`, req.url));
    } else {
      console.log('❌ Payment failed - updating order and redirecting to failure');
      await markWooOrderFailed(wooOrderId, description || 'Pago no confirmado', payload);
      return NextResponse.redirect(new URL(`/checkout/failure?order=${encodeURIComponent(orderNumber)}&reason=${encodeURIComponent(description || 'unknown')}`, req.url));
    }
  } catch (err: any) {
    console.error('❌ TiloPay callback error:', err);
    // Fallback en caso de error inesperado
    return NextResponse.redirect(new URL(`/checkout/failure?reason=${encodeURIComponent(err?.message || 'callback_error')}`, req.url));
  }
}

export const dynamic = 'force-dynamic';