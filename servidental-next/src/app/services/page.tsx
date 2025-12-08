// src/app/services/page.tsx
'use client'

import { useState } from 'react'
import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronDown, ChevronUp, X } from 'lucide-react'
import assets from '@/assets'

// export const metadata: Metadata = {
//   title: 'Servicios Técnicos | ServiDental',
//   description: 'Servicios especializados de mantenimiento, reparación y soporte para equipos dentales.',
// }

const maintenanceActivities = [
  'Calibración',
  'Inspección',
  'Pruebas de funcionamiento',
  'Limpieza',
  'Lubricación',
] as const

const stockAccessories = [
  'Mangueras de aire y agua',
  'Bombillos',
  'Filtros',
  'Boquillas de succión',
  'Fusibles',
  'Cableado',
  'Interruptores',
  'Válvulas',
  'Tarjetas',
] as const

const maintenanceServices = [
  {
    name: 'Simple',
    duration: '1 hora',
  },
  {
    name: 'Medio',
    duration: '2 horas',
  },
  {
    name: 'Complejo',
    duration: '3 horas',
  },
  {
    name: 'Especial',
    duration: 'más de 4 horas',
  },
] as const

interface AccordionItemProps {
  title: string
  isOpen: boolean
  onToggle: () => void
  children: React.ReactNode
  image?: any
}

function AccordionItem({ title, isOpen, onToggle, children, image }: AccordionItemProps) {
  return (
    <div className="border border-gray-200 rounded-lg mb-4 overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full px-6 py-4 bg-white hover:bg-gray-50 transition-colors duration-200 flex items-center justify-between text-left"
      >
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
        {isOpen ? (
          <ChevronUp className="w-6 h-6 text-servi_green" />
        ) : (
          <ChevronDown className="w-6 h-6 text-servi_green" />
        )}
      </button>
      
      <div
        className={`transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
        }`}
      >
        <div className="px-6 pb-6">
          {image && (
            <div className="relative w-full h-64 mb-6 rounded-lg overflow-hidden">
              <Image
                src={image}
                alt={title}
                fill
                className="object-cover"
              />
            </div>
          )}
          <div className="prose prose-lg max-w-none text-gray-600">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ServicesPage() {
  const [openSection, setOpenSection] = useState<number | null>(2) // Cambiado a 2 para abrir la tercera sección
  const [showPaymentModal, setShowPaymentModal] = useState(false)

  const handleToggle = (index: number) => {
    setOpenSection(openSection === index ? null : index)
  }

  return (
    <main>
      {/* Hero Section */}
      <section className="bg-servicios_bg bg-cover bg-center bg-no-repeat text-white pb-20 pt-40 md:pt-[27rem]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Servicio Técnico
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-100 max-w-2xl mx-auto">
              Mantenimiento preventivo y correctivo para equipos dentales
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content with Accordion */}
            <div className="lg:col-span-2">
              {/* Mantenimiento Preventivo */}
              <AccordionItem
                title="Mantenimiento Preventivo"
                isOpen={openSection === 0}
                onToggle={() => handleToggle(0)}
                image={assets.services.mantenimientos}
              >
                <p className="mb-4">
                  El mantenimiento preventivo de las Unidades Dentales tiene como objetivo 
                  prevenir desperfectos de los equipos a través del diagnóstico temprano 
                  de complicaciones que comprometan el funcionamiento de este. Se puede 
                  evitar un desperfecto mayor de elementos que componen la Unidad Dental 
                  y equipos periféricos.
                </p>
                
                <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                  Requerimientos para realizar un servicio correctivo
                </h3>
                <p className="mb-4">
                  Los equipos con mantenimiento preventivo deberán pasar por una revisión 
                  de nuestro personal para calificar y cualificar el estado situacional de 
                  cada uno de ellos, de lo contrario se deberá hacer un mantenimiento 
                  correctivo completo que garantice que el equipo está trabajando correctamente.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                  Duración del mantenimiento
                </h3>
                <p>
                  El mantenimiento preventivo tiene una duración aproximada de 2 horas por 
                  unidad dental. Se realizará de acuerdo con la rutina adjunta. Se trabajará 
                  también cronograma con las fechas de las visitas y una bitácora.
                </p>
              </AccordionItem>

              {/* Mantenimiento Correctivo */}
              <AccordionItem
                title="Mantenimiento Correctivo"
                isOpen={openSection === 1}
                onToggle={() => handleToggle(1)}
                image={assets.services.calibraciones}
              >
                <p className="mb-4">
                  El concepto de mantenimiento correctivo se refiere a las acciones o 
                  actividades destinadas a preservar un aparato, maquinaria o producto, 
                  o a restaurar alguno de estos para asegurar que funcione de manera óptima. 
                  Es importante destacar que este tipo de mantenimiento es realizado por 
                  profesionales con amplia experiencia y un profundo conocimiento del equipo 
                  o máquina en cuestión. El proceso de mantenimiento correctivo generalmente 
                  comienza con una inspección exhaustiva del equipo.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                  Pasos para realizar un servicio correctivo
                </h3>
                <ol className="list-decimal list-inside space-y-3">
                  <li className="pl-2">
                    Contacte a nuestro personal para generar una orden de trabajo para la
                    visita de mantenimiento correctivo. Se solicitarán datos básicos sobre
                    la falla y se coordinarán la fecha, hora y duración aproximada de la
                    visita.
                  </li>
                  <li className="pl-2">
                    Durante la visita, el profesional encargado del mantenimiento llevará
                    a cabo mediciones y comprobaciones con el fin de identificar los
                    desperfectos o verificar que los equipos estén funcionando
                    adecuadamente.
                  </li>
                  <li className="pl-2">
                    En caso de que se detecte alguna falla, se realizará una valoración
                    del costo de la reparación. Una vez aprobada dicha valoración,
                    procederemos con la reparación correspondiente.
                  </li>
                  <li className="pl-2">
                    Al concluir el mantenimiento correctivo, se elaborará un reporte de
                    servicio y se llevará a cabo la facturación del trabajo realizado.
                  </li>
                </ol>
              </AccordionItem>

              {/* Consideraciones Importantes */}
              <AccordionItem
                title="Consideraciones Importantes"
                isOpen={openSection === 2}
                onToggle={() => handleToggle(2)}
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Consideraciones para solicitar un mantenimiento con Servidental
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <p className="font-semibold text-gray-800 mb-2">• Agende su cita</p>
                    <p className="pl-4">
                      Al solicitar el servicio, se agenda una visita y se asigna un técnico 
                      responsable para atender su requerimiento.
                    </p>
                  </div>

                  <div>
                    <p className="font-semibold text-gray-800 mb-2">• Equipos que atendemos</p>
                    <p className="pl-4">
                      Servidental brinda mantenimiento y servicio técnico únicamente a los 
                      equipos que distribuimos. En caso de que el equipo no haya sido adquirido 
                      con nosotros, se debe consultar previamente. Nuestro equipo técnico 
                      evaluará si es posible atenderlo, según la disponibilidad de insumos 
                      o repuestos.
                    </p>
                  </div>

                  <div>
                    <p className="pl-4">
                      • Los equipos deben estar disponibles al momento de la visita técnica. 
                      Si transcurren 15 minutos sin que se puedan revisar, <span className="font-semibold">
                      la visita se anulará</span> y el cliente deberá <span className="font-semibold">
                      cancelar el costo correspondiente a la misma</span>.
                    </p>
                  </div>

                  <div>
                    <p className="font-semibold text-gray-800 mb-2">• Valor del servicio</p>
                    <p className="pl-4">
                      La visita técnica tiene un costo base de <span className="font-bold text-servi_green">
                      ₡35.000 + IVA</span>. A este monto se sumará el valor de los repuestos utilizados, 
                      procesos realizados y aplica para el <strong>Área Metropolitana</strong>. Se aplicará un costo 
                      adicional según la distancia de traslado del profesional.
                    </p>
                  </div>

                  <div>
                    <p className="font-semibold text-gray-800 mb-2">• Forma de pago</p>
                    <p className="pl-4 mb-2">
                      Una vez finalizado el servicio, se debe realizar la cancelación del mismo.
                      Recuerde reportar su pago al{' '}
                      <Link
                        href="https://api.whatsapp.com/send?phone=50683505757"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-servi_green hover:text-servi_dark underline font-semibold"
                      >
                        WhatsApp 8350-5757
                      </Link>.
                    </p>
                    <div className="pl-4 space-y-2">
                      <p><strong>Sinpe:</strong> 8350-5757</p>
                      <p>
                        <strong>Cuentas bancarias:</strong>{' '}
                        <button
                          onClick={() => setShowPaymentModal(true)}
                          className="text-servi_green hover:text-servi_dark underline"
                        >
                          Ver información de cuentas
                        </button>
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-servi_light rounded-lg">
                    <p className="text-center">
                      Para más información o para agendar su mantenimiento, puede contactarnos 
                      al teléfono y/o WhatsApp{' '}
                      <Link 
                        href="https://api.whatsapp.com/send?phone=50621016114"
                        className="font-bold text-servi_green hover:text-servi_dark"
                      >
                        2101-6114
                      </Link>
                    </p>
                  </div>
                </div>
              </AccordionItem>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Actividades */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Actividades que realizamos
                </h3>
                <ul className="space-y-3">
                  {maintenanceActivities.map((activity) => (
                    <li key={activity} className="flex items-center space-x-2">
                      <div className="h-2 w-2 bg-servi_green rounded-full" />
                      <span className="text-gray-600">{activity}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Stock de accesorios */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Stock de accesorios
                </h3>
                <ul className="space-y-3">
                  {stockAccessories.map((accessory) => (
                    <li key={accessory} className="flex items-center space-x-2">
                      <div className="h-2 w-2 bg-servi_green rounded-full" />
                      <span className="text-gray-600">{accessory}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tipos de servicio */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Tipos de Mantenimiento
                </h3>
                <ul className="space-y-3">
                  {maintenanceServices.map((service) => (
                    <li key={service.name} className="flex items-center justify-between">
                      <span className="text-gray-600">{service.name}</span>
                      <span className="text-sm text-gray-500">{service.duration}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Garantía */}
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-900 mb-4">
                  Garantía
                </h3>
                <p className="text-servi_dark">
                  30 días después del correctivo en la parte donde se realizó.
                </p>
                <p className="mt-4 text-sm text-servi_green">
                  El tiempo de respuesta en caso de fallo repentino de los equipos 
                  será menor a 12 horas hábiles de trabajo.
                </p>
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
              <Image
                src="/pdf/ServiDental.jpg"
                alt="Información de Cuentas Bancarias"
                width={800}
                height={600}
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
        </div>
      )}

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-gradient_gray to-gradient_green py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white">
            Comuníquese con nuestros asesores para cotizaciones, servicio técnico y consultas generales.
          </h2>
          <div className="mt-8">
            <Link
              href="/contact"
              className="inline-block bg-white text-servi_dark px-8 py-3 rounded-md font-semibold hover:bg-blue-50 transition-colors"
            >
              Enviar mensaje
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}