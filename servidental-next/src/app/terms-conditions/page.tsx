// src/app/terms-conditions/page.tsx
import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Términos y Condiciones | ServiDental',
  description: 'Términos y condiciones de uso del sitio web y servicios de ServiDental CR.',
}

export default function TermsConditionsPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-gradient_gray to-gradient_green text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Términos y Condiciones
            </h1>
            <p className="mt-6 text-lg leading-8 max-w-2xl mx-auto">
              Condiciones de uso de nuestros servicios
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <p className="lead text-gray-600 mb-8">
              Bienvenido a ServiDental CR. Estos términos y condiciones describen las reglas y regulaciones 
              para el uso del sitio web de ServiDental CR y nuestros servicios.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">1. Aceptación de Términos</h2>
            <p className="text-gray-600 mb-6">
              Al acceder y utilizar este sitio web, usted acepta cumplir y estar sujeto a los siguientes 
              términos y condiciones de uso. Si no está de acuerdo con alguna parte de estos términos, 
              no debe usar nuestro sitio web o servicios.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">2. Uso del Sitio Web</h2>
            <p className="text-gray-600 mb-4">
              El contenido de este sitio web es para su información general y uso exclusivo. Está sujeto 
              a cambios sin previo aviso. Usted se compromete a:
            </p>
            <ul className="list-disc pl-6 mb-6 text-gray-600">
              <li>Utilizar el sitio web de manera legal y ética</li>
              <li>No intentar acceder a áreas restringidas del sitio</li>
              <li>No realizar actividades que puedan dañar o interferir con el funcionamiento del sitio</li>
              <li>No utilizar el sitio para transmitir material ofensivo o inapropiado</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">3. Servicios Ofrecidos</h2>
            <p className="text-gray-600 mb-6">
              ServiDental CR ofrece servicios de venta, mantenimiento, reparación e instalación de equipos 
              médicos dentales. Los términos específicos de cada servicio se establecerán en los contratos 
              o cotizaciones correspondientes.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-3">3.1 Cotizaciones</h3>
            <p className="text-gray-600 mb-6">
              Las cotizaciones proporcionadas tienen una validez de 30 días naturales, salvo que se indique 
              lo contrario. Los precios están sujetos a cambios sin previo aviso después de este período.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-3">3.2 Garantías</h3>
            <p className="text-gray-600 mb-6">
              Los términos de garantía varían según el producto o servicio. Los detalles específicos de 
              cada garantía se proporcionarán por escrito al momento de la compra o prestación del servicio.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">4. Propiedad Intelectual</h2>
            <p className="text-gray-600 mb-6">
              Este sitio web contiene material que es propiedad de ServiDental CR o de terceros. 
              Este material incluye, pero no se limita a, el diseño, la disposición, la apariencia, 
              los gráficos y las fotografías. La reproducción está prohibida sin el permiso por escrito 
              de ServiDental CR.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">5. Limitación de Responsabilidad</h2>
            <p className="text-gray-600 mb-6">
              ServiDental CR no será responsable por daños directos, indirectos, incidentales, especiales 
              o consecuentes que resulten del uso o la imposibilidad de usar nuestros servicios o sitio web, 
              incluso si se ha advertido sobre la posibilidad de tales daños.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">6. Privacidad</h2>
            <p className="text-gray-600 mb-6">
              Su privacidad es importante para nosotros. Toda la información personal recopilada se 
              manejará de acuerdo con nuestra{' '}
              <Link href="/privacy-policy" className="text-servi_green hover:text-servi_dark">
                Política de Privacidad
              </Link>.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">7. Enlaces a Terceros</h2>
            <p className="text-gray-600 mb-6">
              Nuestro sitio web puede contener enlaces a sitios web de terceros. Estos enlaces se 
              proporcionan para su conveniencia. No tenemos control sobre el contenido de estos sitios 
              y no asumimos responsabilidad por ellos.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">8. Modificaciones de los Términos</h2>
            <p className="text-gray-600 mb-6">
              ServiDental CR se reserva el derecho de revisar estos términos y condiciones en cualquier 
              momento. Los cambios entrarán en vigor inmediatamente después de su publicación en el sitio web. 
              Su uso continuado del sitio web después de cualquier cambio constituye su aceptación de los 
              nuevos términos.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">9. Ley Aplicable</h2>
            <p className="text-gray-600 mb-6">
              Estos términos y condiciones se rigen por las leyes de la República de Costa Rica. 
              Cualquier disputa relacionada con estos términos estará sujeta a la jurisdicción exclusiva 
              de los tribunales de Costa Rica.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">10. Servicio al Cliente</h2>
            <p className="text-gray-600 mb-4">
              Nos comprometemos a brindar el mejor servicio posible. Si tiene alguna pregunta o inquietud 
              sobre nuestros términos y condiciones, no dude en contactarnos:
            </p>

            <div className="bg-gray-100 p-6 rounded-lg mb-8">
              <p className="text-gray-700 font-semibold">ServiDental CR</p>
              <p className="text-gray-600">Email: info@servidentalcr.com</p>
              <p className="text-gray-600">Teléfono: (+506) 2101-6114</p>
              <p className="text-gray-600">WhatsApp: (+506) 8704-5556</p>
              <p className="text-gray-600">Horario: Lunes a Viernes, 8:00 AM - 5:00 PM</p>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">11. Procedimiento de Reclamos</h2>
            <p className="text-gray-600 mb-6">
              Si tiene algún reclamo sobre nuestros productos o servicios, puede presentarlo a través 
              de cualquiera de nuestros canales de comunicación. Nos comprometemos a responder dentro 
              de 48 horas hábiles y a resolver el reclamo en el menor tiempo posible.
            </p>

            <p className="text-sm text-gray-500 italic mt-12">
              Última actualización: {new Date().toLocaleDateString('es-CR', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>

          <div className="mt-12 text-center">
            <Link 
              href="/" 
              className="inline-flex items-center text-servi_green hover:text-servi_dark font-medium"
            >
              ← Volver al inicio
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}