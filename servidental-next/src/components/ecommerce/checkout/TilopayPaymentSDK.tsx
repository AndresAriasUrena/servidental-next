'use client';

import React, { useState, useEffect } from 'react';
import { CustomerInfo, CartItem } from '@/lib/tilopay';

interface TilopayPaymentSDKProps {
  customerInfo: CustomerInfo;
  cart: {
    items: CartItem[];
    total: number;
  };
  orderId?: string;
}

export default function TilopayPaymentSDK({ customerInfo, cart }: TilopayPaymentSDKProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [orderNumber, setOrderNumber] = useState<string>('');

  // Generate order number on component mount
  useEffect(() => {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    const newOrderNumber = `SRV-${timestamp}-${random}`;
    setOrderNumber(newOrderNumber);
  }, []);

  const initializeTilopaySDK = async () => {
    setLoading(true);
    setError(null);

    try {
      console.log('🚀 Initializing TiloPay SDK...');
      
      // Wait for SDK to be fully loaded
      await waitForTilopaySDK();
      
      console.log('📱 SDK verified, getting token...');
      
      // Get SDK token from backend
      const tokenResponse = await fetch('/api/tilopay/sdk-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!tokenResponse.ok) {
        const errorText = await tokenResponse.text();
        console.error('Token request failed:', errorText);
        throw new Error('Failed to get TiloPay SDK token');
      }

      const tokenData = await tokenResponse.json();
      
      if (!tokenData.success || !tokenData.token) {
        console.error('Invalid token response:', tokenData);
        throw new Error('No valid SDK token received');
      }
      
      console.log('✅ SDK Token received successfully');

      const Tilopay = (window as any).Tilopay;
      
      console.log('🔧 Configuring TiloPay SDK with order:', orderNumber);
      
      // Configure SDK with complete settings
      const sdkConfig = {
        token: tokenData.token,
        currency: 'USD',
        language: 'es',
        amount: cart.total,
        billToEmail: customerInfo.email,
        billToFirstName: customerInfo.firstName,
        billToLastName: customerInfo.lastName,
        orderNumber: orderNumber,
        capture: 1, // Auto-capture
        redirect: `${window.location.origin}/checkout/tilopay-callback`,
        subscription: 0, // One-time payment
      };
      
      console.log('SDK Config:', {
        ...sdkConfig,
        token: '***' // Hide token in logs
      });
      
      Tilopay.init(sdkConfig);

      console.log('🚀 Opening TiloPay checkout interface...');
      Tilopay.open();
      
      // Don't set loading to false here - let the redirect handle it
      
    } catch (error) {
      console.error('❌ TiloPay SDK Error:', error);
      
      // If SDK is not available, try WooCommerce order creation
      if (error instanceof Error && error.message === 'SDK_NOT_AVAILABLE') {
        try {
          console.log('🔄 Attempting WooCommerce order creation as fallback...');
          await createWooCommerceOrder();
          // Don't set loading to false here - redirect is happening
        } catch (fallbackError) {
          console.error('❌ WooCommerce order creation also failed:', fallbackError);
          setError('No se pudo procesar el pago. Por favor intenta nuevamente o contacta soporte.');
          setLoading(false);
        }
      } else {
        setError(error instanceof Error ? error.message : 'Error al inicializar el pago');
        setLoading(false);
      }
    }
  };

  // Helper function to wait for TiloPay SDK to be available
  const waitForTilopaySDK = (): Promise<void> => {
    return new Promise((resolve, reject) => {
      let attempts = 0;
      const maxAttempts = 80; // 8 seconds with 100ms intervals
      
      const checkSDK = () => {
        if (typeof window !== 'undefined' && ((window as any).Tilopay || (window as any).TiloPay)) {
          console.log('✅ TiloPay SDK is ready');
          resolve();
        } else if (attempts < maxAttempts) {
          attempts++;
          setTimeout(checkSDK, 100);
        } else {
          console.log('⚠️ TiloPay SDK not available, falling back to redirect approach...');
          reject(new Error('SDK_NOT_AVAILABLE'));
        }
      };
      
      checkSDK();
    });
  };

  // WooCommerce payment creation - Uses existing integrated system
  const createWooCommerceOrder = async () => {
    try {
      console.log('🔄 Creating WooCommerce order with TiloPay payment...');
      
      const orderResponse = await fetch('/api/woocommerce/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customerInfo: customerInfo,
          cartItems: cart.items,
          total: cart.total,
          paymentMethod: 'TiloPay',
          tilopayOrderNumber: orderNumber,
          billingAddress: {
            first_name: customerInfo.firstName,
            last_name: customerInfo.lastName,
            email: customerInfo.email,
            phone: customerInfo.phone,
            address_1: customerInfo.address?.line1 || '',
            city: customerInfo.address?.city || '',
            state: customerInfo.address?.state || '',
            postcode: customerInfo.address?.postalCode || '',
            country: customerInfo.address?.country || 'CR'
          },
          shippingAddress: {
            first_name: customerInfo.firstName,
            last_name: customerInfo.lastName,
            address_1: customerInfo.address?.line1 || '',
            city: customerInfo.address?.city || '',
            state: customerInfo.address?.state || '',
            postcode: customerInfo.address?.postalCode || '',
            country: customerInfo.address?.country || 'CR'
          }
        }),
      });

      if (!orderResponse.ok) {
        const errorData = await orderResponse.json();
        throw new Error(errorData.error || 'Failed to create WooCommerce order');
      }

      const orderData = await orderResponse.json();
      console.log('✅ WooCommerce order created:', orderData.order.id);
      
      // For headless architecture, create direct TiloPay payment link
      const wooOrderId = orderData.order.id;
      
      console.log('🔗 Creating direct TiloPay payment for headless architecture...');
      
      // Create TiloPay payment directly via their API
      const tilopayResponse = await fetch('/api/tilopay/create-headless-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: cart.total,
          currency: 'USD',
          orderNumber: orderNumber,
          wooOrderId: wooOrderId,
          customerInfo: customerInfo,
          items: cart.items,
        }),
      });

      if (!tilopayResponse.ok) {
        throw new Error('Failed to create TiloPay payment');
      }

      const tilopayData = await tilopayResponse.json();
      
      if (tilopayData.success && tilopayData.paymentUrl) {
        console.log('✅ TiloPay payment created, redirecting to:', tilopayData.paymentUrl);
        
        // Clear cart before redirecting since order is created
        localStorage.removeItem('servidental-cart');
        
        // Redirect to TiloPay payment page
        window.location.href = tilopayData.paymentUrl;
      } else {
        throw new Error(tilopayData.error || 'No payment URL received from TiloPay');
      }
      
    } catch (error) {
      console.error('❌ WooCommerce order creation failed:', error);
      throw error;
    }
  };

  return (
    <div className="space-y-4">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          <div className="flex items-center">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {error}
          </div>
        </div>
      )}

      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold mb-4">Proceder al Pago</h3>
        <div className="flex items-center mb-4">
          <img 
            src="https://tilopay.com/assets/img/logo.png" 
            alt="TiloPay" 
            className="h-8 mr-3"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
          <div>
            <p className="text-sm text-gray-600">
              Pago seguro con tarjeta de crédito o débito
            </p>
            <p className="text-xs text-gray-500">
              Total: ${cart.total.toLocaleString()} USD
            </p>
          </div>
        </div>
        
        {loading && (
          <div className="text-center py-4 mb-4">
            <div className="animate-spin rounded-full h-8 w-8 border-3 border-servi_green border-t-transparent mx-auto"></div>
            <p className="mt-2 text-gray-600">Preparando pago seguro...</p>
            <p className="text-sm text-gray-500">Orden: {orderNumber}</p>
          </div>
        )}
        
        <button
          onClick={initializeTilopaySDK}
          disabled={loading || !orderNumber}
          className="w-full bg-servi_green text-white py-3 px-4 rounded-md hover:bg-servi_dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
              Procesando pedido...
            </>
          ) : (
            'Procesar Pedido con TiloPay'
          )}
        </button>
        
        <p className="text-xs text-gray-500 mt-3 text-center">
          Se creará tu pedido en nuestro sistema integrado con TiloPay
        </p>
      </div>

      {/* Security and payment info */}
      <div className="text-sm text-gray-500 space-y-2">
        <div className="flex items-center justify-center space-x-2">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <span>Pago seguro procesado por TiloPay</span>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center space-x-4 text-xs">
            <span>✓ Tarjetas Visa</span>
            <span>✓ Tarjetas Mastercard</span>
            <span>✓ Transferencias bancarias</span>
          </div>
        </div>
        
        {orderNumber && (
          <div className="text-center text-xs text-gray-400">
            Orden: {orderNumber}
          </div>
        )}
      </div>
    </div>
  );
}