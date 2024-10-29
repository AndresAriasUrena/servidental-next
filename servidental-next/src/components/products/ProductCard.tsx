// src/components/products/ProductCard.tsx
'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import type { Product } from '@/types/product'

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden"
    >
      <Link href={`/products/${product.slug}`}>
        <div className="relative">
          {/* Brand logo */}
          <div className="absolute top-4 left-4 z-10 bg-white p-2 rounded-lg shadow-sm">
            <Image
              src={product.brand.logo}
              alt={product.brand.name}
              className="h-8 w-auto object-contain"
              width={80}
              height={32}
            />
          </div>
          
          {/* Product image */}
          <div className="aspect-w-4 aspect-h-3">
            <Image
              src={product.images[0].url}
              alt={product.images[0].alt}
              className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
              width={400}
              height={300}
            />
          </div>
        </div>

        <div className="p-6">
          {/* Product info */}
          <div className="mb-4">
            <h3 className="text-xl font-semibold text-gray-900">{product.name}</h3>
            {product.subtitle && (
              <p className="text-sm text-gray-500">{product.subtitle}</p>
            )}
          </div>

          {/* Product description */}
          <p className="text-gray-600 line-clamp-2 mb-4">
            {product.description}
          </p>

          {/* Main features preview */}
          <ul className="space-y-1 text-sm text-gray-500">
            {product.features.unique.items.slice(0, 3).map((feature, index) => (
              <li key={index} className="flex items-center">
                <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2"></span>
                {feature}
              </li>
            ))}
          </ul>

          {/* View details button */}
          <div className="mt-6 flex justify-end">
            <span className="text-blue-600 font-medium hover:text-blue-700 transition-colors">
              Ver detalles →
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}