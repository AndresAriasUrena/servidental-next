'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function CheckoutSuccess() {
  const searchParams = useSearchParams();
  const [orderNumber, setOrderNumber] = useState<string | null>(null);

  useEffect(() => {
    // Support both 'order' and 'orderNumber' parameters for compatibility
    const order = searchParams.get('order') || searchParams.get('orderNumber');
    setOrderNumber(order);
    
    // Clear cart from localStorage on successful payment
    localStorage.removeItem('servidental-cart');
  }, [searchParams]);

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      
      <h1 className="text-4xl font-bold text-gray-900 mb-4">
        ¡Gracias por tu compra!
      </h1>
      
      <p className="text-xl text-gray-600 mb-2">
        Tu pedido ha sido procesado exitosamente
      </p>
      
      {orderNumber && (
        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <p className="text-sm text-gray-500 mb-1">Número de orden</p>
          <p className="text-2xl font-bold text-servi_green">{orderNumber}</p>
        </div>
      )}
      
      <div className="space-y-4 text-gray-600 mb-8">
        <p>
          📧 Recibirás un correo de confirmación con los detalles de tu pedido
        </p>
        <p>
          📦 Nos pondremos en contacto contigo para coordinar la entrega
        </p>
        <p>
          ❓ Si tienes preguntas, no dudes en contactarnos
        </p>
      </div>
      
      <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
        <a
          href="/tienda"
          className="w-full sm:w-auto bg-servi_green text-white px-8 py-3 rounded-md hover:bg-servi_dark transition-colors inline-block"
        >
          Seguir comprando
        </a>
        <a
          href="/"
          className="w-full sm:w-auto border border-gray-300 text-gray-700 px-8 py-3 rounded-md hover:bg-gray-50 transition-colors inline-block"
        >
          Volver al inicio
        </a>
      </div>
      
      <div className="mt-12 pt-8 border-t border-gray-200">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm text-gray-600">
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Contacto</h4>
            <p>info@servidentalcr.com</p>
            <p>+506 2222-3333</p>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Horarios</h4>
            <p>Lunes a Viernes</p>
            <p>8:00 AM - 5:00 PM</p>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Servicio</h4>
            <p>18 años de experiencia</p>
            <p>en equipo dental</p>
          </div>
        </div>
      </div>
    </div>
  );
}