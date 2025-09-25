import axios from 'axios';

export const tilopayConfig = {
  environment: process.env.TILOPAY_ENV || 'PROD',
  loginUrl: process.env.TILOPAY_LOGIN_URL || 'https://app.tilopay.com/api/v1/login',
  sdkTokenUrl: process.env.TILOPAY_GET_TOKEN_SDK_URL || 'https://app.tilopay.com/api/v1/loginSdk',
  paymentUrl: process.env.TILOPAY_PAYMENT_URL || 'https://app.tilopay.com/api/v1/payments',
  apiKey: process.env.TILOPAY_API_KEY!,
  apiUser: process.env.TILOPAY_API_USER!,
  apiPassword: process.env.TILOPAY_API_PASS!,
  redirectUrl: process.env.NEXT_PUBLIC_TILOPAY_REDIRECT!,
  language: process.env.NEXT_PUBLIC_TILOPAY_LANGUAGE || 'es',
  currency: process.env.NEXT_PUBLIC_TILOPAY_CURRENCY || 'USD',
  productionTest: process.env.TILOPAY_PRODUCTION_TEST === 'true',
};

export const tilopayApi = axios.create({
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// TiloPay API Types
export interface TilopayLoginRequest {
  apiuser: string;
  password: string;
}

export interface TilopaySDKTokenRequest {
  apiuser: string;
  password: string;
  key: string;
}

export interface TilopayAuthResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

export interface TilopaySDKTokenResponse {
  token: string;
  expires_in?: number;
}

export interface TilopaySDKInitConfig {
  token: string;
  currency: string;
  language: string;
  amount: number;
  billToEmail: string;
  billToFirstName: string;
  billToLastName: string;
  orderNumber: string;
  capture: number;
  redirect: string;
  subscription: number;
}

export interface TilopayWebhookPayload {
  orderNumber: string;
  transactionId: string;
  status: 'approved' | 'pending' | 'rejected' | 'failed';
  amount: number;
  currency: string;
  paymentMethod: string;
  timestamp: string;
  reference?: string;
}

// Customer Info (compatible with existing structure)
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

export interface CartItem {
  id: number | string;
  name: string;
  price: number;
  quantity: number;
  sku?: string;
}

// Core API Functions
export async function getTilopayBearerToken(): Promise<string> {
  try {
    console.log('🔑 Authenticating with TiloPay...');
    
    // Try multiple authentication formats that TiloPay might accept
    const authAttempts = [
      // Format 1: api_key, api_user, api_password
      {
        api_key: tilopayConfig.apiKey,
        api_user: tilopayConfig.apiUser,
        api_password: tilopayConfig.apiPassword,
      },
      // Format 2: key, user, password
      {
        key: tilopayConfig.apiKey,
        user: tilopayConfig.apiUser,
        password: tilopayConfig.apiPassword,
      },
      // Format 3: apikey, apiuser, apipassword
      {
        apikey: tilopayConfig.apiKey,
        apiuser: tilopayConfig.apiUser,
        apipassword: tilopayConfig.apiPassword,
      },
      // Format 4: Just username and password (original format)
      {
        apiuser: tilopayConfig.apiUser,
        password: tilopayConfig.apiPassword,
      }
    ];

    let lastError: any = null;
    
    for (let i = 0; i < authAttempts.length; i++) {
      try {
        console.log(`🔄 Trying auth format ${i + 1}...`);
        
        const response = await tilopayApi.post(tilopayConfig.loginUrl, authAttempts[i]);

        if (response.data) {
          // TiloPay puede devolver "token", "access_token" o "accessToken"
          const token = response.data.token || response.data.access_token || response.data.accessToken;
          
          if (token) {
            console.log(`✅ TiloPay authentication successful with format ${i + 1}`);
            return token;
          }
        }
      } catch (error) {
        lastError = error;
        console.log(`❌ Auth format ${i + 1} failed, trying next...`);
      }
    }
    
    throw lastError;
  } catch (error) {
    console.error('❌ TiloPay Auth Error:', error);
    
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      const data = error.response?.data;
      console.error('TiloPay login response:', data);
      throw new Error(`TiloPay Auth failed (${status}): ${error.message}`);
    }
    
    throw new Error('Failed to authenticate with TiloPay');
  }
}

export async function getTilopaySDKToken(): Promise<string> {
  try {
    console.log('🎫 Getting TiloPay SDK token...');
    
    // Try multiple formats for SDK token (same approach as auth)
    const sdkAttempts = [
      // Format 1: api_key, api_user, api_password
      {
        api_key: tilopayConfig.apiKey,
        api_user: tilopayConfig.apiUser,
        api_password: tilopayConfig.apiPassword,
      },
      // Format 2: key, user, password
      {
        key: tilopayConfig.apiKey,
        user: tilopayConfig.apiUser,
        password: tilopayConfig.apiPassword,
      },
      // Format 3: apikey, apiuser, apipassword
      {
        apikey: tilopayConfig.apiKey,
        apiuser: tilopayConfig.apiUser,
        apipassword: tilopayConfig.apiPassword,
      },
      // Format 4: Just username and password (this worked for auth)
      {
        apiuser: tilopayConfig.apiUser,
        password: tilopayConfig.apiPassword,
      }
    ];

    let lastError: any = null;
    
    for (let i = 0; i < sdkAttempts.length; i++) {
      try {
        console.log(`🔄 Trying SDK token format ${i + 1}...`);
        
        const response = await tilopayApi.post(tilopayConfig.sdkTokenUrl, sdkAttempts[i]);

        if (response.data) {
          // TiloPay puede devolver "token", "sdk_token" o "access_token"
          const token = response.data.token || response.data.sdk_token || response.data.access_token;
          
          if (token) {
            console.log(`✅ TiloPay SDK token obtained with format ${i + 1}`);
            return token;
          }
        }
      } catch (error) {
        lastError = error;
        console.log(`❌ SDK format ${i + 1} failed, trying next...`);
      }
    }
    
    throw lastError;
  } catch (error) {
    console.error('❌ TiloPay SDK Token Error:', error);
    
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      const data = error.response?.data;
      console.error('TiloPay loginSdk response:', data);
      throw new Error(`TiloPay SDK Token failed (${status}): ${error.message}`);
    }
    
    throw new Error('Failed to get SDK token from TiloPay');
  }
}

// Server-to-Server Verification Function
export async function verifyTilopayTransaction(
  bearerToken: string,
  orderNumber: string
): Promise<any> {
  try {
    console.log(`🔍 Verifying transaction for order: ${orderNumber}`);
    
    // Note: Replace with actual verification endpoint when available
    // This is a placeholder for S2S verification
    const response = await tilopayApi.get(
      `/orders/${orderNumber}`, // Adjust endpoint as per TiloPay docs
      {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('❌ TiloPay verification error:', error);
    throw error;
  }
}

// Helper Functions
export function mapTilopayStatusToWooCommerce(status: string): string {
  const statusMap: Record<string, string> = {
    approved: 'processing', // Payment successful
    pending: 'on-hold',     // Awaiting confirmation (3DS, bank transfer)
    rejected: 'failed',     // Payment rejected
    failed: 'failed',       // Payment failed
  };

  return statusMap[status.toLowerCase()] || 'pending';
}

export function formatAmountForTilopay(amount: number): number {
  // TiloPay expects amount as number with 2 decimals
  return Math.round(amount * 100) / 100;
}

export function generateOrderNumber(prefix: string = 'SRV'): string {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `${prefix}-${timestamp}-${random}`;
}

export function validateTilopayConfig(): void {
  const required = [
    'TILOPAY_API_KEY',
    'TILOPAY_API_USER', 
    'TILOPAY_API_PASS',
    'NEXT_PUBLIC_TILOPAY_REDIRECT'
  ];

  const missing = required.filter(key => !process.env[key]);
  
  if (missing.length > 0) {
    throw new Error(`Missing TiloPay environment variables: ${missing.join(', ')}`);
  }
}

// SDK Configuration Builder
export function buildSDKConfig(
  token: string,
  amount: number,
  customer: CustomerInfo,
  orderNumber: string
): TilopaySDKInitConfig {
  return {
    token,
    currency: tilopayConfig.currency,
    language: tilopayConfig.language,
    amount: formatAmountForTilopay(amount),
    billToEmail: customer.email,
    billToFirstName: customer.firstName,
    billToLastName: customer.lastName,
    orderNumber,
    capture: 1, // Auto-capture
    redirect: tilopayConfig.redirectUrl,
    subscription: 0, // One-time payment
  };
}