import { Metadata } from 'next'
import ContactForm from '@/components/contact/ContactForm'
import ContactInfo from '@/components/contact/ContactInfo'
import Map from '@/components/contact/Map'
import BlackNovemberBanner from '@/components/home/BlackNovemberBanner'
import PageBanner from '@/components/common/PageBanner'
import contactoDesktop from '@/assets/banners/contacto-desktop.avif'
import contactoMobile from '@/assets/banners/contacto-mobile.avif'

export const metadata: Metadata = {
  title: 'Contáctenos | ServiDental',
  description: 'Comuníquese con nosotros para consultas, servicios y soporte técnico especializado en equipos dentales.',
}

export default function ContactPage() {
  return (
    <main>
      <BlackNovemberBanner />
      {/* Hero Section */}
      <PageBanner desktop={contactoDesktop} mobile={contactoMobile} alt="Contáctenos">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Contáctenos
        </h1>
        <p className="mt-4 text-base leading-7 text-gray-100 max-w-2xl mx-auto">
          Estamos aquí para ayudarle con todas sus necesidades de equipamiento dental
        </p>
      </PageBanner>

      {/* Contact Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <ContactInfo />
            
            {/* Contact Form */}
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">
              Visítenos en nuestro Show Room
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Del Banco Nacional de San Pedro, 450m Sur y 25m Este
            </p>
          </div>
          <Map />
        </div>
      </section>
    </main>
  )
}