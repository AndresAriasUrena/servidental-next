import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ServiDental | Equipo Médico Dental',
  description: 'Más de 16 años de experiencia en el mercado costarricense, ofrecemos soluciones efectivas para los problemas técnicos asociados con clínicas odontológicas.',
  keywords: 'equipo médico dental, servicio técnico dental, Costa Rica, unidades dentales',
  openGraph: {
    title: 'ServidentalCR',
    description: 'Más de 16 años de experiencia en el mercado costarricense, ofrecemos soluciones efectivas para los problemas técnicos asociados con clínicas odontológicas.',
    url: 'http://servidentalcr.com/',
    images: [
      {
        url: '/android-chrome-512x512.png',
        width: 512,
        height: 512,
        alt: 'ServiDental CR Logo',
      },
    ],
    type: 'website',
  },
  authors: [{ name: 'ServidentalCR' }],
  alternates: {
    canonical: 'http://servidentalcr.com/',
  },
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
    shortcut: '/favicon.ico',
    other: [
      { rel: 'manifest', url: '/site.webmanifest' },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
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
