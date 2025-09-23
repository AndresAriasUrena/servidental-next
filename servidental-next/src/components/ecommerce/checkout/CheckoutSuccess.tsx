'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

interface PaymentData {
  orderId?: string;
  id?: string;
  amount?: number;
  currency?: string;
  status?: string;
}

export default function CheckoutSuccess() {
  const searchParams = useSearchParams();
  const [paymentData, setPaymentData] = useState<PaymentData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPaymentData = async () => {
      const orderNumber = searchParams.get('order_number');
      const orderId = searchParams.get('order_id');

      console.log('Parámetros de URL:', { orderNumber, orderId });

      // For TiloPay, we use order_number from our system
      if (orderNumber || orderId) {
        setPaymentData({
          orderId: orderId || orderNumber || undefined,
          id: orderNumber || `order_${orderId}`,
          amount: 0, // We don't fetch amount from URL for security
          currency: 'USD',
          status: 'succeeded'
        });
      }

      setLoading(false);
    };

    fetchPaymentData();

    if (typeof window !== 'undefined') {
      localStorage.removeItem('cart');
      localStorage.removeItem('servidental-cart');
      localStorage.removeItem('checkout-form-data');
    }
  }, [searchParams]);

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <div className="animate-pulse">
          <div className="h-16 w-16 bg-gray-200 rounded-full mx-auto mb-4"></div>
          <div className="h-8 bg-gray-200 rounded w-3/4 mx-auto mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <div className="text-center">
        <div className="flex justify-center mb-6">
          <div className="bg-green-100 rounded-full p-3">
            <CheckCircleIcon className="h-12 w-12 text-green-600" />
          </div>
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          ¡Pago exitoso!
        </h1>
        
        <p className="text-lg text-gray-600 mb-8">
          Tu pago ha sido procesado correctamente. Te enviaremos un correo con los detalles de tu pedido.
        </p>

        {paymentData && (
          <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left">
            <h2 className="font-semibold text-gray-900 mb-4">Detalles del pedido</h2>
            <dl className="space-y-2">
              {paymentData.orderId && (
                <div className="flex justify-between">
                  <dt className="text-gray-600">Número de orden:</dt>
                  <dd className="font-medium text-servi_green">#{paymentData.orderId}</dd>
                </div>
              )}
              <div className="flex justify-between">
                <dt className="text-gray-600">ID de transacción:</dt>
                <dd className="font-medium text-gray-900">{paymentData.id}</dd>
              </div>
              {paymentData.amount && paymentData.amount > 0 && (
                <div className="flex justify-between">
                  <dt className="text-gray-600">Monto:</dt>
                  <dd className="font-medium text-gray-900">
                    ₡{(paymentData.amount / 100).toLocaleString()} {paymentData.currency}
                  </dd>
                </div>
              )}
              <div className="flex justify-between">
                <dt className="text-gray-600">Estado del pago:</dt>
                <dd className="font-medium text-green-600">
                  {paymentData.status === 'succeeded' ? 'Completado' : paymentData.status}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-600">Método de pago:</dt>
                <dd className="font-medium text-gray-900">TiloPay</dd>
              </div>
            </dl>
            
            {paymentData.orderId && (
              <div className="mt-4 p-3 bg-green-50 rounded-lg">
                <p className="text-sm text-green-700">
                  ✅ Tu orden ha sido creada exitosamente en nuestro sistema y aparecerá en el panel de administración de WooCommerce.
                </p>
              </div>
            )}
          </div>
        )}

        <div className="space-y-4">
          <Link
            href="/tienda"
            className="block w-full bg-servi_green text-white py-3 px-6 rounded-md hover:bg-servi_dark transition-colors"
          >
            Continuar comprando
          </Link>
          
          <Link
            href="/"
            className="block w-full border border-gray-300 text-gray-700 py-3 px-6 rounded-md hover:bg-gray-50 transition-colors"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
} 