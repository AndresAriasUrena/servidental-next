'use client'

import { motion } from 'framer-motion'
import { 
  ShieldCheck, 
  Clock, 
  Lightbulb, 
  CheckCircle2, 
  Star, 
  Handshake 
} from 'lucide-react'

const values = [
  {
    title: 'Calidad',
    description: 'Nos comprometemos a brindar equipos y servicios con altos estándares de calidad, con soluciones duraderas que satisfacen las necesidades específicas de cada odontólogo y clínica.',
    icon: ShieldCheck
  },
  {
    title: 'Puntualidad',
    description: 'Entendemos la importancia del tiempo en la práctica odontológica. Nos comprometemos a entregar equipos y ofrecer servicio técnico en el momento preciso, con eficiencia y rapidez.',
    icon: Clock
  },
  {
    title: 'Innovación',
    description: 'Nos centramos en la búsqueda de alternativas, la actualización profesional y las capacitaciones para proporcionar un servicio y productos de excelente calidad.',
    icon: Lightbulb
  },
  {
    title: 'Seguridad',
    description: 'Priorizamos la seguridad de nuestros clientes mediante un acompañamiento completo en la instalación, mantenimiento y servicio de los equipos.',
    icon: CheckCircle2
  },
  {
    title: 'Honestidad',
    description: 'Actuamos con transparencia e integridad en cada una de nuestras interacciones. Ofrecemos soluciones claras y honestas para su práctica profesional.',
    icon: Handshake
  },
  {
    title: 'Excelencia',
    description: 'Proporcionamos excelencia desde la calidad de nuestros productos hasta en los servicios que ofrecemos. Buscamos superar las expectativas de nuestros clientes.',
    icon: Star
  }
]

export function ValuesSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2 
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-gray-900 text-center mb-12"
        >
          Nuestros Valores
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <motion.div 
              key={value.title}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.2 
              }}
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
              className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-all group"
            >
              <div className="flex flex-col items-center">
                <value.icon 
                  className="w-16 h-16 mb-4 text-servi_green group-hover:text-servi_dark transition-colors"
                />
                <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                  {value.title}
                </h3>
                <p className="text-gray-600 text-center">
                  {value.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}