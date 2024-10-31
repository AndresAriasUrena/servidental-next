// src/components/home/ProductsSection.tsx
'use client'
import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, PanInfo, useAnimation, useMotionValue } from 'framer-motion'
import assets from '@/assets'

const categories = [
  {
    id: 1,
    name: 'Unidades Dentales',
    description: 'Máximo confort y tecnología',
    image: assets.products.unidadesDentales.s30.default,
    // href: '/products?category=Unidades+Dentales', // Cambiado
    brand: assets.logos.brands.siger
  },
  {
    id: 2,
    name: 'Rayos X',
    description: 'Alta precisión diagnóstica',
    image: assets.products.rayosX.portatil[3],
    // href: '/products?category=Equipo+de+Rayos+X', // Cambiado
    brand: assets.logos.brands.siger
  },
  {
    id: 3,
    name: 'Fresadora',
    description: 'Tecnología CAD/CAM avanzada',
    image: assets.products.fresadora.images[1],
    // href: '/products?category=Fresadora', // Cambiado
    brand: assets.logos.brands.dof
  },
  {
    id: 4,
    name: 'Compresores',
    description: 'Rendimiento silencioso',
    image: assets.products.compresores.dc702,
    // href: '/products?category=Compresores', // Cambiado
    brand: assets.logos.brands.tpc
  },
  {
    id: 5,
    name: 'Autoclaves',
    description: 'Esterilización confiable',
    image: assets.products.esterilizadores.semiAuto,
    // href: '/products?category=Esterilización', // Cambiado
    brand: assets.logos.brands.sturdy
  },
  {
    id: 6,
    name: 'Scanner',
    description: 'Digitalización 3D precisa',
    image: assets.products.scanner.meyer,
    // href: '/products?category=Scanner', // Cambiado
    brand: assets.logos.brands.meyer
  }
] as const

// Duplicamos el array para crear un efecto infinito
const extendedCategories = [...categories, ...categories]

export default function ProductsSection() {
  const [isHovered, setIsHovered] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const controls = useAnimation()
  const containerRef = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const autoScrollRef = useRef<NodeJS.Timeout>()

  const startAutoScroll = () => {
    if (autoScrollRef.current) {
      clearInterval(autoScrollRef.current)
    }

    autoScrollRef.current = setInterval(() => {
      if (!isHovered && !isDragging) {
        const currentX = x.get()
        const nextX = currentX - 1
        
        // Reset position cuando llegue al final
        if (nextX <= -1920) { // Ajusta este valor según el ancho total
          x.set(0)
        } else {
          x.set(nextX)
        }
      }
    }, 16) // Aproximadamente 60fps
  }

  useEffect(() => {
    startAutoScroll()
    return () => {
      if (autoScrollRef.current) {
        clearInterval(autoScrollRef.current)
      }
    }
  }, [isHovered, isDragging])

  const handleDragStart = () => {
    setIsDragging(true)
  }

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    setIsDragging(false)
    // Añade inercia después del arrastre
    const velocity = info.velocity.x
    const currentX = x.get()
    
    x.set(currentX + velocity * 0.2)
    startAutoScroll()
  }

  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Nuestros Productos
          </h2>
          <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
            Contamos con una alta gama de productos de las marcas internacionales más destacadas.
          </p>
        </motion.div>

        <div 
          className="relative overflow-hidden touch-pan-x"
          ref={containerRef}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <motion.div 
            className="flex gap-6"
            style={{ x }}
            drag="x"
            dragConstraints={containerRef}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            dragElastic={0.1}
            dragMomentum={true}
          >
            {extendedCategories.map((product, index) => (
              <motion.div
                key={`${product.id}-${index}`}
                className="flex-none w-[280px]"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  {/* Brand logo */}
                  <div className="absolute top-2 left-2 z-10 bg-white p-1.5 rounded-lg shadow-sm">
                    <div className="relative h-6 w-16">
                      <Image
                        src={product.brand}
                        alt="Brand logo"
                        fill
                        sizes="64px"
                        className="object-contain"
                      />
                    </div>
                  </div>

                  {/* Product image */}
                  <div className="relative aspect-[4/3]">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="280px"
                      className="object-cover"
                    />
                  </div>

                  {/* Product info */}
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {product.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Gradient overlays */}
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-gray-50 to-transparent pointer-events-none z-10" />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-gray-50 to-transparent pointer-events-none z-10" />
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/products"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 transition-colors"
          >
            Ver catálogo completo
          </Link>
        </div>
      </div>
    </section>
  )
}