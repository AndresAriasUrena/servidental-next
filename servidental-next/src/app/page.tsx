import dynamic from 'next/dynamic';
import { Metadata } from 'next';

const Hero = dynamic(() => import('@/components/home/Hero'));
const ProductsSection = dynamic(() => import('@/components/home/ProductsSection'));
const YouTubeVideoSection = dynamic(() => import('@/components/home/YouTubeVideoSection'));
const ServicesSection = dynamic(() => import('@/components/home/ServicesSection'));
const BrandsSection = dynamic(() => import('@/components/home/BrandsSection'));
const Instagram = dynamic(() => import('@/components/home/instagram'));

export const metadata: Metadata = {
  title: 'ServiDental | Equipo Médico Dental Costa Rica',
  description: '18 años de experiencia en el mercado costarricense, ofrecemos soluciones efectivas para los problemas técnicos asociados con clínicas odontológicas.',
  openGraph: {
    title: 'ServiDental CR | Equipo Médico Dental',
    description: '18 años de experiencia en el mercado costarricense, ofrecemos soluciones efectivas para los problemas técnicos asociados con clínicas odontológicas.',
    url: 'https://servidentalcr.com/',
    siteName: 'ServiDental CR',
    locale: 'es_CR',
    type: 'website',
    images: [
      {
        url: '/android-chrome-512x512.png',
        width: 512,
        height: 512,
        alt: 'ServiDental CR Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ServiDental CR | Equipo Médico Dental',
    description: '18 años de experiencia en el mercado costarricense, ofrecemos soluciones efectivas para los problemas técnicos asociados con clínicas odontológicas.',
    images: ['/android-chrome-512x512.png'],
  },
};

export default function Home() {
  return (
    <>
      <Hero />
      <ProductsSection />
      <YouTubeVideoSection />
      <ServicesSection />
      <BrandsSection />
      <Instagram />
    </>
  );
}
