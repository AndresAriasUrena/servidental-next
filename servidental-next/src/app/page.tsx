// src/app/page.tsx
import Hero from '@/components/home/Hero'
import ProductsSection from '@/components/home/ProductsSection'
import ServicesSection from '@/components/home/ServicesSection'
import BrandsSection from '@/components/home/BrandsSection'

export default function Home() {
  return (
    <>
      <Hero />
      <ProductsSection />
      <ServicesSection />
      <BrandsSection />
      
    </>
  )
}