// src/components/home/BrandsSection.tsx
'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import assets from '@/assets'

const brandLogos = Object.entries(assets.logos.brands)

// Dividir logos en dos filas
const row1Logos = brandLogos.slice(0, Math.ceil(brandLogos.length / 2))
const row2Logos = brandLogos.slice(Math.ceil(brandLogos.length / 2))

export default function BrandsSection() {
  return (
    <section className="bg-gradient-to-b from-gray-50 to-white py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold text-gray-900">
            NUESTRAS MARCAS
          </h2>
          <p className="text-gray-600 mt-2">
            Trabajamos con las mejores marcas del mercado
          </p>
        </motion.div>
      </div>

      {/* Fila 1 - Animación de izquierda a derecha */}
      <div className="relative mb-8">
        <div className="flex animate-scroll-left">
          {/* Duplicamos los logos 3 veces para efecto infinito suave */}
          {[...row1Logos, ...row1Logos, ...row1Logos].map(([name, logo], index) => (
            <div
              key={`row1-${name}-${index}`}
              className="flex-shrink-0 w-[200px] h-[100px] mx-8 relative group"
            >
              <div className="relative w-full h-full transition-all duration-300 group-hover:scale-110 group-hover:-translate-y-2">
                <Image
                  src={logo}
                  alt={`Logo ${name}`}
                  className="object-contain drop-shadow-md group-hover:drop-shadow-xl"
                  fill
                  sizes="200px"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fila 2 - Animación de derecha a izquierda (dirección opuesta) */}
      <div className="relative">
        <div className="flex animate-scroll-right">
          {/* Duplicamos los logos 3 veces para efecto infinito suave */}
          {[...row2Logos, ...row2Logos, ...row2Logos].map(([name, logo], index) => (
            <div
              key={`row2-${name}-${index}`}
              className="flex-shrink-0 w-[200px] h-[100px] mx-8 relative group"
            >
              <div className="relative w-full h-full transition-all duration-300 group-hover:scale-110 group-hover:-translate-y-2">
                <Image
                  src={logo}
                  alt={`Logo ${name}`}
                  className="object-contain drop-shadow-md group-hover:drop-shadow-xl"
                  fill
                  sizes="200px"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Estilos CSS para las animaciones */}
      <style jsx>{`
        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }

        @keyframes scroll-right {
          0% {
            transform: translateX(-33.333%);
          }
          100% {
            transform: translateX(0);
          }
        }

        .animate-scroll-left {
          animation: scroll-left 30s linear infinite;
        }

        .animate-scroll-right {
          animation: scroll-right 30s linear infinite;
        }

        /* Pausar animación al hacer hover */
        .animate-scroll-left:hover,
        .animate-scroll-right:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  )
}