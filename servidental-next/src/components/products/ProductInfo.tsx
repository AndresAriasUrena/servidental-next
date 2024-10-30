'use client'

import Image from 'next/image'
import type { Product } from '@/types/product'
import { motion } from 'framer-motion'

interface ProductInfoProps {
  product: Product
}

export default function ProductInfo({ product }: ProductInfoProps) {
  return (
    <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
      {/* Encabezado */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">{product.name}</h1>
          {product.subtitle && (
            <p className="mt-1 text-sm text-gray-500">{product.subtitle}</p>
          )}
        </div>
        <Image
          src={product.brand.logo}
          alt={product.brand.name}
          width={120}
          height={48}
          className="w-auto h-12 object-contain"
          priority
        />
      </div>

      {/* Descripción */}
      <div className="mt-8">
        <h2 className="sr-only">Descripción del producto</h2>
        <div className="prose prose-blue max-w-none">
          <p className="text-gray-700">{product.description}</p>
        </div>
      </div>

      {/* Características */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-8"
      >
        <div className="border-t border-gray-200 pt-8">
          <h3 className="text-lg font-medium text-gray-900">
            {product.features.unique.title}
          </h3>
          <div className="mt-4 space-y-2">
            {product.features.unique.items.map((feature, index) => (
              <div key={index} className="flex items-center">
                <div className="mr-3 h-1.5 w-1.5 rounded-full bg-blue-600"></div>
                <p className="text-gray-600">{feature}</p>
              </div>
            ))}
          </div>
        </div>

        {product.features.general.items.length > 0 && (
          <div className="mt-8 border-t border-gray-200 pt-8">
            <h3 className="text-lg font-medium text-gray-900">
              {product.features.general.title}
            </h3>
            <div className="mt-4 space-y-2">
              {product.features.general.items.map((feature, index) => (
                <div key={index} className="flex items-center">
                  <div className="mr-3 h-1.5 w-1.5 rounded-full bg-blue-600"></div>
                  <p className="text-gray-600">{feature}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </motion.div>

      {/* Botones de acción */}
      <div className="mt-10 flex gap-4">
        <a
          href={`https://api.whatsapp.com/send?phone=50687045556&text=Hola, me interesa el producto ${product.name}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 rounded-md bg-blue-600 px-6 py-3 text-center text-base font-medium text-white hover:bg-blue-700"
        >
          Consultar por WhatsApp
        </a>
        <a
          href="tel:+50621016114"
          className="flex-1 rounded-md border border-blue-600 px-6 py-3 text-center text-base font-medium text-blue-600 hover:bg-blue-50"
        >
          Llamar ahora
        </a>
      </div>
    </div>
  )
}