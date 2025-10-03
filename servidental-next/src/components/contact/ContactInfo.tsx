'use client'

import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'
import { TbBrandTiktok } from "react-icons/tb";
import { TbBrandWaze } from "react-icons/tb";
import { TbBrandInstagram } from "react-icons/tb";
import { TbBrandFacebook } from "react-icons/tb";
import { TbBrandWhatsapp } from "react-icons/tb";
import { TbBrandYoutube } from "react-icons/tb";

interface ContactItem {
    icon: React.ComponentType<{ className?: string }>;
    title: string;
    content: string;
    href?: string;
  }
  
  const contactInfo: ContactItem[] = [
    {
      icon: Phone,
      title: 'Teléfono',
      content: '(+506) 2101-6114',
      href: 'tel:+50621016114',
    },
    {
      icon: Mail,
      title: 'Correo electrónico',
      content: 'info@servidentalcr.com',
      href: 'mailto:info@servidentalcr.com',
    },
    {
      icon: MapPin,
      title: 'Dirección',
      content: 'Del Banco Nacional de San Pedro, 450m Sur y 25m Este, Montes de Oca, San Jose',
      href: 'https://waze.com/ul/hd1u0rr6e1',
    },
    {
      icon: Clock,
      title: 'Horario',
      content: 'Lunes a Viernes, 8:00am a 5:00pm',
    },
  ]

export default function ContactInfo() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="space-y-8"
    >
      <h2 className="text-2xl font-bold text-gray-900">Información de contacto</h2>
      
      <div className="space-y-6">
        {contactInfo.map((info) => (
          <div key={info.title} className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <info.icon className="h-6 w-6 text-servi_green" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900">{info.title}</h3>
              {info.href ? (
                <a
                  href={info.href}
                  target={info.href.startsWith('http') ? '_blank' : undefined}
                  rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="text-gray-600 hover:text-servi_green transition-colors"
                >
                  {info.content}
                </a>
              ) : (
                <p className="text-gray-600">{info.content}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="pt-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Redes sociales</h3>
        <div className="flex space-x-4">
          <a
            href="https://www.facebook.com/Servidentalcr"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-servi_green transition-colors"
            aria-label="Facebook"
          >
            <TbBrandFacebook className="h-7 w-7"/>
          </a>

          <a
            href="https://www.instagram.com/servidentalcr/?hl=es-la"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-rose-500 transition-colors"
            aria-label="Instagram"
          >
          <TbBrandInstagram className="h-7 w-7"/>
          </a>

          <a
            href="https://api.whatsapp.com/send?phone=50621016114"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-green-500 transition-colors"
            aria-label="WhatsApp"
          >
           <TbBrandWhatsapp className="h-7 w-7"/>
          </a>

          <a
            href="https://waze.com/ul/hd1u0rr6e1"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-blue-500 transition-colors"
            aria-label="Waze"
          >
           <TbBrandWaze className="h-7 w-7"/>
          </a>
          <a
            href="https://api.whatsapp.com/send?phone=50621016114"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-purple-500 transition-colors"
            aria-label="WhatsApp"
          >
            <TbBrandTiktok className="h-7 w-7" />
         </a>
         <a
            href="https://www.youtube.com/@ServiDentalCR"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-red-500 transition-colors"
            aria-label="WhatsApp"
          >
            <TbBrandYoutube className="h-7 w-7" />
         </a>
          
        </div>
      </div>

      <div className="pt-8 border-t border-gray-200">
        <p className="text-sm text-gray-600">
          Para consultas inmediatas, puede contactarnos a través de WhatsApp o llamarnos directamente.
          Nuestro equipo estará encantado de ayudarle con cualquier consulta sobre equipos dentales,
          mantenimiento o servicios técnicos.
        </p>
      </div>
    </motion.div>
  )
}