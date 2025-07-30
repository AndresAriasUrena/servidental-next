'use client';

import { useRouter } from 'next/navigation';

export default function CheckoutCancelPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
        <div className="bg-yellow-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Pago Cancelado</h1>
        <p className="text-gray-600 mb-6">
          Has cancelado el proceso de pago. Tu carrito sigue disponible.
        </p>
        <button
          onClick={() => router.push('/checkout')}
          className="w-full bg-servi_green text-white py-2 rounded-lg hover:bg-servi_dark"
        >
          Volver al Checkout
        </button>
      </div>
    </div>
  );
} 