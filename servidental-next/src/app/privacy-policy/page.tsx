// src/app/privacy-policy/page.tsx
import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Políticas de Privacidad | ServiDental',
  description: 'Políticas de privacidad y protección de datos personales de ServiDental CR.',
}

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-gradient_gray to-gradient_green text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Políticas de Privacidad
            </h1>
            <p className="mt-6 text-lg leading-8 max-w-2xl mx-auto">
              Tu privacidad es importante para nosotros
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <p className="lead text-gray-600 mb-8">
              En ServiDental CR, nos comprometemos a proteger la privacidad de nuestros clientes y usuarios. 
              Esta política describe cómo recopilamos, usamos y protegemos su información personal.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">1. Información que Recopilamos</h2>
            <p className="text-gray-600 mb-4">
              Recopilamos información que usted nos proporciona directamente cuando:
            </p>
            <ul className="list-disc pl-6 mb-6 text-gray-600">
              <li>Completa formularios de contacto en nuestro sitio web</li>
              <li>Se comunica con nosotros por correo electrónico o WhatsApp</li>
              <li>Solicita cotizaciones o servicios</li>
              <li>Se suscribe a nuestro boletín informativo</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-3">Tipos de información:</h3>
            <ul className="list-disc pl-6 mb-6 text-gray-600">
              <li>Nombre completo</li>
              <li>Dirección de correo electrónico</li>
              <li>Número de teléfono</li>
              <li>Nombre de la clínica o empresa</li>
              <li>Información sobre equipos y servicios de interés</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">2. Uso de la Información</h2>
            <p className="text-gray-600 mb-4">
              Utilizamos la información recopilada para:
            </p>
            <ul className="list-disc pl-6 mb-6 text-gray-600">
              <li>Responder a sus consultas y solicitudes</li>
              <li>Proporcionar cotizaciones y servicios solicitados</li>
              <li>Enviar información sobre productos y servicios relevantes</li>
              <li>Mejorar nuestros productos y servicios</li>
              <li>Cumplir con obligaciones legales y regulatorias</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">3. Protección de Datos</h2>
            <p className="text-gray-600 mb-6">
              Implementamos medidas de seguridad técnicas y organizativas apropiadas para proteger su información 
              personal contra el acceso no autorizado, la alteración, divulgación o destrucción. Estas medidas incluyen:
            </p>
            <ul className="list-disc pl-6 mb-6 text-gray-600">
              <li>Encriptación de datos sensibles</li>
              <li>Acceso restringido a información personal</li>
              <li>Actualizaciones regulares de seguridad</li>
              <li>Capacitación del personal en protección de datos</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">4. Compartir Información</h2>
            <p className="text-gray-600 mb-6">
              No vendemos, alquilamos ni compartimos su información personal con terceros para fines de marketing. 
              Solo compartimos información cuando:
            </p>
            <ul className="list-disc pl-6 mb-6 text-gray-600">
              <li>Usted nos da su consentimiento explícito</li>
              <li>Es necesario para proporcionar los servicios solicitados</li>
              <li>Lo requiere la ley o una orden judicial</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">5. Cookies y Tecnologías Similares</h2>
            <p className="text-gray-600 mb-6">
              Nuestro sitio web utiliza cookies para mejorar su experiencia de navegación. Las cookies son pequeños 
              archivos de texto que se almacenan en su dispositivo. Puede configurar su navegador para rechazar 
              todas las cookies o para indicar cuándo se envía una cookie.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">6. Sus Derechos</h2>
            <p className="text-gray-600 mb-4">
              Usted tiene derecho a:
            </p>
            <ul className="list-disc pl-6 mb-6 text-gray-600">
              <li>Acceder a su información personal</li>
              <li>Corregir información inexacta</li>
              <li>Solicitar la eliminación de sus datos</li>
              <li>Oponerse al procesamiento de sus datos</li>
              <li>Retirar su consentimiento en cualquier momento</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">7. Retención de Datos</h2>
            <p className="text-gray-600 mb-6">
              Conservamos su información personal solo durante el tiempo necesario para cumplir con los propósitos 
              para los cuales fue recopilada, incluyendo cualquier requisito legal, contable o de reporte.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">8. Cambios a esta Política</h2>
            <p className="text-gray-600 mb-6">
              Nos reservamos el derecho de actualizar esta política de privacidad en cualquier momento. 
              Los cambios entrarán en vigor inmediatamente después de su publicación en nuestro sitio web. 
              La fecha de la última actualización se indicará al final de este documento.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">9. Contacto</h2>
            <p className="text-gray-600 mb-6">
              Si tiene preguntas sobre esta política de privacidad o sobre cómo manejamos su información personal, 
              puede contactarnos en:
            </p>
            <div className="bg-gray-100 p-6 rounded-lg mb-8">
              <p className="text-gray-700 font-semibold">ServiDental CR</p>
              <p className="text-gray-600">Email: info@servidentalcr.com</p>
              <p className="text-gray-600">Teléfono: (+506) 2101-6114</p>
              <p className="text-gray-600">Dirección: Del Banco Nacional de San Pedro, 450m Sur y 25m Este, Montes de Oca, San José</p>
            </div>

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