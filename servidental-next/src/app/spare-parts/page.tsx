// src/app/products/page.tsx
import { Metadata } from 'next'
import { spareParts } from '@/data/manual-SpareParts'
import SparePartsGrid from '@/components/spareParts/SparePartsGrid2'

export const metadata: Metadata = {
  title: 'Repuestos | ServiDental',
  description: 'Explora nuestra amplia gama de repuestos para equipos médicos dentales de las marcas más reconocidas.',
}

export default function SparePartsPage() {
  return (
    <>
      <section className="bg-gradient-to-r from-gradient_gray to-gradient_green text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Nuestros Repuestos
            </h1>
            <p className="mt-6 text-lg leading-8 max-w-2xl mx-auto">
            Explora nuestra amplia gama de repuestos para equipos médicos dentales de las marcas más reconocidas.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-gray-100">
        <SparePartsGrid spareParts={spareParts} />
      </section>
    </>
  )
}