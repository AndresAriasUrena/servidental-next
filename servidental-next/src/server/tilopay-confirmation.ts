import { getAccessToken, tilopayConfig, validateTilopayConfig } from '../lib/tilopay';

type ExpectedPayment = {
  orderNumber: string;
  total: string;
  currency: 'CRC' | 'USD';
};

type ConsultResponse = {
  type?: unknown;
  response?: unknown;
};

function decimalCents(value: unknown): number | null {
  if (typeof value !== 'string' || !/^\d{1,10}(?:\.\d{1,2})?$/.test(value)) return null;

  const [units, fraction = ''] = value.split('.');
  return Number(units) * 100 + Number(fraction.padEnd(2, '0'));
}

export async function confirmTilopayPayment(
  expected: ExpectedPayment,
): Promise<{ transactionId: string } | null> {
  const merchantId = process.env.TILOPAY_MERCHANT_ID?.trim();
  const environment = process.env.TILOPAY_TRANSACTION_ENVIRONMENT?.trim();
  if (!merchantId || !environment) throw new Error('Falta configurar la consulta de TiloPay');

  const total = decimalCents(expected.total);
  if (total === null || total <= 0 || !/^[a-zA-Z0-9_-]{1,100}$/.test(expected.orderNumber)) {
    return null;
  }

  validateTilopayConfig();
  const token = await getAccessToken();
  const endpoint = new URL('/api/v1/consult', tilopayConfig.apiBase);
  const reply = await fetch(endpoint, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({ key: tilopayConfig.apiKey, orderNumber: expected.orderNumber, merchantId }),
    redirect: 'error',
    signal: AbortSignal.timeout(12_000),
  });

  if (!reply.ok) {
    await reply.body?.cancel();
    throw new Error('No se pudo consultar la transacción en TiloPay');
  }

  const result = await reply.json() as ConsultResponse | null;
  if (!result || result.type !== '200' || !Array.isArray(result.response)) {
    throw new Error('TiloPay devolvió una respuesta de consulta inválida');
  }
  if (result.response.length !== 1) return null;

  const transaction = result.response[0];
  if (!transaction || transaction.code !== '1' || transaction.type !== 'Payment' ||
      transaction.capture !== 'Capture' || transaction.orderNumber !== expected.orderNumber ||
      transaction.merchantId !== merchantId || transaction.environment !== environment ||
      transaction.currency !== expected.currency || decimalCents(transaction.amount) !== total ||
      !Number.isSafeInteger(transaction.id_tilopay) || transaction.id_tilopay < 1) {
    return null;
  }

  return { transactionId: String(transaction.id_tilopay) };
}
