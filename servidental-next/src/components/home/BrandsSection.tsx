// src/components/home/BrandsSection.tsx
'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import assets from '@/assets'

const brandLogos = Object.entries(assets.logos.brands)

// Mapeo de nombres de marcas a slugs para URLs
const brandSlugs: Record<string, string> = {
  bioart: 'bioart',
  coxo: 'coxo',
  dof: 'dof',
  meyer: 'meyer',
  microNx: 'micro-nx',
  siger: 'siger',
  sturdy: 'sturdy',
  tpc: 'tpc',
  xpectVision: 'xpect-vision',
  elec: 'elec',
  dentech: 'dentech',
  dentafilm: 'dentafilm',
  epdent: 'epdent',
  mdmed: 'mdmed',
  launca: 'launca',
  dimed: 'dimed',
  artelectron: 'art-electron',
  fame: 'fame',
  whitebrand: 'white-brand'
}

export default function BrandsSection() {
  return (
    <section className="bg-gradient-to-b from-gray-50 to-white py-4 md:py-6 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-3 md:mb-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-xl md:text-2xl font-bold text-gray-900">
            NUESTRAS MARCAS
          </h2>
          <p className="text-xs md:text-sm text-gray-600 mt-1">
            Trabajamos con las mejores marcas del mercado
          </p>
        </motion.div>
      </div>

      {/* Fila única de logos - Animación de izquierda a derecha */}
      <div className="relative">
        <div className="flex animate-scroll-left">
          {/* Duplicamos los logos 3 veces para efecto infinito suave */}
          {[...brandLogos, ...brandLogos, ...brandLogos].map(([name, logo], index) => {
            const brandSlug = brandSlugs[name] || name.toLowerCase();
            return (
              <Link
                key={`logo-${name}-${index}`}
                href={`/tienda/marca/${brandSlug}`}
                className="flex-shrink-0 w-[90px] h-[45px] md:w-[110px] md:h-[55px] mx-2.5 md:mx-4 relative group"
              >
                <div className="relative w-full h-full transition-all duration-300 group-hover:scale-110 group-hover:-translate-y-2 cursor-pointer">
                  <Image
                    src={logo}
                    alt={`Logo ${name}`}
                    className="object-contain drop-shadow-md group-hover:drop-shadow-xl"
                    fill
                    sizes="(max-width: 768px) 90px, 110px"
                  />
                </div>
              </Link>
            );
          })}
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

        .animate-scroll-left {
          animation: scroll-left 20s linear infinite;
        }

        /* Velocidad más lenta en desktop */
        @media (min-width: 768px) {
          .animate-scroll-left {
            animation: scroll-left 40s linear infinite;
          }
        }

        /* Pausar animación al hacer hover solo en desktop */
        @media (min-width: 768px) {
          .animate-scroll-left:hover {
            animation-play-state: paused;
          }
        }
      `}</style>
    </section>
  )
}