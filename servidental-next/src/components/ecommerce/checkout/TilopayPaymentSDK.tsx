'use client';

import React, { useState, useEffect, useRef } from 'react';
import { CustomerInfo, CartItem, buildSDKConfig } from '@/lib/tilopay';

interface TilopayPaymentSDKProps {
  customerInfo: CustomerInfo;
  cart: {
    items: CartItem[];
    total: number;
  };
  orderId?: string;
}

declare global {
  interface Window {
    TilopaySDK: any;
    jQuery: any;
    $: any;
  }
}

export default function TilopayPaymentSDK({ customerInfo, cart, orderId }: TilopayPaymentSDKProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sdkToken, setSdkToken] = useState<string | null>(null);
  const [orderNumber, setOrderNumber] = useState<string>('');
  const tilopayContainerRef = useRef<HTMLDivElement>(null);

  // Generate order number on component mount
  useEffect(() => {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    const newOrderNumber = `SRV-${timestamp}-${random}`;
    setOrderNumber(newOrderNumber);
  }, []);

  const getSDKToken = async () => {
    setLoading(true);
    setError(null);

    try {
      console.log('🎫 Requesting TiloPay SDK token...');
      
      const response = await fetch('/api/tilopay/sdk-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al obtener token del SDK');
      }

      const tokenData = await response.json();
      console.log('✅ SDK token received');
      setSdkToken(tokenData.token);
      
    } catch (error) {
      console.error('❌ SDK Token Error:', error);
      setError(error instanceof Error ? error.message : 'Error al obtener token de pago');
      setLoading(false);
    }
  };

  const handlePaymentSuccess = async (data: any) => {
    console.log('✅ TiloPay payment successful:', data);
    
    try {
      // Get stored form data
      const formDataStr = localStorage.getItem('checkout-form-data');
      let billingAddress = {};
      let shippingAddress = {};
      
      if (formDataStr) {
        const formData = JSON.parse(formDataStr);
        billingAddress = formData.billing;
        shippingAddress = formData.shipping;
      }
      
      // Create WooCommerce order
      const orderResponse = await fetch('/api/woocommerce/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customerInfo,
          cartItems: cart.items,
          total: cart.total,
          paymentMethod: 'TiloPay',
          tilopayOrderNumber: orderNumber,
          tilopayData: data,
          billingAddress,
          shippingAddress,
        }),
      });

      if (orderResponse.ok) {
        const orderData = await orderResponse.json();
        console.log('✅ WooCommerce order created:', orderData.order);
        
        // Clear cart and form data
        if (typeof window !== 'undefined') {
          localStorage.removeItem('cart');
          localStorage.removeItem('servidental-cart');
          localStorage.removeItem('checkout-form-data');
        }
        
        // Redirect to success page
        window.location.href = `/checkout/success?order_number=${orderNumber}&order_id=${orderData.order.id}`;
      } else {
        console.error('❌ Error creating WooCommerce order');
        window.location.href = `/checkout/success?order_number=${orderNumber}`;
      }
    } catch (error) {
      console.error('❌ Error processing order:', error);
      window.location.href = `/checkout/success?order_number=${orderNumber}`;
    }
  };

  const handlePaymentError = (data: any) => {
    console.error('❌ TiloPay payment error:', data);
    const errorMessage = data?.message || data?.error || 'Error al procesar el pago. Por favor, intenta de nuevo.';
    setError(errorMessage);
    setLoading(false);
  };

  const handlePaymentCancel = () => {
    console.log('⚠️ TiloPay payment cancelled');
    window.location.href = `/checkout/cancel`;
  };

  useEffect(() => {
    if (sdkToken && orderNumber && typeof window !== 'undefined') {
      // Wait for both jQuery and TilopaySDK to be available
      const initSDK = () => {
        if (window.jQuery && window.TilopaySDK) {
          try {
            console.log('🚀 Initializing TiloPay SDK...');
            
            const sdkConfig = buildSDKConfig(
              sdkToken,
              cart.total,
              customerInfo,
              orderNumber
            );

            console.log('📋 TiloPay SDK config:', sdkConfig);

            // Initialize TiloPay SDK
            window.TilopaySDK.init({
              ...sdkConfig,
              onSuccess: handlePaymentSuccess,
              onError: handlePaymentError,
              onCancel: handlePaymentCancel,
              container: '#tilopay-payment-container',
            });

            console.log('✅ TiloPay SDK initialized successfully');
            setLoading(false);
          } catch (error) {
            console.error('❌ Error initializing TiloPay SDK:', error);
            setError('Error al cargar el formulario de pago');
            setLoading(false);
          }
        } else {
          // SDK not ready, wait a bit more
          setTimeout(initSDK, 100);
        }
      };

      initSDK();
    }
  }, [sdkToken, orderNumber, cart.total]);

  // Check for SDK availability
  useEffect(() => {
    if (typeof window !== 'undefined') {
      let attempts = 0;
      const maxAttempts = 50;
      
      const waitForSDK = setInterval(() => {
        attempts++;
        
        if (window.jQuery && window.TilopaySDK) {
          clearInterval(waitForSDK);
          console.log('✅ TiloPay SDK loaded correctly');
        } else if (attempts >= maxAttempts) {
          clearInterval(waitForSDK);
          setError('No se pudo cargar el SDK de TiloPay. Por favor, recarga la página.');
        }
      }, 100);

      return () => clearInterval(waitForSDK);
    }
  }, []);

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

      {!sdkToken ? (
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
          <button
            onClick={getSDKToken}
            disabled={loading}
            className="w-full bg-servi_green text-white py-3 px-4 rounded-md hover:bg-servi_dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                Preparando pago...
              </>
            ) : (
              'Iniciar Pago con TiloPay'
            )}
          </button>
        </div>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold mb-4">Información de Pago</h3>
          
          {loading && (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-servi_green border-t-transparent mx-auto"></div>
              <p className="mt-4 text-gray-600">Cargando formulario de pago seguro...</p>
              <p className="text-sm text-gray-500 mt-2">Orden: {orderNumber}</p>
            </div>
          )}
          
          {/* TiloPay SDK Container */}
          <div 
            id="tilopay-payment-container" 
            ref={tilopayContainerRef}
            style={{ display: loading ? 'none' : 'block' }}
            className="min-h-[300px]"
          ></div>
        </div>
      )}

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