// src/components/home/ProductsSection.tsx
'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import assets from '@/assets'

const categories = [
  {
    id: 1,
    name: 'Escáner intraoral DL-300P, Coxo, Launca',
    description: 'Alámbrico',
    image: assets.products.scanner.EscanerIntraoralDL300PCoxoLaunca.default,
    // href: '/products?category=Scanner', // Cambiado
    brand: assets.logos.brands.coxo 
  },
  {
    id: 2,
    name: 'Microarenador Standar Microblaster"',
    description: 'Rápido y fácil de usar',
    image: assets.products.pulidoras.MicroarenadorStandarMicroblaster.default,
    // href: '/products?category=Fresadora', // Cambiado
    brand: assets.logos.brands.bioart
  },
  {
    id: 3,
    name: 'Lavadora ultrasónica BioWhash',
    description: 'Optimiza y acelera el proceso de lavado',
    image: assets.products.lavadoraUltrasonido.LavadoraUltrasonicaBioWhash.default,
    // href: '/products?category=Compresores', // Cambiado
    brand: assets.logos.brands.bioart
  },
  {
    id: 4,
    name: 'Carro-movil-multifuncional',
    description: 'Diseño minimalista',
    image: assets.products.Mobiliario.CarroMovilMultifuncional.default,
    // href: '/products?category=Esterilización', // Cambiado
    brand: assets.logos.brands.siger//CAMBIAR ESTO!!!
  },
  {
    id: 5,
    name: 'Pulidora dental por aire CP-1',
    description: 'Pieza de mano de alto rendimiento',
    image: assets.products.pulidoras.PulidoraDentalPorAireCP.default,
    // href: '/products?category=Equipo+de+Rayos+X', // Cambiado
    brand: assets.logos.brands.coxo
  },
  {
    id: 6,
    name: "Motor de cirugía C-Puma-Master",
    description: "Rotación precisa y estable",
    image: assets.products.MotoresDeCirugias.MotorDeCirugiaCPumaMaster.default,
    brand: assets.logos.brands.coxo 
  },
]

// Duplicamos las categorías para el efecto infinito
const extendedCategories = [...categories, ...categories, ...categories]

export default function ProductsSection() {
  const [currentIndex, setCurrentIndex] = useState<number>(categories.length)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const nextSlide = () => {
    setCurrentIndex((prevIndex: number) => {
      const next = prevIndex + 1
      // Si llegamos al final del set duplicado, volvemos al set del medio
      if (next >= categories.length * 2) {
        return categories.length
      }
      return next
    })
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex: number) => {
      const prev = prevIndex - 1
      // Si llegamos al inicio del set duplicado, volvemos al set del medio
      if (prev < 0) {
        return categories.length - 1
      }
      return prev
    })
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index + categories.length)
  }

  useEffect(() => {
    if (!isAutoPlaying) return

    const timer = setInterval(() => {
      nextSlide()
    }, 3000)

    return () => clearInterval(timer)
  }, [isAutoPlaying])

  // Normaliza el índice para los indicadores
  const normalizedIndex = currentIndex % categories.length
  
  const [slideTransform, setSlideTransform] = useState<string>('0%')

  // Función para calcular el desplazamiento según el viewport
  const getSlideTransform = (): string => {
    if (typeof window === 'undefined') return '0%';
    
    // En móvil (menos de 640px)
    if (window.innerWidth < 640) {
      return `-${currentIndex * 100}%`;
    }
    // En tablet (menos de 1024px)
    else if (window.innerWidth < 1024) {
      return `-${currentIndex * 50}%`;
    }
    // En desktop
    return `-${currentIndex * (100/3)}%`;
  }

useEffect(() => {
  const updateTransform = () => {
    setSlideTransform(getSlideTransform());
  }

  // Actualizar en el montaje y al cambiar el tamaño de la ventana
  updateTransform();
  window.addEventListener('resize', updateTransform);

  return () => window.removeEventListener('resize', updateTransform);
}, [currentIndex]);


  return (
    <section className="bg-white py-16">
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
          className="relative"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          <div className="overflow-hidden">
            <motion.div 
              className="flex"
              animate={{
                x: slideTransform
              }}
              transition={{
                duration: 0.5,
                ease: "easeInOut"
              }}
            >
              {extendedCategories.map((product, index) => (
                <motion.div
                  key={`${product.id}-${index}`}
                  className="flex-none w-full sm:w-1/2 lg:w-1/3 px-4"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="h-full bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                    {/* Brand logo */}
                    <div className="absolute top-2 right-6 z-10 bg-white p-1.5 rounded-lg shadow-sm">
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
                    <div className="relative aspect-[16/12] p-2">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-contain"
                        priority
                      />
                    </div>

                    {/* Product info */}
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 text-lg">
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
          </div>

          {/* Navigation arrows */}
          <div className="absolute -bottom-12 left-0 right-0 flex justify-center items-center gap-4">
            <button
              onClick={() => {
                prevSlide()
                setIsAutoPlaying(false)
              }}
              className="bg-white/80 hover:bg-white p-2 rounded-full text-gray-800 hover:text-gray-900 transition-colors shadow-sm"
              aria-label="Anterior"
            >
              <ChevronLeft size={20} />
            </button>

            {/* Dots Indicator */}
            <div className="flex gap-2">
              {categories.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    goToSlide(index)
                    setIsAutoPlaying(false)
                  }}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === normalizedIndex ? "bg-servi_green w-4" : "bg-gray-300"
                  }`}
                  aria-label={`Ir a slide ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={() => {
                nextSlide()
                setIsAutoPlaying(false)
              }}
              className="bg-white/80 hover:bg-white p-2 rounded-full text-gray-800 hover:text-gray-900 transition-colors shadow-sm"
              aria-label="Siguiente"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div className="mt-24 text-center">
          <Link
            href="/products"
            className="inline-block bg-servi_green text-white px-8 py-3 rounded-md hover:bg-servi_dark transition-colors"
          >
            Ver catálogo completo
          </Link>
        </div>
      </div>
    </section>
  )
}