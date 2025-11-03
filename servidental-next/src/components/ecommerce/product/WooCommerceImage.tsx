'use client';

import { useState } from 'react';
import Image, { ImageProps } from 'next/image';

interface WooCommerceImageProps extends Omit<ImageProps, 'onError'> {
  fallbackSrc?: string;
}

/**
 * Componente para manejar imágenes de WooCommerce con fallback
 * Si la imagen falla al cargar (por ejemplo, error 402 de plugins de WordPress),
 * intenta cargar sin optimización o usa una imagen de fallback
 */
export default function WooCommerceImage({
  src,
  alt,
  fallbackSrc,
  ...props
}: WooCommerceImageProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    console.warn(`Error loading image: ${imgSrc}`);

    if (!hasError) {
      setHasError(true);

      // Si hay un fallback, usarlo
      if (fallbackSrc) {
        setImgSrc(fallbackSrc);
      } else if (typeof src === 'string') {
        // Intentar cargar la imagen original directamente sin optimización
        // Esto bypasea el Next.js Image Optimization que puede estar causando el 402
        setImgSrc(src);
      }
    }
  };

  // Si hay error y no hay fallback, mostrar placeholder
  if (hasError && !fallbackSrc) {
    return (
      <div
        className="flex items-center justify-center bg-gray-100 text-gray-400"
        style={{ width: props.width, height: props.height }}
      >
        <svg
          className="w-12 h-12"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      </div>
    );
  }

  return (
    <Image
      {...props}
      src={imgSrc}
      alt={alt}
      onError={handleError}
      // Usar unoptimized si ya hubo un error
      unoptimized={hasError}
    />
  );
}
