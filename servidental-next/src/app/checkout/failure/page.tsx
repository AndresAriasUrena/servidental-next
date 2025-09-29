'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { XCircleIcon, ArrowLeftIcon, PhoneIcon, EnvelopeIcon } from '@heroicons/react/24/outline';

export default function CheckoutFailurePage() {
  const searchParams = useSearchParams();
  const [orderNumber, setOrderNumber] = useState<string | null>(null);
  const [reason, setReason] = useState<string | null>(null);

  useEffect(() => {
    // Support both 'order' and 'orderNumber' parameters for compatibility
    const order = searchParams.get('order') || searchParams.get('orderNumber');
    const failureReason = searchParams.get('reason');
    
    setOrderNumber(order);
    setReason(failureReason);
  }, [searchParams]);

  const getReasonMessage = (reason: string | null) => {
    if (!reason) return 'El pago no pudo ser procesado';
    
    switch (reason.toLowerCase()) {
      case 'transaction is approved':
        return 'Hubo un error en el procesamiento, aunque el pago fue aprobado. Contacta soporte.';
      case 'missing_order_number':
        return 'No se pudo identificar el número de orden';
      case 'order_not_found':
        return 'No se encontró la orden en el sistema';
      case 'callback_error':
        return 'Error en el procesamiento del callback de pago';
      case 'cancelled':
        return 'El pago fue cancelado por el usuario';
      case 'declined':
        return 'El pago fue rechazado por el banco';
      case 'insufficient_funds':
        return 'Fondos insuficientes en la tarjeta';
      case 'invalid_card':
        return 'Datos de tarjeta inválidos';
      case 'expired_card':
        return 'La tarjeta ha expirado';
      default:
        return reason;
    }
  };

  const getRecommendation = (reason: string | null) => {
    if (!reason) return 'Intenta nuevamente o contacta soporte';
    
    switch (reason.toLowerCase()) {
      case 'transaction is approved':
        return 'Contacta inmediatamente a nuestro soporte para verificar el estado de tu pago';
      case 'cancelled':
        return 'Puedes intentar realizar el pago nuevamente cuando desees';
      case 'declined':
      case 'insufficient_funds':
        return 'Verifica los datos de tu tarjeta o intenta con otra forma de pago';
      case 'invalid_card':
      case 'expired_card':
        return 'Verifica los datos de tu tarjeta e intenta nuevamente';
      default:
        return 'Si el problema persiste, contacta nuestro soporte técnico';
    }
  };

  const isUrgent = reason?.toLowerCase().includes('approved') || false;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header de error */}
        <div className="text-center mb-8">
          <div className={`mx-auto flex items-center justify-center h-16 w-16 rounded-full mb-4 ${
            isUrgent ? 'bg-yellow-100' : 'bg-red-100'
          }`}>
            <XCircleIcon className={`h-8 w-8 ${isUrgent ? 'text-yellow-600' : 'text-red-600'}`} />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {isUrgent ? 'Problema con el Pago' : 'Pago No Completado'}
          </h1>
          <p className="text-lg text-gray-600">
            {isUrgent ? 'Necesitamos verificar tu transacción' : 'Tu orden no pudo ser procesada'}
          </p>
        </div>

        {/* Alerta urgente si el pago fue aprobado pero hay error */}
        {isUrgent && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <XCircleIcon className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-3">
                <h3 className="text-lg font-medium text-yellow-800 mb-2">
                  ⚠️ Acción Requerida
                </h3>
                <p className="text-yellow-700 text-sm">
                  Tu pago puede haber sido procesado exitosamente, pero hubo un error técnico. 
                  <strong className="block mt-2">Por favor contacta inmediatamente a nuestro equipo para verificar el estado de tu transacción.</strong>
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Detalles del error */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Detalles del problema
          </h2>
          
          <div className="space-y-3">
            {orderNumber && (
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-600">Número de orden:</span>
                <span className="font-medium text-gray-900">{orderNumber}</span>
              </div>
            )}
            
            <div className="flex justify-between items-start py-2">
              <span className="text-gray-600">Motivo:</span>
              <span className="font-medium text-gray-900 text-right max-w-xs">
                {getReasonMessage(reason)}
              </span>
            </div>
            
            <div className="flex justify-between items-start py-2">
              <span className="text-gray-600">Recomendación:</span>
              <span className="text-gray-700 text-right max-w-xs text-sm">
                {getRecommendation(reason)}
              </span>
            </div>
            
            <div className="flex justify-between items-center py-2">
              <span className="text-gray-600">Fecha y hora:</span>
              <span className="font-medium text-gray-900">
                {new Date().toLocaleString('es-CR')}
              </span>
            </div>
          </div>
        </div>

        {/* Opciones de contacto */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            ¿Necesitas ayuda?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start space-x-3 p-4 border rounded-lg hover:bg-gray-50">
              <PhoneIcon className="h-6 w-6 text-servi_green mt-1" />
              <div>
                <h4 className="font-medium text-gray-900">Llámanos</h4>
                <p className="text-sm text-gray-600 mb-2">Atención inmediata por teléfono</p>
                <a href="tel:+50622345678" className="text-servi_green hover:underline font-medium">
                  +506 2234-5678
                </a>
              </div>
            </div>
            
            <div className="flex items-start space-x-3 p-4 border rounded-lg hover:bg-gray-50">
              <EnvelopeIcon className="h-6 w-6 text-servi_green mt-1" />
              <div>
                <h4 className="font-medium text-gray-900">Escríbenos</h4>
                <p className="text-sm text-gray-600 mb-2">Respuesta en 24 horas</p>
                <a href="mailto:soporte@servidentalcr.com" className="text-servi_green hover:underline font-medium">
                  soporte@servidentalcr.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Información adicional */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-medium text-blue-900 mb-3">
            Información importante
          </h3>
          <div className="space-y-2 text-sm text-blue-700">
            <p>• No se realizó ningún cargo a tu tarjeta si el pago falló</p>
            <p>• Puedes intentar nuevamente con la misma u otra tarjeta</p>
            <p>• Los productos en tu carrito se mantienen guardados temporalmente</p>
            <p>• Si tienes dudas sobre cargos, contacta a tu banco</p>
          </div>
        </div>

        {/* Acciones */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/carrito"
            className="inline-flex items-center justify-center px-6 py-3 bg-servi_green text-white rounded-md hover:bg-servi_dark transition-colors"
          >
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
            Volver al carrito
          </Link>
          
          <Link
            href="/tienda"
            className="inline-flex items-center justify-center px-6 py-3 border border-servi_green text-servi_green rounded-md hover:bg-servi_green hover:text-white transition-colors"
          >
            Seguir comprando
          </Link>
          
          <Link
            href="/contacto"
            className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
          >
            <EnvelopeIcon className="h-5 w-5 mr-2" />
            Contactar soporte
          </Link>
        </div>

        {/* Footer con horarios */}
        <div className="text-center mt-8 text-sm text-gray-500">
          <p className="mb-2">
            <strong>Horarios de atención:</strong> Lunes a Viernes, 8:00 AM - 5:00 PM
          </p>
          <p>
            Para emergencias fuera de horario, envía un email y te contactaremos a primera hora.
          </p>
        </div>
      </div>
    </div>
  );
}