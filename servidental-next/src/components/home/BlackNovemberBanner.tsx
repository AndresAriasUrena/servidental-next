'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Sparkles } from 'lucide-react';

/**
 * Banner deslizante de Black November para página de inicio
 * Inspirado en el banner de Walmart con animación de texto deslizante
 */
export default function BlackNovemberBanner() {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  const messages = [
    '¡Black November en ServiDental! Hasta 10% de descuento en equipos dentales',
    'Ofertas exclusivas en escáneres, motores, rayos, compresores y más',
    'Financiamiento disponible - Hasta 6 meses sin intereses Tasa 0 con el BAC',
    '¡No se pierda las mejores ofertas del año en equipo dental!'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex((prev) => (prev + 1) % messages.length);
    }, 4000); // Cambiar mensaje cada 4 segundos

    return () => clearInterval(interval);
  }, [messages.length]);

  return (
    <div className="relative bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
      {/* Fondo con patrón */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.1) 10px, rgba(255,255,255,0.1) 20px)'
        }} />
      </div>

      {/* Contenido del banner */}
      <div className="relative container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">

          {/* Badge Black November */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <div className="bg-gradient-to-br from-gray-700 to-gray-900 text-white px-4 py-2 rounded-lg font-black text-lg md:text-xl shadow-lg transform hover:scale-105 transition-transform">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                <span>BLACK NOVEMBER</span>
              </div>
            </div>
          </div>

          {/* Mensaje deslizante animado */}
          <div className="flex-1 text-center md:text-left overflow-hidden">
            <div
              className="transition-all duration-500 ease-in-out"
              key={currentMessageIndex}
              style={{
                animation: 'slideIn 0.5s ease-out'
              }}
            >
              <p className="text-sm md:text-lg font-semibold text-white">
                {messages[currentMessageIndex]}
              </p>
            </div>
          </div>

          {/* Botón CTA */}
          <Link
            href="/tienda?on_sale=true"
            className="flex-shrink-0 bg-servi_green hover:bg-servi_dark text-white font-bold px-6 py-3 rounded-full shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span className="whitespace-nowrap">Ver Ofertas</span>
          </Link>
        </div>
      </div>

      {/* Indicadores de mensaje (opcional - puntos para mostrar qué mensaje está activo) */}
      <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 flex gap-1.5">
        {messages.map((_, index) => (
          <div
            key={index}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
              index === currentMessageIndex
                ? 'bg-slate-300 w-4'
                : 'bg-gray-600'
            }`}
          />
        ))}
      </div>

      {/* Animación CSS */}
      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
