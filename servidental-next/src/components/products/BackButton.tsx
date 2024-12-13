'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'

export default function BackButton() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const handleBack = () => {
    // Obtener el parámetro returnCategory de la URL actual
    const returnCategory = searchParams.get('returnCategory')
    
    let backUrl = '/products'
    const params = new URLSearchParams()
    
    // Si existe returnCategory, lo convertimos al parámetro category para la página de productos
    if (returnCategory) {
      // Decodificar el valor de returnCategory en caso de que contenga caracteres especiales
      const decodedCategory = decodeURIComponent(returnCategory)
      params.set('category', decodedCategory)
    }
    
    // Agregar los parámetros a la URL si existen
    if (params.toString()) {
      backUrl += `?${params.toString()}`
    }
    
    router.push(backUrl)
  }

  return (
    <button
      onClick={handleBack}
      className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8"
    >
      <ArrowLeft size={20} />
      Volver a productos
    </button>
  )
}