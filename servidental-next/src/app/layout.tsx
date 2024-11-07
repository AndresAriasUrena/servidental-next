import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Head from 'next/head';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ServiDental | Equipo Médico Dental',
  description: 'Más de 16 años de experiencia en el mercado costarricense, ofrecemos soluciones efectivas para los problemas técnicos asociados con clínicas odontológicas.',
  keywords: 'equipo médico dental, servicio técnico dental, Costa Rica, unidades dentales',
  openGraph: {
    title: 'ServidentalCR',
    description: 'Más de 16 años de experiencia en el mercado costarricense, ofrecemos soluciones efectivas para los problemas técnicos asociados con clínicas odontológicas.',
    url: 'https://servidentalcr.aurigital.com/',
    images: [
      {
        url: '/favicon-48x48.png',
        width: 48,
        height: 48,
        alt: 'Servidental Icon'
      },
    ],
    type: 'website',
  },
  authors: [{ name: 'ServidentalCR' }],
  alternates: {
    canonical: 'https://servidentalcr.aurigital.com/',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <Head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: `
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "ServidentalCR",
            "url": "https://servidentalcr.aurigital.com/",
            "logo": "https://servidentalcr.aurigital.com/favicon.ico",
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+506-21016114",
              "contactType": "Customer Service",
              "areaServed": "CR",
              "availableLanguage": "es"
            },
            "sameAs": [
              "https://www.instagram.com/servidentalcr/?hl=es-la",
              "https://www.facebook.com/Servidentalcr"
            ]
          }
        `}} />
      </Head>
      <body className={inter.className}>
        <Header />
        <main className="min-h-screen pt-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
