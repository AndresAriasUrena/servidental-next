// src/app/products/page.tsx
import { Metadata } from 'next'
import { products } from '@/data/manual-products'
import ProductsGrid from '@/components/products/ProductsGrid'

export const metadata: Metadata = {
  title: 'Productos | ServiDental',
  description: 'Explora nuestra amplia gama de equipos médicos dentales de las marcas más reconocidas.',
}

export default function ProductsPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-servi_green to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Nuestros Productos
            </h1>
            <p className="mt-6 text-lg leading-8 max-w-2xl mx-auto">
              Contamos con una alta gama de productos de las marcas internacionales
              más destacadas. Ofrecemos soluciones completas para su clínica dental.
            </p>
          </div>
        </div>
      </section>

      {/* Products Grid Section */}
      <section className="bg-gray-100">
        <ProductsGrid products={products} />
      </section>
    </>
  )
}