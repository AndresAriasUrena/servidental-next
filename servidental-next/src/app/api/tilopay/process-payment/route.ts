import { createPayment, validateTilopayConfig } from '@/lib/tilopay';
import { wooCommerceRequest } from '@/server/wc';
import { paymentFromOrder, readOrderCredentials } from '@/server/tilopay-order';
import { getTilopayPaymentUrl } from '@/server/tilopay-payment-url';

export async function POST(request: Request) {
  const credentials = readOrderCredentials(await request.json().catch(() => null));
  if (!credentials) {
    return Response.json({ error: 'Datos del pedido inválidos' }, { status: 400 });
  }

  try {
    const order = await wooCommerceRequest(`orders/${credentials.id}`);
    const payment = paymentFromOrder(order, credentials);
    if (!payment) {
      return Response.json({ error: 'Pedido no disponible para pago' }, { status: 404 });
    }

    validateTilopayConfig();
    const result = await createPayment(payment);
    if (!result.success || !result.data) {
      return Response.json({ error: 'No se pudo generar el enlace de pago' }, { status: 502 });
    }

    const paymentUrl = getTilopayPaymentUrl(result.data.url);
    if (!paymentUrl) {
      return Response.json({ error: 'El enlace de pago no tiene un destino autorizado' }, { status: 502 });
    }

    return Response.json({
      success: true,
      paymentUrl,
      orderNumber: payment.orderNumber,
      reference: result.data.reference,
      paymentId: result.data.id,
    });
  } catch {
    return Response.json({ error: 'No se pudo iniciar el pago' }, { status: 502 });
  }
}
