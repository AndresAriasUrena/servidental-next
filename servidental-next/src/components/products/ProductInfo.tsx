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
          className="w-auto min-h-6 md:min-h-14 max-h-14 object-contain"
          priority
        />
        {product.brand2 && (
            <Image
              src={product.brand2.logo}
              alt={product.brand2.name}
              width={120}
              height={48}
              className="w-auto min-h-4 md:min-h-4 max-h-4 object-contain"
              priority
            />
          )}
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
                <div className="mr-3 min-h-1.5 min-w-1.5 rounded-full bg-servi_green"></div>
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
                  <div className="mr-3 min-h-1.5 min-w-1.5 rounded-full bg-servi_green"></div>
                  <p className="text-gray-600">{feature}</p>
                </div>
              ))}
            </div>
          </div>
        )}


        {/* Incluye */}
        {(product.features.includes?.items ?? []).length > 0 && (
          <div className="mt-8 border-t border-gray-200 pt-8">
            <h3 className="text-lg font-medium text-gray-900">{product.features.includes?.title}</h3>
            <div className="mt-4 space-y-2">
              {product.features.includes?.items.map((item, index) => (
                <div key={index} className="flex items-center">
                  <div className="mr-3 min-h-1.5 min-w-1.5 rounded-full bg-servi_green"></div>
                  <p className="text-gray-600">{item}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Opcional */}
        {(product.features.optional?.items ?? []).length > 0 && (
          <div className="mt-8 border-t border-gray-200 pt-8">
            <h3 className="text-lg font-medium text-gray-900">{product.features.optional?.title ?? 'Puede incorporar (consultar el valor)'}</h3>
            <div className="mt-4 space-y-2">
              {product.features.optional?.items.map((item, index) => (
                <div key={index} className="flex items-center">
                  <div className="mr-3 min-h-1.5 min-w-1.5 rounded-full bg-servi_green"></div>
                  <p className="text-gray-600">{item}</p>
                </div>
              ))}
            </div>
          </div>
        )}

{(product.features.additional?.items ?? []).length > 0 && (
          <div className="mt-8 border-t border-gray-200 pt-8">
            <h3 className="text-lg font-medium text-gray-900">{product.features.additional?.title ?? 'Puede incorporar (consultar el valor)'}</h3>
            <div className="mt-4 space-y-2">
              {product.features.additional?.items.map((item, index) => (
                <div key={index} className="flex items-center">
                  <div className="mr-3 min-h-1.5 min-w-1.5 rounded-full bg-servi_green"></div>
                  <p className="text-gray-600">{item}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Videos del producto */}
        {product.videoIframes && product.videoIframes.length > 0 && (
          <div className="mt-8">
            <h3 className="text-lg font-medium text-gray-900">Videos del producto</h3>
            <div className="mt-4">
              {product.videoIframes.map((video, index) => (
                <div key={index} className="aspect-w-16 mt-2 aspect-h-9">
                  <div
                    dangerouslySetInnerHTML={{ __html: video }}
                    className="iframe-container"
                  />
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
          className="flex-1 rounded-md bg-servi_green px-6 py-3 text-center text-base font-medium text-white hover:bg-servi_dark"
        >
          Consultar por WhatsApp
        </a>
        <a
          href="tel:+50621016114"
          className="flex-1 rounded-md border border-servi_green px-6 py-3 text-center text-base font-medium text-servi_green hover:bg-blue-50"
        >
          Llamar ahora
        </a>
      </div>
    </div>
  )
}