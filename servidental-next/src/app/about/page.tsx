import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import assets from '@/assets'

export const metadata: Metadata = {
  title: '¿Quiénes Somos? | ServiDental',
  description: 'Expertos en equipamiento dental desde 2007, brindando soluciones técnicas y mantenimiento especializado para clínicas dentales en Costa Rica.',
}

const specialties = [
  'Instalaciones',
  'Mantenimientos',
  'Asesorías técnicas',
  'Traslados',
  'Capacitaciones',
  'Certificaciones de Rayos X',
]

const products = [
  'Unidades dentales',
  'Autoclaves',
  'Piezas de mano',
  'Lámpara de foto curado',
  'Limpiadores ultrasónicos',
  'Compresores',
  'Bombas de vacío',
  'Equipos de laboratorio dental',
  'Tomografía dental (2D Y 3D)',
  'Radiografía digital',
  'Equipos de Rayos X',
  'Escáneres dentales',
  'Impresión 3D',
]

export default function AboutPage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              ¿Quiénes Somos?
            </h1>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg prose-blue mx-auto">
            <p className="lead">
              Somos una empresa con extensa trayectoria en el sector dental desde el 
              2007, combinada con una capacidad técnica sobresaliente que nos ha 
              posicionado como la opción preferida por más de 800 clínicas de 
              odontología que buscan un socio experto y confiable.
            </p>
            
            <p>
              Desde nuestros inicios, hemos trabajado incansablemente para desarrollar 
              soluciones innovadoras y adaptadas a las necesidades específicas de cada 
              cliente, asegurando así un servicio personalizado y de alta calidad. 
              Nuestra experiencia nos permite ofrecer soporte y mantenimiento para los 
              equipos utilizados en el mercado odontológico.
            </p>

            <p>
              Además, nuestra inversión constante en tecnología y formación nos 
              permite proporcionar soluciones inmediatas, accesibles y de alta 
              calidad. La confianza que nos depositan las clínicas es un testimonio de 
              nuestro compromiso con la excelencia y el esfuerzo constante por superar 
              las expectativas de nuestros socios.
            </p>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Misión */}
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Misión</h3>
              <p className="text-gray-600">
                Garantizar una atención eficiente para todos los requerimientos técnicos
                relacionados con las clínicas odontológicas, ofreciendo soluciones
                inmediatas, accesibles y de alta calidad.
              </p>
            </div>

            {/* Visión */}
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Visión</h3>
              <p className="text-gray-600">
                Ser la empresa líder y la primera opción para la resolución de problemas
                técnicos en cualquier clínica odontológica del país, ofreciendo
                servicios que superen las expectativas de los odontólogos, basándonos en
                los más altos estándares de calidad.
              </p>
            </div>

            {/* ServiDental */}
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">ServiDental</h3>
              <p className="text-gray-600">
                Servidental CR centraliza todos sus esfuerzos y desarrollos con un grupo
                multidisciplinario adecuadamente calificado en pro de la excelencia en
                el servicio y compromiso, con el objetivo de centralizar los servicios
                que puedan necesitar las clínicas para su funcionamiento integral.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Specialties Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                Especialistas en equipo médico dental
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Specialties */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Nuestra empresa se especializa en:
                  </h3>
                  <ul className="space-y-2">
                    {specialties.map((specialty) => (
                      <li key={specialty} className="flex items-center text-gray-600">
                        <span className="h-1.5 w-1.5 bg-blue-600 rounded-full mr-2" />
                        {specialty}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Products */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    De los siguientes productos:
                  </h3>
                  <ul className="space-y-2">
                    {products.map((product) => (
                      <li key={product} className="flex items-center text-gray-600">
                        <span className="h-1.5 w-1.5 bg-blue-600 rounded-full mr-2" />
                        {product}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8">
                <Link
                  href="/services"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                  Explorar servicios
                </Link>
              </div>
            </div>

            {/* Image */}
            <div className="relative h-[600px]">
              <Image
                src={assets.services.instalaciones}
                alt="Servicio técnico dental"
                fill
                className="object-cover rounded-lg"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-700 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white">
            Comuníquese con nuestros asesores para cotizaciones, servicio técnico y consultas generales.
          </h2>
          <div className="mt-8">
            <Link
              href="/contact"
              className="inline-block bg-white text-blue-700 px-8 py-3 rounded-md font-semibold hover:bg-blue-50 transition-colors"
            >
              Enviar mensaje
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}