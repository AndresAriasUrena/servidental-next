/**
 * TiloPay Payment Link Integration
 * Supports Payment Link flow: login → createLinkPayment → redirect
 */

// TiloPay Configuration
export const tilopayConfig = {
  apiBase: process.env.TILOPAY_API_BASE || 'https://app.tilopay.com',
  authPath: process.env.TILOPAY_AUTH_PATH || '/api/v1/login',
  paymentPath: process.env.TILOPAY_PAYMENT_PATH || '/api/v1/createLinkPayment',
  apiUser: process.env.TILOPAY_API_USER!,
  apiPassword: process.env.TILOPAY_API_PASS!,
  apiKey: process.env.TILOPAY_API_KEY!,
  callbackUrl: process.env.TILOPAY_CALLBACK_URL || 'http://localhost:3000/api/tilopay/callback',
  amountUnit: process.env.TILOPAY_AMOUNT_UNIT || 'decimal',
};

// Types
export interface TilopayAuthResponse {
  access_token: string;
  token_type?: string;
  expires_in?: number;
}

export interface TilopayCreatePaymentRequest {
  key: string;
  amount: string;
  currency: string;
  reference: string;
  type: number;
  description: string;
  client: string;
  callback_url: string;
}

export interface TilopayCreatePaymentResponse {
  success: boolean;
  data?: {
    url: string;
    reference: string;
    id?: string;
  };
  message?: string;
  error?: string;
}

export interface CreatePaymentInput {
  amount: number;
  currency: string;
  orderNumber: string;
  customerInfo: {
    firstName: string;
    lastName: string;
    email: string;
  };
}

/**
 * Get access token from TiloPay
 * POST https://app.tilopay.com/api/v1/login
 */
export async function getAccessToken(): Promise<string> {
  const authUrl = `${tilopayConfig.apiBase}${tilopayConfig.authPath}`;
  const response = await fetch(authUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      apiuser: tilopayConfig.apiUser,
      password: tilopayConfig.apiPassword,
    }),
    signal: AbortSignal.timeout(12_000),
  });

  if (!response.ok) {
    await response.body?.cancel();
    throw new Error(`Authentication failed (${response.status})`);
  }
  const data: TilopayAuthResponse = await response.json();
  if (!data.access_token) throw new Error('No access_token in response');
  return data.access_token;
}

/**
 * Create payment link with TiloPay
 * POST https://app.tilopay.com/api/v1/createLinkPayment
 */
export async function createPayment(input: CreatePaymentInput): Promise<TilopayCreatePaymentResponse> {
  try {
    
    // Step 1: Get access token
    const accessToken = await getAccessToken();
    
    // Step 2: Format amount as decimal string
    const formattedAmount = input.amount.toFixed(2);
    
    // Step 3: Prepare payment payload
    const paymentUrl = `${tilopayConfig.apiBase}${tilopayConfig.paymentPath}`;
    const paymentPayload: TilopayCreatePaymentRequest = {
      key: tilopayConfig.apiKey,
      amount: formattedAmount,
      currency: input.currency,
      reference: input.orderNumber,
      type: 1, // Payment link type
      description: `Orden ${input.orderNumber}`,
      client: `${input.customerInfo.firstName} ${input.customerInfo.lastName}`,
      callback_url: tilopayConfig.callbackUrl,
    };

    const response = await fetch(paymentUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify(paymentPayload),
      signal: AbortSignal.timeout(12_000),
    });

    if (!response.ok) {
      await response.body?.cancel();
      return {
        success: false,
        error: `Payment creation failed (${response.status})`,
      };
    }

    // Try to parse as JSON
    let data;
    try {
      data = await response.json();
    } catch {
      return {
        success: false,
        error: 'Invalid JSON response from TiloPay',
      };
    }

    // Extract payment URL from response
    const paymentUrl_redirect = data?.url || data?.data?.url || data?.paymentUrl;
    
    if (!paymentUrl_redirect) {
      return {
        success: false,
        error: 'No payment URL returned from TiloPay',
      };
    }

    return {
      success: true,
      data: {
        url: paymentUrl_redirect,
        reference: input.orderNumber,
        id: data?.id || data?.data?.id,
      },
    };

  } catch {
    return {
      success: false,
      error: 'No se pudo solicitar el enlace de pago',
    };
  }
}

/**
 * Validate TiloPay configuration
 */
export function validateTilopayConfig(): void {
  const required = [
    'TILOPAY_API_USER',
    'TILOPAY_API_PASS', 
    'TILOPAY_API_KEY',
  ];

  const missing = required.filter(key => !process.env[key]);
  
  if (missing.length > 0) {
    throw new Error(`Missing TiloPay environment variables: ${missing.join(', ')}`);
  }

}

/**
 * Generate unique order number
 */
export function generateOrderNumber(prefix: string = 'SRV'): string {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `${prefix}-${timestamp}-${random}`;
}

/**
 * Parse TiloPay callback parameters
 */
export interface TilopayCallbackParams {
  code?: string;
  description?: string;
  reference?: string;
  orderNumber?: string;
  amount?: string;
  currency?: string;
  status?: string;
  transactionId?: string;
}

export function parseTilopayCallback(query: Record<string, string | string[]>): TilopayCallbackParams {
  // Convert query parameters to strings
  const params: Record<string, string> = {};
  for (const [key, value] of Object.entries(query)) {
    params[key] = Array.isArray(value) ? value[0] : value;
  }

  return {
    code: params.code,
    description: params.description,
    reference: params.reference,
    orderNumber: params.orderNumber || params.reference,
    amount: params.amount,
    currency: params.currency,
    status: params.status,
    transactionId: params.transactionId || params.transaction_id,
  };
}

/**
 * Determine if payment was successful based on callback
 */
export function isPaymentSuccessful(params: TilopayCallbackParams): boolean {
  // TiloPay success codes - adjust based on documentation
  const successCodes = ['00', '0', 'success', 'approved', 'completed'];
  const successStatuses = ['success', 'approved', 'completed', 'paid'];
  
  if (params.code && successCodes.includes(params.code.toLowerCase())) {
    return true;
  }
  
  if (params.status && successStatuses.includes(params.status.toLowerCase())) {
    return true;
  }
  
  return false;
}