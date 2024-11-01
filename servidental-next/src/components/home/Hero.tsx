'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-hero_bg bg-cover bg-center bg-no-repeat">
      {/* Overlay oscuro para mejor legibilidad */}
      <div className="absolute inset-0"></div>
      
      <div className="relative z-10 h-full">
        <div className="flex min-h-screen items-center justify-center px-4 py-16 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center max-w-3xl mx-auto flex flex-col gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl sm:text-5xl md:text-6xl tracking-tight font-bold text-gray-50 space-y-2">
              <span className="block">Profesionales en</span>
              <span className="block text-white">Equipo Médico</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-white max-w-2xl mx-auto leading-relaxed">
              Más de 16 años de experiencia en el mercado costarricense, ofrecemos 
              soluciones efectivas para los problemas técnicos asociados con clínicas 
              odontológicas.
            </p>
            <div className="mt-8 sm:mt-10">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-3 text-base sm:text-lg font-medium text-white bg-servi_green hover:bg-servi_dark transition-colors duration-300 rounded-md shadow-lg"
              >
                Visítenos para saber más
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}