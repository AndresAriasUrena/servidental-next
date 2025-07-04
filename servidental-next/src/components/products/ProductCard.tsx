'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import type { Product } from '@/types/product'
import { useSearchParams } from 'next/navigation'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const searchParams = useSearchParams()
  const currentCategory = searchParams.get('category')
  
  const productUrl = `/products/${product.slug}${currentCategory ? `?returnCategory=${encodeURIComponent(currentCategory)}` : ''}`

  // Verificar si es una unidad dental o el escáner específico
  const isExclusive = product.category === "Unidades Dentales" || 
                      product.slug === "Escaner-Intraoral-DL-300P-Coxo-Launca"

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden"
    >
      <Link href={productUrl}>
        <div className="relative">
          {/* Etiqueta Exclusivo */}
          {isExclusive && (
            <div className="absolute top-2 left-2 z-10 bg-red-600 text-white px-2 py-1 rounded-md text-xs font-bold">
              EXCLUSIVO
            </div>
          )}
          
          {/* Brand logo */}
          {product.brand?.logo && (
            <div className="absolute top-1 right-4 z-10 bg-white p-2 rounded-lg shadow-sm">
              <div className="relative h-6 w-16">
                <Image
                  src={product.brand.logo}
                  alt={product.brand?.name || 'Brand logo'}
                  fill
                  sizes="64px"
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          )}
          
          {/* Product image */}
          <div className="relative aspect-[4/3] w-full">
            {product.images?.[0]?.url && (
              <Image
                src={product.images[0].url}
                alt={product.images[0].alt || product.name}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                className="object-contain object-center group-hover:scale-105 transition-transform duration-300"
                priority
              />
            )}
          </div>
        </div>

        <div className="p-6">
          <div className="mb-4">
            <h3 className="text-xl font-semibold text-servi_dark">{product.name}</h3>
            {product.subtitle && (
              <p className="text-sm text-gray-500">{product.subtitle}</p>
            )}
          </div>

          <p className="text-gray-600 line-clamp-2 mb-4">{product.description}</p>

          <ul className="space-y-1 text-sm text-gray-500">
            {product.features?.unique?.items?.slice(0, 1).map((feature, index) => (
              <li key={index} className="flex items-center">
                <span className="min-h-1.5 min-w-1.5 bg-servi_green rounded-full mr-2"></span>
                {feature}
              </li>
            ))}
          </ul>

          <div className="mt-6 flex justify-end">
            <span className="text-servi_green font-medium hover:text-servi_dark transition-colors">
              Ver detalles →
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}