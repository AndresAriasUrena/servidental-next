import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import assets from '@/assets'

export const metadata: Metadata = {
  title: 'Servicios Técnicos | ServiDental',
  description: 'Servicios especializados de mantenimiento, reparación y soporte para equipos dentales.',
}

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

export default function ServicesPage() {
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
            {/* Preventive Maintenance */}
            <div className="col-span-2">
              <div className="relative">
                <Image
                  src={assets.services.mantenimientos}
                  alt="Mantenimiento preventivo"
                  width={800}
                  height={500}
                  className="rounded-lg w-full object-cover"
                />
              </div>

              <div className="mt-8">
                <h2 className="text-3xl font-bold text-gray-900">
                  Mantenimiento Preventivo
                </h2>
                <p className="mt-4 text-gray-600 leading-relaxed">
                  El mantenimiento preventivo de las Unidades Dentales tiene como objetivo 
                  prevenir desperfectos de los equipos a través del diagnóstico temprano 
                  de complicaciones que comprometan el funcionamiento de este. Se puede 
                  evitar un desperfecto mayor de elementos que componen la Unidad Dental 
                  y equipos periféricos.
                </p>

                <h3 className="mt-8 text-xl font-semibold text-gray-900">
                  Requerimientos para realizar un servicio correctivo
                </h3>
                <p className="mt-4 text-gray-600 leading-relaxed">
                  Los equipos con mantenimiento preventivo deberán pasar por una revisión 
                  de nuestro personal para calificar y cualificar el estado situacional de 
                  cada uno de ellos, de lo contrario se deberá hacer un mantenimiento 
                  correctivo completo que garantice que el equipo está trabajando correctamente.
                </p>

                <h3 className="mt-8 text-xl font-semibold text-gray-900">
                  Duración del mantenimiento
                </h3>
                <p className="mt-4 text-gray-600 leading-relaxed">
                  El mantenimiento preventivo tiene una duración aproximada de 2 horas por 
                  unidad dental. Se realizará de acuerdo con la rutina adjunta. Se trabajará 
                  también cronograma con las fechas de las visitas y una bitácora.
                </p>
              </div>
            </div>

            {/* Sidebar Activities */}
            <div className="space-y-8">
              <div>
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

              <div>
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
            </div>
          </div>

          {/* Corrective Maintenance Section */}
          <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="col-span-2">
              <div className="relative">
                <Image
                  src={assets.services.calibraciones}
                  alt="Mantenimiento correctivo"
                  width={800}
                  height={500}
                  className="rounded-lg w-full object-cover"
                />
              </div>

              <div className="mt-8">
                <h2 className="text-3xl font-bold text-gray-900">
                  Mantenimiento Correctivo
                </h2>
                <p className="mt-4 text-gray-600 leading-relaxed">
                  El concepto de mantenimiento correctivo se refiere a las acciones o 
                  actividades destinadas a preservar un aparato, maquinaria o producto, 
                  o a restaurar alguno de estos para asegurar que funcione de manera óptima.<br/>
                  Es importante destacar que este tipo de mantenimiento es realizado por profesionales con amplia experiencia y un profundo conocimiento del equipo o máquina en cuestión.
                  El proceso de mantenimiento correctivo generalmente comienza con una inspección exhaustiva del equipo.
                </p>

                <h3 className="mt-8 text-xl font-semibold text-gray-900">
                  Pasos para realizar un servicio correctivo
                </h3>
                <ol className="mt-4 space-y-4 list-decimal list-inside text-gray-600">
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
              </div>
            </div>

            {/* Sidebar Services */}
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Nuestros Servicios de Mantenimiento Correctivo
                </h3>
                <ul className="space-y-3">
                  {maintenanceServices.map((service) => (
                    <li key={service.name} className="flex items-center space-x-2">
                      <div className="h-2 w-2 bg-servi_green rounded-full" />
                      <span className="text-gray-600">
                        {service.name} {service.duration}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-6 bg-blue-50 rounded-lg">
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