import { timingSafeEqual } from 'node:crypto';

type OrderCredentials = { id: number; key: string };

type WooOrder = {
  id?: number;
  order_key?: string;
  payment_method?: string;
  status?: string;
  date_paid?: string | null;
  total?: string;
  currency?: string;
  meta_data?: { key: string; value: unknown }[];
  billing?: { first_name?: string; last_name?: string; email?: string };
};

export function readOrderCredentials(body: unknown): OrderCredentials | null {
  if (typeof body !== 'object' || body === null) return null;

  const { wooOrderId, orderKey } = body as Record<string, unknown>;
  if (typeof wooOrderId !== 'number' || !Number.isSafeInteger(wooOrderId) || wooOrderId < 1 ||
      typeof orderKey !== 'string' || !/^wc_order_[a-zA-Z0-9]{1,64}$/.test(orderKey)) {
    return null;
  }

  return { id: wooOrderId, key: orderKey };
}

export function paymentFromOrder(order: WooOrder | null, credentials: OrderCredentials) {
  if (!order || order.id !== credentials.id || typeof order.order_key !== 'string') return null;

  const localKey = Buffer.from(credentials.key);
  const storedKey = Buffer.from(order.order_key);
  if (localKey.length !== storedKey.length || !timingSafeEqual(localKey, storedKey) ||
      order.payment_method !== 'tilopay' || order.status !== 'pending' || order.date_paid !== null) {
    return null;
  }

  const reference = order.meta_data?.find(({ key }) => key === '_tilopay_order_number')?.value;
  const billing = order.billing;
  if (typeof order.total !== 'string' || !/^\d{1,10}(?:\.\d{1,2})?$/.test(order.total) ||
      Number(order.total) <= 0 || typeof order.currency !== 'string' ||
      !['USD', 'CRC'].includes(order.currency) || typeof reference !== 'string' ||
      !/^[a-zA-Z0-9_-]{1,100}$/.test(reference) || !billing?.email) {
    return null;
  }

  return {
    amount: Number(order.total),
    currency: order.currency,
    orderNumber: reference,
    customerInfo: {
      firstName: billing.first_name ?? '',
      lastName: billing.last_name ?? '',
      email: billing.email,
    },
  };
}
