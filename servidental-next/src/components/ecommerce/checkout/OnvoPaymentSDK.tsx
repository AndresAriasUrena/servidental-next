'use client';

import React, { useState, useEffect } from 'react';
import { CartItem, CustomerInfo } from '@/lib/onvo';

interface OnvoPaymentSDKProps {
  customerInfo: CustomerInfo;
  cart: {
    items: CartItem[];
    total: number;
  };
  orderId?: string;
}

declare global {
  interface Window {
    onvo: any;
  }
}

export default function OnvoPaymentSDK({ customerInfo, cart, orderId }: OnvoPaymentSDKProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [paymentIntentId, setPaymentIntentId] = useState<string | null>(null);

  const createPaymentIntent = async () => {
    setLoading(true);
    setError(null);

    try {
      const itemsDescription = cart.items
        .map(item => `${item.quantity}x ${item.name}`)
        .join(', ');

      const response = await fetch('/api/onvo/payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: cart.total * 100, 
          currency: 'CRC',
          description: `Pedido - ${itemsDescription}`,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al crear la intención de pago');
      }

      const paymentIntent = await response.json();
      setPaymentIntentId(paymentIntent.id);
      
    } catch (error) {
      console.error('Error:', error);
      setError(error instanceof Error ? error.message : 'Error al procesar el pago');
      setLoading(false);
    }
  };

  const handlePaymentSuccess = async (data: any) => {
    console.log('Pago exitoso:', data);
    console.log('Estructura del objeto:', JSON.stringify(data, null, 2));
    
    const paymentIntent = data.paymentIntent || data.payment_intent || data;
    const status = paymentIntent?.status || data?.status;
    const paymentId = paymentIntent?.id || data?.id || paymentIntentId;
    
    console.log('Payment Intent extraído:', { paymentIntent, status, paymentId });
    
    try {
      
      const formDataStr = localStorage.getItem('checkout-form-data');
      let billingAddress = {};
      let shippingAddress = {};
      
      if (formDataStr) {
        const formData = JSON.parse(formDataStr);
        billingAddress = formData.billing;
        shippingAddress = formData.shipping;
      }
      
      const orderResponse = await fetch('/api/woocommerce/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customerInfo,
          cartItems: cart.items,
          total: cart.total,
          paymentIntentId: paymentId,
          billingAddress,
          shippingAddress,
        }),
      });

      if (orderResponse.ok) {
        const orderData = await orderResponse.json();
        console.log('Orden creada exitosamente:', orderData.order);
        
        if (typeof window !== 'undefined') {
          localStorage.removeItem('cart');
          localStorage.removeItem('servidental-cart');
          localStorage.removeItem('checkout-form-data');
        }
        
        window.location.href = `/checkout/success?payment_intent=${paymentId}&order_id=${orderData.order.id}`;
      } else {
        console.error('Error al crear la orden en WooCommerce');
        window.location.href = `/checkout/success?payment_intent=${paymentId}`;
      }
    } catch (error) {
      console.error('Error procesando orden:', error);
      window.location.href = `/checkout/success?payment_intent=${paymentId}`;
    }
  };

  const handlePaymentError = (data: any) => {
    console.error('Error en el pago:', data);
    console.log('Estructura del error:', JSON.stringify(data, null, 2));
    
    const errorMessage = data?.message || data?.error?.message || data?.details || 'Error al procesar el pago. Por favor, intenta de nuevo.';
    
    setError(errorMessage);
    setLoading(false);
  };

  useEffect(() => {
    if (paymentIntentId && typeof window !== 'undefined' && window.onvo) {
      const publicKey = process.env.NEXT_PUBLIC_ONVO_PUBLISHABLE_KEY;
      
      if (!publicKey) {
        setError('Error de configuración: clave pública no disponible');
        return;
      }

      const renderSDK = () => {
        try {
          const container = document.getElementById('onvo-payment-container');
          if (!container) {
            console.error('Contenedor #onvo-payment-container no encontrado');
            setError('Error: Contenedor de pago no encontrado');
            setLoading(false);
            return;
          }

          console.log('Contenedor encontrado, renderizando SDK de ONVO...');

          container.innerHTML = '';

          window.onvo.pay({
            onError: handlePaymentError,
            onSuccess: handlePaymentSuccess,
            publicKey: publicKey,
            paymentIntentId: paymentIntentId,
            paymentType: "one_time"
          }).render('#onvo-payment-container');

          console.log('SDK de ONVO renderizado exitosamente');
          setLoading(false);
        } catch (error) {
          console.error('Error renderizando ONVO:', error);
          setError('Error al cargar el formulario de pago');
          setLoading(false);
        }
      };

      let attempts = 0;
      const maxAttempts = 10;
      
      const tryRender = () => {
        attempts++;
        const container = document.getElementById('onvo-payment-container');
        
        if (container) {
          renderSDK();
        } else if (attempts < maxAttempts) {
          setTimeout(tryRender, 100);
        } else {
          console.error('No se pudo encontrar el contenedor después de múltiples intentos');
          setError('Error: No se pudo cargar el formulario de pago');
          setLoading(false);
        }
      };

      tryRender();
    }
  }, [paymentIntentId]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      let attempts = 0;
      const maxAttempts = 50;
      
      const waitForSDK = setInterval(() => {
        attempts++;
        
        if (window.onvo) {
          clearInterval(waitForSDK);
          console.log('ONVO SDK cargado correctamente');
        } else if (attempts >= maxAttempts) {
          clearInterval(waitForSDK);
          setError('No se pudo cargar el SDK de ONVO. Por favor, recarga la página.');
        }
      }, 100);

      return () => clearInterval(waitForSDK);
    }
  }, []);

  useEffect(() => {
    console.log('OnvoPaymentSDK - Estados:', {
      paymentIntentId,
      loading,
      error,
      sdkLoaded: typeof window !== 'undefined' && !!window.onvo,
      containerExists: typeof window !== 'undefined' && !!document.getElementById('onvo-payment-container')
    });
  }, [paymentIntentId, loading, error]);

  return (
    <div className="space-y-4">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {!paymentIntentId ? (
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold mb-4">Proceder al Pago</h3>
          <p className="text-sm text-gray-600 mb-4">
            Haz clic en el botón para iniciar el proceso de pago seguro con ONVO.
          </p>
          <button
            onClick={createPaymentIntent}
            disabled={loading}
            className="w-full bg-servi_green text-white py-3 px-4 rounded-md hover:bg-servi_dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? 'Preparando pago...' : 'Iniciar Pago con ONVO'}
          </button>
        </div>
             ) : (
         <div className="bg-white p-6 rounded-lg shadow-sm border">
           <h3 className="text-lg font-semibold mb-4">Información de Pago</h3>
           {loading && (
             <div className="text-center py-8">
               <div className="animate-spin rounded-full h-12 w-12 border-4 border-servi_green border-t-transparent mx-auto"></div>
               <p className="mt-4 text-gray-600">Cargando formulario de pago...</p>
             </div>
           )}
           {/* El contenedor siempre debe estar presente para que el SDK lo encuentre */}
           <div id="onvo-payment-container" style={{ display: loading ? 'none' : 'block' }}></div>
         </div>
       )}

      {/* Información de seguridad */}
      <div className="text-sm text-gray-500 flex items-center justify-center space-x-2">
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
        <span>Pago seguro procesado por ONVO</span>
      </div>
    </div>
  );
} 