// src/components/home/ServicesSection.tsx
'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import assets from '@/assets'

const services = [
  {
    title: 'Instalaciones',
    description: 'El proceso de instalación es llevado a cabo por nuestro personal altamente calificado, siguiendo los mas altos estándares de calidad.',
    image: assets.services.instalaciones
  },
  {
    title: 'Mantenimientos',
    description: 'Contamos con planes de manteminiento preventivo y correctivo, realizados por nuestro personal certificado acorde a los requerimientos del fabricante.',
    image: assets.services.mantenimientos
  },
  {
    title: 'Calibraciones',
    description: 'Al ser distribuidores nacionales, contamos con líneas de comunicación directa con los fabricantes, manteniendonos al día en las ultimas actualizaciones de software.',
    image: assets.services.calibraciones
  },
] as const

export default function ServicesSection() {
  return (
    <section className="bg-white py-16">
      {/* El resto del componente permanece igual */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service, index) => (
          <motion.div
            key={service.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-gray-50 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="aspect-w-16 aspect-h-9 relative">
              <Image
                src={service.image}
                alt={service.title}
                className="object-cover"
              />
            </div>
            {/* ... resto del código ... */}
          </motion.div>
        ))}
      </div>
    </section>
  )
}