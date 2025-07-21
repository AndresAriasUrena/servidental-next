// src/components/layout/Footer.tsx
'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Facebook, Instagram, MessageCircleMore} from 'lucide-react'
import { TbBrandTiktok } from "react-icons/tb";
import { TbBrandWaze } from "react-icons/tb";
import { TbBrandYoutube } from "react-icons/tb";

import assets from '@/assets'

const socialLinks = [
  {
    name: 'Facebook',
    href: 'https://www.facebook.com/Servidentalcr',
    icon: Facebook,
  },
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/servidentalcr/?hl=es-la',
    icon: Instagram,
  },
  {
    name: 'WhatsApp',
    href: 'https://api.whatsapp.com/send?phone=50687045556',
    icon: MessageCircleMore,
  },
  {
    name: 'Waze',
    href: 'https://waze.com/ul/hd1u0rr6e1',
    icon: TbBrandWaze,
  },
  {
    name: 'Tiktok',
    href: 'https://www.tiktok.com/@servidentalcr',
    icon: TbBrandTiktok,
  },
  {
    name: 'YouTube',
    href: 'https://www.youtube.com/@ServiDentalCR',
    icon: TbBrandYoutube,
  },
] as const

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Acerca de nosotros */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="col-span-1 lg:col-span-2"
          >
            <h4 className="text-lg font-semibold mb-4">Acerca de nosotros</h4>
            <p className="text-gray-400 mb-6">
              Nuestra larga trayectoria, combinada con una capacidad técnica destacada
              en el mercado, nos hace la elección de más de 800 clínicas de odontología
              cuando buscan un socio experto.
            </p>
            {/* Social Icons */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label={social.name}
                >
                  <social.icon className="w-6 h-6" />
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Certificaciones */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="col-span-1"
          >
            <h4 className="text-lg font-semibold mb-4">Certificaciones</h4>
            <div className="relative w-32 h-16 mb-4">
              <Image
                src={assets.logos.main.pymeCostaRica}
                alt="PYME Costa Rica"
                fill
                sizes="128px"
                className="object-contain"
              />
            </div>
            
            {/* Enlaces Legales */}
            <h4 className="text-lg font-semibold mb-4 mt-8">Legal</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link 
                  href="/privacy-policy" 
                  className="hover:text-white transition-colors"
                >
                  Políticas de Privacidad
                </Link>
              </li>
              <li>
                <Link 
                  href="/terms-conditions" 
                  className="hover:text-white transition-colors"
                >
                  Términos y Condiciones
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Contacto */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="col-span-1"
          >
            <h4 className="text-lg font-semibold mb-4">Contacto</h4>
            <div className="space-y-2 text-gray-400">
              <p>Del Banco Nacional de San Pedro,</p>
              <p>450m Sur y 25m Este</p>
              <p>Montes de Oca, San Jose</p>
              <p className="pt-2">(+506) 2101-6114</p>
              <p>info@servidentalcr.com</p>
            </div>
          </motion.div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm text-center md:text-left">
              <p>Copyright © {new Date().getFullYear()} ServiDentalCR. Todos los derechos reservados.</p>
              <p className="mt-1">
                <Link href="/privacy-policy" className="hover:text-white transition-colors">Políticas de Privacidad</Link>
                {' | '}
                <Link href="/terms-conditions" className="hover:text-white transition-colors">Términos y Condiciones</Link>
              </p>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <span>Diseño y Desarrollo Web:</span>
              <Link
                href="https://www.aurigital.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block"
              >
                <div className="relative h-8 w-[120px]">
                  <Image
                    src={assets.logos.main.aurigital}
                    alt="Aurigital"
                    fill
                    sizes="120px"
                    className="object-contain"
                  />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}