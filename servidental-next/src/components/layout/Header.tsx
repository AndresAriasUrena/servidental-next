// src/components/layout/Header.tsx
'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { Facebook, Instagram, MessageCircle  } from 'lucide-react'
import { TbBrandYoutube } from "react-icons/tb";
import assets from '@/assets'

const navigation = [
  { name: 'INICIO', href: '/' },
  { name: 'NOSOTROS', href: '/about' },
  { name: 'EQUIPO MÉDICO', href: '/products' },
  { name: 'REPUESTOS', href: '/spare-parts' },
  { name: 'NUESTROS SERVICIOS', href: '/#services' },
  { name: 'CONTACTO', href: '/contact' },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="bg-white fixed z-30 w-full">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">ServiDental</span>
            <div className="relative h-12 w-[180px]">
              <Image
                src={assets.logos.main.default}
                alt="ServiDental Logo"
                fill
                sizes="180px"
                className="object-contain"
                priority
              />
            </div>
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-servi_green"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Abrir menú principal</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-semibold leading-6 text-gray-900 hover:text-servi_green transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end gap-1">
          <Link
            href="https://www.instagram.com/servidentalcr/?hl=es-la"
            target="_blank"
            className="text-sm font-semibold leading-6 text-pink-500 px-2 py-2 rounded-md hover:text-pink-700 transition-colors"
          >
            <Instagram className="w-7 h-7"/>
          </Link>
          <Link
            href="https://www.facebook.com/Servidentalcr"
            target="_blank"
            className="text-sm font-semibold leading-6 text-blue-500 px-2 py-2 rounded-md hover:text-blue-700 transition-colors"
          >
            <Facebook className="w-7 h-7"/>
          </Link>
          <Link
            href="https://api.whatsapp.com/send?phone=50687045556"
            target="_blank"
            className="text-sm font-semibold leading-6 text-green-500 px-2 py-2 rounded-md hover:text-green-700 transition-colors"
          >
            <MessageCircle className="w-7 h-7"/>
          </Link>
          <Link
            href="https://www.youtube.com/@ServiDentalCR"
            target="_blank"
            className="text-sm font-semibold leading-6 text-red-500 px-2 py-2 rounded-md hover:text-red-700 transition-colors"
          >
            <TbBrandYoutube className="w-7 h-7"/>
          </Link>
        </div>
      </nav>
      
      {/* Mobile menu */}
      <div className={`lg:hidden ${mobileMenuOpen ? 'fixed inset-0 z-50' : 'hidden'}`}>
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" onClick={() => setMobileMenuOpen(false)} />
        <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">ServiDental</span>
              <div className="relative h-8 w-[120px]">
                <Image
                  src={assets.logos.main.default}
                  alt="ServiDental Logo"
                  fill
                  sizes="120px"
                  className="object-contain"
                  priority
                />
              </div>
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-servi_dark"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Cerrar menú</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              <div className="py-6">
                <Link
                  href="https://api.whatsapp.com/send?phone=50687045556"
                  target="_blank"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-white bg-green-600 text-center hover:bg-green-700"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  WhatsApp
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}