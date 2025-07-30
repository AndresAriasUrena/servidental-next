import axios from 'axios';

export const onvoConfig = {
  baseURL: 'https://api.onvopay.com/v1',
  publishableKey: process.env.NEXT_PUBLIC_ONVO_PUBLISHABLE_KEY!,
  secretKey: process.env.ONVO_SECRET_KEY!,
};

export const onvoApi = axios.create({
  baseURL: onvoConfig.baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface OnvoPaymentIntentRequest {
  amount: number;
  currency: string;
  description?: string;
  captureMethod?: 'automatic' | 'manual';
  customerId?: string;
  metadata?: Record<string, any>;
  onBehalfOf?: string;
  officeId?: string;   
}

export interface OnvoPaymentIntentResponse {
  id: string;
  amount: number;
  baseAmount: number;
  exchangeRate: number;
  currency: string;
  status: 'requires_confirmation' | 'requires_payment_method' | 'requires_action' | 'succeeded' | 'refunded' | 'canceled';
  description: string;
  createdAt: string;
  updatedAt: string;
  metadata: Record<string, any>;
  nextAction?: {
    type: 'redirect_to_url';
    redirectToUrl: {
      url: string;
      returnUrl: string;
    };
  };
}

export interface OnvoCheckoutSession {
  id: string;
  url: string;
  status: string;
  createdAt: string;
}

export async function createPaymentIntent(data: OnvoPaymentIntentRequest): Promise<OnvoPaymentIntentResponse> {
  const response = await onvoApi.post('/payment-intents', data, {
    headers: {
      Authorization: `Bearer ${onvoConfig.secretKey}`,
    },
  });

  return response.data;
}

export async function getPaymentIntent(paymentIntentId: string): Promise<OnvoPaymentIntentResponse> {
  const response = await onvoApi.get(`/payment-intents/${paymentIntentId}`, {
    headers: {
      Authorization: `Bearer ${onvoConfig.secretKey}`,
    },
  });

  return response.data;
}

export async function createCheckoutSession(data: {
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  redirectUrl: string;
  cancelUrl: string;
  lineItems: Array<{ quantity: number }>;
  metadata?: Record<string, any>;
}): Promise<OnvoCheckoutSession> {
  const response = await onvoApi.post('/checkout/sessions/one-time-link', data, {
    headers: {
      Authorization: `Bearer ${onvoConfig.secretKey}`,
    },
  });

  return response.data;
}

export async function confirmPaymentIntent(
  paymentIntentId: string,
  data: {
    paymentMethodId?: string;
    returnUrl?: string;
  }
): Promise<OnvoPaymentIntentResponse> {
  const response = await onvoApi.post(
    `/payment-intents/${paymentIntentId}/confirm`,
    data,
    {
      headers: {
        Authorization: `Bearer ${onvoConfig.publishableKey}`,
      },
    }
  );

  return response.data;
}

export async function createRefund(data: {
  paymentIntentId: string;
  amount?: number;
  reason?: string;
}) {
  const response = await onvoApi.post('/refunds', data, {
    headers: {
      Authorization: `Bearer ${onvoConfig.secretKey}`,
    },
  });

  return response.data;
}

export interface CartItem {
  id: number | string;
  name: string;
  price: number;
  quantity: number;
  sku?: string;
}

export interface CustomerInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: {
    line1: string;
    line2?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
} 