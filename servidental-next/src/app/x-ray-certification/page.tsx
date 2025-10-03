// src/app/x-ray-certification/page.tsx
'use client'

import { useState } from 'react'
import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { X, Phone, FileText, Calendar, DollarSign } from 'lucide-react'
import assets from '@/assets'

// export const metadata: Metadata = {
//   title: 'Certificación de Rayos X | ServiDental',
//   description: 'Servicio profesional de certificación de equipos de rayos X por personal registrado ante el Ministerio de Salud.',
// }

interface PriceCardProps {
  title: string
  price: string
  icon: React.ReactNode
}

function PriceCard({ title, price, icon }: PriceCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <div className="flex items-center mb-4">
        <div className="text-servi_green mr-3">{icon}</div>
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      </div>
      <p className="text-2xl font-bold text-servi_green">{price}</p>
    </div>
  )
}

export default function XRayCertificationPage() {
  const [showPaymentModal, setShowPaymentModal] = useState(false)

  return (
    <main>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-gradient_gray to-gradient_green text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Certificación de Rayos X
            </h1>
            <p className="mt-6 text-lg leading-8 max-w-2xl mx-auto">
              Servicio profesional de certificación por personal registrado ante el Ministerio de Salud
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Information */}
            <div className="lg:col-span-2">
              {/* Hero Image */}
              <div className="relative h-64 lg:h-96 mb-8 rounded-lg overflow-hidden">
                <Image
                  src={assets.services.certificaciones}
                  alt="Certificación de Rayos X"
                  fill
                  className="object-cover"
                />
              </div>

              {/* General Information */}
              <div className="bg-gray-50 p-6 rounded-lg mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <FileText className="w-6 h-6 mr-2 text-servi_green" />
                  Información General
                </h2>
                <div className="space-y-3 text-gray-600">
                  <p className="flex items-start">
                    <span className="text-servi_green mr-2">•</span>
                    El procedimiento se coordina con la Ingeniera Malena Orozco, 
                    y dura aproximadamente 1 hora.
                  </p>
                  <p className="flex items-start">
                    <span className="text-servi_green mr-2">•</span>
                    Si el equipo es aprobado, se emite un certificado que se envía vía 
                    correo electrónico dentro de 2 días hábiles.
                  </p>
                </div>
              </div>

              {/* Price Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <PriceCard
                  title="Rayos X Portátil"
                  price="₡56,500"
                  icon={<DollarSign className="w-6 h-6" />}
                />
                <PriceCard
                  title="Rayos X de Pared"
                  price="₡62,150"
                  icon={<DollarSign className="w-6 h-6" />}
                />
              </div>

              {/* Important Considerations */}
              <div className="bg-white border-2 border-servi_green rounded-lg p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Consideraciones para solicitar una Certificación para equipo de Rayos X con Servidental
                </h2>
                
                <div className="space-y-6">
                  {/* Availability */}
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2 flex items-center">
                      <Calendar className="w-5 h-5 mr-2 text-servi_green" />
                      Disponibilidad del equipo
                    </h3>
                    <p className="text-gray-600 pl-7">
                      Los equipos deben estar disponibles al momento de la visita técnica. 
                      Si transcurren 15 minutos sin que se puedan revisar, 
                      <span className="font-semibold text-red-600"> la visita se anulará</span> y 
                      el cliente deberá <span className="font-semibold text-red-600">cancelar el 
                      costo correspondiente a la misma</span>.
                    </p>
                  </div>

                  {/* Service Value */}
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2 flex items-center">
                      <DollarSign className="w-5 h-5 mr-2 text-servi_green" />
                      Valor del servicio
                    </h3>
                    <p className="text-gray-600 pl-7">Valor base según el tipo de equipo (IVA incluido):</p>
                    <ul className="pl-7 mt-2 space-y-1 text-gray-600">
                      <li>• Rayos X portátil: <span className="font-bold text-servi_green">₡56,500</span></li>
                      <li>• Rayos X de pared: <span className="font-bold text-servi_green">₡62,150</span></li>
                    </ul>
                    <div className="pl-7 mt-3 p-3 bg-amber-50 border-l-4 border-amber-400 rounded-r-lg">
                      <p className="text-amber-800 text-sm">
                        <span className="font-semibold">Nota importante:</span> Los precios mostrados son tarifas base dentro del <strong>Área Metropolitana</strong>. 
                        Se aplicará un costo adicional variable según la distancia de traslado del profesional certificador.
                      </p>
                    </div>
                  </div>

                  {/* Payment Method */}
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">Forma de pago</h3>
                    <p className="text-gray-600 mb-3">
                      Una vez agendado el servicio, se debe realizar la cancelación del mismo.
                    </p>
                    <div className="bg-gray-100 p-4 rounded-lg space-y-2">
                      <p className="font-medium">
                        <span className="text-gray-700">Sinpe:</span>{' '}
                        <span className="text-servi_green font-bold">8704-5556</span>
                      </p>
                      <p className="font-medium">
                        <span className="text-gray-700">Cuentas bancarias:</span>{' '}
                        <button
                          onClick={() => setShowPaymentModal(true)}
                          className="text-servi_green hover:text-servi_dark underline"
                        >
                          Ver información de cuentas
                        </button>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Contact Card */}
              <div className="bg-servi_green text-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4">¿Necesita agendar su certificación?</h3>
                <p className="mb-6">
                  Para más información o para agendar su cita, puede contactarnos:
                </p>
                <Link
                  href="https://api.whatsapp.com/send?phone=50683202117&text=Hola,%20necesito%20información%20sobre%20la%20certificación%20de%20rayos%20X"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center bg-white text-servi_green px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors font-semibold"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  WhatsApp: 8320-2117
                </Link>
              </div>

              {/* Professional Info */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Profesional a cargo
                </h3>
                <div className="space-y-2 text-gray-600">
                  <p className="font-medium text-gray-800">Ing. Malena Orozco</p>
                  <p>Profesional registrada ante el Ministerio de Salud</p>
                  <p className="text-sm mt-3">
                    Verificación de parámetros para el buen funcionamiento de equipos radiológicos
                  </p>
                </div>
              </div>

              {/* Process Timeline */}
              <div className="bg-white border border-gray-200 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Proceso de Certificación
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-servi_green text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm mr-3 flex-shrink-0">
                      1
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">Agendar cita</p>
                      <p className="text-sm text-gray-600">Coordinar fecha y hora</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-servi_green text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm mr-3 flex-shrink-0">
                      2
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">Visita técnica</p>
                      <p className="text-sm text-gray-600">Duración aproximada: 1 hora</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-servi_green text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm mr-3 flex-shrink-0">
                      3
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">Emisión de certificado</p>
                      <p className="text-sm text-gray-600">Envío por email en 2 días hábiles</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Payment Info Modal */}
      {showPaymentModal && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={() => setShowPaymentModal(false)}
        >
          <div 
            className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-xl font-semibold text-gray-900">Información de Cuentas Bancarias</h3>
              <button
                onClick={() => setShowPaymentModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-4 overflow-auto max-h-[calc(90vh-80px)]">
              <iframe
                src="/pdf/medios-de-pago.pdf"
                className="w-full h-[600px]"
                title="Medios de pago"
              />
            </div>
          </div>
        </div>
      )}

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-gradient_gray to-gradient_green py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Mantenga sus equipos certificados y en regla
          </h2>
          <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
            Cumplimos con todos los requisitos del Ministerio de Salud para la certificación de equipos radiológicos
          </p>
          <Link
            href="https://api.whatsapp.com/send?phone=50683202117&text=Hola,%20necesito%20información%20sobre%20la%20certificación%20de%20rayos%20X"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white text-servi_dark px-8 py-3 rounded-md font-semibold hover:bg-blue-50 transition-colors"
          >
            Agendar certificación
          </Link>
        </div>
      </section>
    </main>
  )
}