// src/app/layout.tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ServiDental | Equipo Médico Dental',
  description: 'Más de 16 años de experiencia en el mercado costarricense, ofrecemos soluciones efectivas para los problemas técnicos asociados con clínicas odontológicas.',
  keywords: 'equipo médico dental, servicio técnico dental, Costa Rica, unidades dentales',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <Header />
        <main className="min-h-screen pt-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}