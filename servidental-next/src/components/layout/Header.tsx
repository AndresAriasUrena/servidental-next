// src/components/layout/Header.tsx
'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { Facebook, Instagram, MessageCircle, ShoppingCart, CheckCircle } from 'lucide-react'
import { TbBrandYoutube } from "react-icons/tb"
import assets from '@/assets'
import MiniCart from '@/components/ecommerce/cart/MiniCart'
import { useCart } from '@/hooks/useCart'

const navigation = [
  { name: 'INICIO', href: '/' },
  { name: 'NOSOTROS', href: '/about' },
  { name: 'SERVICIOS', href: '/#services' },
  { name: 'EQUIPOS', href: '/products' },
  { name: 'TIENDA', href: '/tienda' },
  { name: 'REPUESTOS', href: '/spare-parts' },
  { name: 'BLOG', href: '/blog' },
  { name: 'CONTACTO', href: '/contact' },
]

const socialLinks = [
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/servidentalcr/?hl=es-la',
    icon: Instagram,
    color: 'text-pink-500 hover:text-pink-600'
  },
  {
    name: 'Facebook',
    href: 'https://www.facebook.com/Servidentalcr',
    icon: Facebook,
    color: 'text-blue-500 hover:text-blue-600'
  },
  {
    name: 'YouTube',
    href: 'https://www.youtube.com/@ServiDentalCR',
    icon: TbBrandYoutube,
    color: 'text-red-500 hover:text-red-600'
  }
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showMiniCart, setShowMiniCart] = useState(false)
  const cartState = useCart()
  const totalQuantity = cartState.cart.totalQuantity
  const justAdded = false

  return (
    <header className="bg-white fixed z-30 w-full shadow-sm">

      {/* Top bar with social icons - hidden on mobile */}
      <div className="hidden lg:block bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-end items-center py-2 space-x-4">
            <span className="text-sm text-gray-600 mr-4">Síguenos:</span>
            {socialLinks.map((social) => {
              const IconComponent = social.icon
              return (
                <Link
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${social.color} transition-colors p-1`}
                  aria-label={social.name}
                >
                  <IconComponent className="w-5 h-5" />
                </Link>
              )
            })}
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <nav className="max-w-7xl mx-auto flex items-center justify-between p-4 lg:px-8" aria-label="Global">
        {/* Logo */}
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">ServiDental</span>
            <div className="relative h-10 w-[160px] lg:h-12 lg:w-[180px]">
              <Image
                src={assets.logos.main.default}
                alt="ServiDental Logo"
                fill
                sizes="(max-width: 1024px) 160px, 180px"
                className="object-contain"
                priority
              />
            </div>
          </Link>
        </div>

        {/* Mobile cart and menu buttons */}
        <div className="flex items-center gap-2 lg:hidden">
          {/* Mobile Cart Button */}
          <div className="relative">
            <button
              type="button"
              className={`-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-servi_green hover:bg-gray-50 transition-all duration-200 ${justAdded ? 'animate-bounce' : ''}`}
              onClick={() => setShowMiniCart(!showMiniCart)}
            >
              <span className="sr-only">Abrir carrito</span>
              <ShoppingCart className="h-6 w-6" aria-hidden="true" />
              {totalQuantity > 0 && (
                <span className={`absolute -top-1 -right-1 bg-servi_green text-white text-xs rounded-full h-5 w-5 flex items-center justify-center transition-all duration-300 ${justAdded ? 'animate-pulse scale-125' : ''}`}>
                  {totalQuantity}
                </span>
              )}
              {justAdded && (
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-servi_green/30 rounded-full animate-ping"></div>
              )}
            </button>
            {showMiniCart && (
              <div className="absolute right-0 top-12 z-50">
                <MiniCart onClose={() => setShowMiniCart(false)} />
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-servi_green hover:bg-gray-50"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Abrir menú principal</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        {/* Desktop navigation */}
        <div className="hidden lg:flex lg:gap-x-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-medium leading-6 text-gray-700 hover:text-servi_green transition-colors py-2 px-1 border-b-2 border-transparent hover:border-servi_green"
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Desktop Cart and CTA */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:items-center lg:gap-4">
          {/* Desktop Cart Button */}
          <div className="relative">
            <button
              type="button"
              className={`relative p-2 text-gray-700 hover:text-servi_green transition-all duration-200 ${justAdded ? 'animate-bounce' : ''}`}
              onClick={() => setShowMiniCart(!showMiniCart)}
            >
              <span className="sr-only">Abrir carrito</span>
              <ShoppingCart className="h-6 w-6" />
              {totalQuantity > 0 && (
                <span className={`absolute -top-1 -right-1 bg-servi_green text-white text-xs rounded-full h-5 w-5 flex items-center justify-center transition-all duration-300 ${justAdded ? 'animate-pulse scale-125' : ''}`}>
                  {totalQuantity}
                </span>
              )}
              {justAdded && (
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-servi_green/30 rounded-full animate-ping"></div>
              )}
            </button>
            {showMiniCart && (
              <div className="absolute right-0 top-12 z-50">
                <MiniCart onClose={() => setShowMiniCart(false)} />
              </div>
            )}
          </div>

          {/* WhatsApp CTA */}
          <Link
            href="https://api.whatsapp.com/send?phone=50687045556"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-servi_green text-white px-4 py-2 rounded-lg hover:bg-servi_dark transition-colors font-medium text-sm"
          >
            <MessageCircle className="w-4 h-4" />
            WhatsApp
          </Link>
        </div>
      </nav>
      
      {/* Mobile menu */}
      <div className={`lg:hidden ${mobileMenuOpen ? 'fixed inset-0 z-50' : 'hidden'}`}>
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" onClick={() => setMobileMenuOpen(false)} />
        <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          {/* Mobile menu header */}
          <div className="flex items-center justify-between">
            <Link href="/" className="-m-1.5 p-1.5" onClick={() => setMobileMenuOpen(false)}>
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
              className="-m-2.5 rounded-md p-2.5 text-servi_dark hover:bg-gray-50"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Cerrar menú</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          {/* Mobile menu content */}
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              {/* Navigation links */}
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="-mx-3 block rounded-lg px-3 py-3 text-base font-medium leading-7 text-gray-900 hover:bg-gray-50 hover:text-servi_green transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              {/* Mobile CTA and social */}
              <div className="py-6 space-y-4">
                <Link
                  href="https://api.whatsapp.com/send?phone=50687045556"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full bg-servi_green text-white px-4 py-3 rounded-lg hover:bg-servi_dark transition-colors font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <MessageCircle className="w-5 h-5" />
                  Contactar por WhatsApp
                </Link>

                {/* Mobile social links */}
                <div className="border-t border-gray-200 pt-4">
                  <p className="text-sm text-gray-600 mb-3 text-center">Síguenos en redes sociales:</p>
                  <div className="flex justify-center space-x-6">
                    {socialLinks.map((social) => {
                      const IconComponent = social.icon
                      return (
                        <Link
                          key={social.name}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`${social.color} transition-colors p-2`}
                          onClick={() => setMobileMenuOpen(false)}
                          aria-label={social.name}
                        >
                          <IconComponent className="w-6 h-6" />
                        </Link>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}