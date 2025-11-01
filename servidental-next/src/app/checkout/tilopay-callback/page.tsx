'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

function TilopayCallbackContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [paymentStatus, setPaymentStatus] = useState<'success' | 'cancel' | 'error' | null>(null);
  const [orderNumber, setOrderNumber] = useState<string | null>(null);
  const [wooOrderId, setWooOrderId] = useState<string | null>(null);

  useEffect(() => {
    const status = searchParams.get('status');
    const order = searchParams.get('orderNumber');
    const wooId = searchParams.get('wooOrderId');
    const transactionId = searchParams.get('transactionId');
    
    setOrderNumber(order);
    setWooOrderId(wooId);
    
    if (status === 'success') {
      setPaymentStatus('success');
      console.log('✅ Payment successful:', { orderNumber: order, wooOrderId: wooId, transactionId });
      
      // Update WooCommerce order to mark as paid
      if (wooId) {
        updateWooCommerceOrder(wooId, order, transactionId);
      }
    } else if (status === 'cancel') {
      setPaymentStatus('cancel');
      console.log('❌ Payment cancelled:', { orderNumber: order, wooOrderId: wooId });
    } else {
      setPaymentStatus('error');
      console.log('❌ Payment error:', { status, orderNumber: order, wooOrderId: wooId });
    }
    
    setLoading(false);
  }, [searchParams]);

  const updateWooCommerceOrder = async (wooOrderId: string, orderNumber: string | null, transactionId: string | null) => {
    try {
      console.log('🔄 Updating WooCommerce order as paid...');
      
      const response = await fetch('/api/woocommerce/orders/update-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          wooOrderId,
          orderNumber,
          transactionId,
          paymentStatus: 'completed',
          paymentMethod: 'TiloPay',
        }),
      });

      if (response.ok) {
        console.log('✅ WooCommerce order updated successfully');
      } else {
        console.error('❌ Failed to update WooCommerce order');
      }
    } catch (error) {
      console.error('❌ Error updating WooCommerce order:', error);
    }
  };

  const handleContinue = () => {
    if (paymentStatus === 'success') {
      // Clear cart and redirect to success page
      localStorage.removeItem('servidental-cart');
      router.push('/checkout/success?orderNumber=' + orderNumber);
    } else {
      // Return to cart
      router.push('/carrito');
    }
  };

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-3 border-servi_green border-t-transparent mx-auto mb-4"></div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Procesando pago...
        </h1>
        <p className="text-gray-600">
          Verificando el estado de tu transacción
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
      {paymentStatus === 'success' && (
        <>
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            ¡Pago exitoso!
          </h1>
          <p className="text-gray-600 mb-2">
            Tu pago ha sido procesado correctamente
          </p>
          {orderNumber && (
            <p className="text-sm text-gray-500 mb-6">
              Número de orden: {orderNumber}
            </p>
          )}
          <button
            onClick={handleContinue}
            className="bg-servi_green text-white px-8 py-3 rounded-md hover:bg-servi_dark transition-colors"
          >
            Continuar
          </button>
        </>
      )}

      {paymentStatus === 'cancel' && (
        <>
          <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Pago cancelado
          </h1>
          <p className="text-gray-600 mb-6">
            Has cancelado el proceso de pago
          </p>
          <button
            onClick={handleContinue}
            className="bg-servi_green text-white px-8 py-3 rounded-md hover:bg-servi_dark transition-colors"
          >
            Volver al carrito
          </button>
        </>
      )}

      {paymentStatus === 'error' && (
        <>
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Error en el pago
          </h1>
          <p className="text-gray-600 mb-6">
            Ocurrió un error al procesar tu pago. Por favor intenta nuevamente.
          </p>
          <button
            onClick={handleContinue}
            className="bg-servi_green text-white px-8 py-3 rounded-md hover:bg-servi_dark transition-colors"
          >
            Intentar nuevamente
          </button>
        </>
      )}
    </div>
  );
}

export default function TilopayCallback() {
  return (
    <Suspense fallback={
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-3 border-servi_green border-t-transparent mx-auto mb-4"></div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Procesando pago...
        </h1>
        <p className="text-gray-600">
          Cargando información del pago...
        </p>
      </div>
    }>
      <TilopayCallbackContent />
    </Suspense>
  );
}