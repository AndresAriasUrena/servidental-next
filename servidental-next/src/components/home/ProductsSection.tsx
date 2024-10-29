// src/components/home/ProductsSection.tsx
'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import assets from '@/assets'

const featuredProducts = [
  {
    id: 1,
    name: 'Unidades Dentales',
    image: assets.products.unidadesDentales.s30.default,
    href: '/products#unidades-dentales'
  },
  {
    id: 2,
    name: 'Fresadora',
    image: assets.products.fresadora.images[0],
    href: '/products#fresadora'
  },
  {
    id: 3,
    name: 'Rayos X',
    image: assets.products.rayosX.portatil[4],
    href: '/products#rayos-x'
  },
] as const

export default function ProductsSection() {
  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Nuestros Productos
          </h2>
          <p className="text-center text-gray-600 mb-12">
            Contamos con una alta gama de productos de las marcas internacionales
            más destacadas.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
          {featuredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative"
            >
              <div className="aspect-w-4 aspect-h-3 bg-white rounded-lg overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  className="object-center object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute inset-0 flex items-end p-6">
                  <h3 className="text-xl font-semibold text-white">{product.name}</h3>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/products"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 transition-colors"
          >
            Ver todos los productos
          </Link>
        </div>
      </div>
    </section>
  )
}