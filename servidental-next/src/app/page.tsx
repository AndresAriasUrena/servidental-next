import dynamic from 'next/dynamic';

const Hero = dynamic(() => import('@/components/home/Hero'));
const ProductsSection = dynamic(() => import('@/components/home/ProductsSection'));
const YouTubeVideoSection = dynamic(() => import('@/components/home/YouTubeVideoSection'));
const ServicesSection = dynamic(() => import('@/components/home/ServicesSection'));
const BrandsSection = dynamic(() => import('@/components/home/BrandsSection'));
const Instagram = dynamic(() => import('@/components/home/instagram'));

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
