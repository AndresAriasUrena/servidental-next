'use client';

import { Suspense, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';

function TilopayPaymentContent() {
  const searchParams = useSearchParams();
  const formRef = useRef<HTMLFormElement>(null);
  const [origin, setOrigin] = useState('');
  
  // Extract payment parameters from URL
  const amount = searchParams.get('amount');
  const currency = searchParams.get('currency');
  const orderNumber = searchParams.get('orderNumber');
  const wooOrderId = searchParams.get('wooOrderId');
  const firstName = searchParams.get('firstName');
  const lastName = searchParams.get('lastName');
  const email = searchParams.get('email');
  const phone = searchParams.get('phone');
  const address = searchParams.get('address');
  const city = searchParams.get('city');
  const state = searchParams.get('state');
  const postalCode = searchParams.get('postalCode');
  const country = searchParams.get('country');

  useEffect(() => {
    // Set origin for callback URLs
    setOrigin(window.location.origin);
    
    // Auto-submit form after component mounts
    const timer = setTimeout(() => {
      if (formRef.current) {
        console.log('🚀 Auto-submitting TiloPay payment form...');
        formRef.current.submit();
      }
    }, 2000); // 2 second delay to show loading message

    return () => clearTimeout(timer);
  }, []);

  if (!amount || !orderNumber) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
        <p>Información de pago incompleta. Por favor regresa al checkout.</p>
        <a href="/checkout" className="mt-4 inline-block bg-servi_green text-white px-6 py-2 rounded-md">
          Volver al Checkout
        </a>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-blue-600 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Procesando Pago
        </h1>
        <p className="text-gray-600 mb-2">
          Redirigiendo a TiloPay para completar tu pago...
        </p>
        <p className="text-sm text-gray-500 mb-6">
          Orden: {orderNumber} | Total: ${amount} {currency}
        </p>
        
        <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 mb-8">
          <div className="flex items-center">
            <svg className="w-5 h-5 text-yellow-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <span className="text-yellow-800">
              No cierres esta ventana. Serás redirigido automáticamente.
            </span>
          </div>
        </div>
      </div>

      {/* Hidden form that will auto-submit to TiloPay */}
      <form 
        ref={formRef}
        action="https://app.tilopay.com/payment" 
        method="POST"
        className="hidden"
      >
        {/* Authentication */}
        <input type="hidden" name="apiuser" value={process.env.NEXT_PUBLIC_TILOPAY_API_USER || 'WvnVdQ'} />
        <input type="hidden" name="password" value={process.env.NEXT_PUBLIC_TILOPAY_API_PASS || 'ltE71v'} />
        <input type="hidden" name="key" value={process.env.NEXT_PUBLIC_TILOPAY_API_KEY || '3218-4132-3230-9964-1128'} />
        
        {/* Payment Details */}
        <input type="hidden" name="amount" value={amount} />
        <input type="hidden" name="currency" value={currency || 'USD'} />
        <input type="hidden" name="orderNumber" value={orderNumber} />
        <input type="hidden" name="description" value={`Pedido ${orderNumber} - ServidentalCR`} />
        
        {/* Customer Information */}
        <input type="hidden" name="billToFirstName" value={firstName || ''} />
        <input type="hidden" name="billToLastName" value={lastName || ''} />
        <input type="hidden" name="billToEmail" value={email || ''} />
        <input type="hidden" name="billToPhone" value={phone || ''} />
        <input type="hidden" name="billToAddress" value={address || ''} />
        <input type="hidden" name="billToCity" value={city || ''} />
        <input type="hidden" name="billToState" value={state || ''} />
        <input type="hidden" name="billToPostalCode" value={postalCode || ''} />
        <input type="hidden" name="billToCountry" value={country || 'CR'} />
        
        {/* Callback URLs */}
        <input type="hidden" name="successUrl" value={`${origin}/checkout/tilopay-callback?status=success&orderNumber=${orderNumber}&wooOrderId=${wooOrderId}`} />
        <input type="hidden" name="cancelUrl" value={`${origin}/checkout/tilopay-callback?status=cancel&orderNumber=${orderNumber}&wooOrderId=${wooOrderId}`} />
        <input type="hidden" name="notificationUrl" value={`${origin}/checkout/tilopay-callback?status=notification&orderNumber=${orderNumber}&wooOrderId=${wooOrderId}`} />
        
        {/* Additional Parameters */}
        <input type="hidden" name="capture" value="1" />
        <input type="hidden" name="subscription" value="0" />
        <input type="hidden" name="language" value="es" />
      </form>

      {/* Manual submit button as backup */}
      <div className="text-center">
        <button
          onClick={() => formRef.current?.submit()}
          className="bg-servi_green text-white px-8 py-3 rounded-md hover:bg-servi_dark transition-colors"
        >
          Continuar al Pago
        </button>
        
        <p className="text-xs text-gray-500 mt-4">
          Si no eres redirigido automáticamente, haz clic en el botón de arriba
        </p>
      </div>
    </div>
  );
}

export default function TilopayPaymentPage() {
  return (
    <Suspense fallback={
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-blue-600 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Cargando pago...
        </h1>
        <p className="text-gray-600">
          Preparando información de pago...
        </p>
      </div>
    }>
      <TilopayPaymentContent />
    </Suspense>
  );
}