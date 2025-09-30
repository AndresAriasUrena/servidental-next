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
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header de éxito */}
        <div className="text-center mb-8">
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
        </div>

        {/* Información del pedido */}
        {orderNumber && (
          <div className="bg-white rounded-lg shadow-sm border p-6 mb-6 text-center">
            <p className="text-sm text-gray-500 mb-2">Número de orden</p>
            <p className="text-2xl font-bold text-servi_green mb-4">{orderNumber}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
              <div className="flex items-center justify-center space-x-2">
                <span>📧</span>
                <span>Recibirás confirmación por email</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <span>📦</span>
                <span>Te contactaremos para la entrega</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <span>❓</span>
                <span>Soporte disponible</span>
              </div>
            </div>
          </div>
        )}

        {/* Garantía y Políticas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          
          {/* Garantía */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <svg className="w-5 h-5 text-servi_green mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              GARANTÍA
            </h3>
            
            <p className="text-sm text-gray-700 mb-3">
              Cualquier reclamo por garantía deberá presentarse dentro del plazo. La garantía aplica exclusivamente para defectos de fábrica.
            </p>
            
            <div className="text-sm text-gray-600">
              <p className="font-medium text-gray-800 mb-2">No aplica la garantía en los siguientes casos:</p>
              <ul className="space-y-1 ml-4">
                <li>• Golpes, caídas, daños por transporte o mal uso</li>
                <li>• Conexión incorrecta a la red eléctrica, aire o agua</li>
                <li>• Falta de mantenimiento o mantenimiento incorrecto</li>
                <li>• Manipulación, reparación o intervención por terceros ajenos a Servi Dental</li>
                <li>• Modificaciones no autorizadas por el fabricante o nuestro equipo técnico</li>
              </ul>
            </div>
          </div>

          {/* Política de No Devoluciones */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <svg className="w-5 h-5 text-amber-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              POLÍTICA DE NO DEVOLUCIONES
            </h3>
            
            <p className="text-sm text-gray-700">
              Debido a la naturaleza especializada del equipo y a que algunos productos se solicitan directamente al fabricante bajo pedido, <strong>no se aceptan devoluciones ni se realizan reembolsos</strong> una vez entregado el equipo.
            </p>

            <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-md">
              <p className="text-xs text-amber-700">
                <strong>Importante:</strong> Por favor revisa cuidadosamente las especificaciones de tu pedido antes de confirmar la compra.
              </p>
            </div>
          </div>
        </div>

        {/* Acciones */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <a
            href="/tienda"
            className="inline-flex items-center justify-center px-8 py-3 bg-servi_green text-white rounded-md hover:bg-servi_dark transition-colors"
          >
            Seguir comprando
          </a>
          <a
            href="/"
            className="inline-flex items-center justify-center px-8 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
          >
            Volver al inicio
          </a>
          <a
            href="/contacto"
            className="inline-flex items-center justify-center px-8 py-3 border border-servi_green text-servi_green rounded-md hover:bg-servi_green hover:text-white transition-colors"
          >
            Contactar soporte
          </a>
        </div>

        {/* Información de contacto */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
            Información de contacto
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm text-gray-600">
            <div className="text-center">
              <h4 className="font-medium text-gray-900 mb-2">Contacto</h4>
              <p>info@servidentalcr.com</p>
              <p>+506 2234-5678</p>
            </div>
            <div className="text-center">
              <h4 className="font-medium text-gray-900 mb-2">Horarios</h4>
              <p>Lunes a Viernes</p>
              <p>8:00 AM - 5:00 PM</p>
            </div>
            <div className="text-center">
              <h4 className="font-medium text-gray-900 mb-2">Servicio</h4>
              <p>18 años de experiencia</p>
              <p>en equipo dental</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}