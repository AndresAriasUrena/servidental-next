import dynamic from 'next/dynamic';

const Hero = dynamic(() => import('@/components/home/Hero'));
const ProductsSection = dynamic(() => import('@/components/home/ProductsSection'));
const ServicesSection = dynamic(() => import('@/components/home/ServicesSection'));
const BrandsSection = dynamic(() => import('@/components/home/BrandsSection'));
const Instagram = dynamic(() => import('@/components/home/instagram'));

export default function Home() {
  return (
    <>
      <Hero />
      <ProductsSection />
      <ServicesSection />
      <BrandsSection />
      <Instagram />
    </>
  );
}
