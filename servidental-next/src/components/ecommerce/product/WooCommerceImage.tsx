'use client';

import { useState } from 'react';
import Image, { ImageProps } from 'next/image';

interface WooCommerceImageProps extends Omit<ImageProps, 'onError'> {
  fallbackSrc?: string;
}

/**
 * Componente para manejar imágenes de WooCommerce con fallback
 * Si la imagen falla al cargar (por ejemplo, error 402 de plugins de WordPress),
 * usa un tag <img> nativo para bypass completo de Next.js optimization
 */
export default function WooCommerceImage({
  src,
  alt,
  fallbackSrc,
  className,
  width,
  height,
  ...props
}: WooCommerceImageProps) {
  const [hasError, setHasError] = useState(false);
  const [useNativeImg, setUseNativeImg] = useState(false);

  const getSrcString = (source: typeof src): string => {
    if (typeof source === 'string') return source;
    if (typeof source === 'object' && 'src' in source) return source.src;
    return String(source);
  };

  const handleError = () => {
    const srcString = getSrcString(src);
    console.warn(`Error loading image via Next.js Image: ${srcString}. Switching to native <img> tag.`);

    if (!hasError) {
      setHasError(true);
      // Switch to native img tag to completely bypass Next.js image optimization
      setUseNativeImg(true);
    }
  };

  const handleNativeError = () => {
    const srcString = getSrcString(src);
    console.error(`Failed to load image even with native tag: ${srcString}`);
    // After native img fails, we'll show placeholder
    setHasError(true);
  };

  // Si falló con native img también, mostrar placeholder
  if (hasError && useNativeImg) {
    return (
      <div
        className={`flex items-center justify-center bg-gray-100 text-gray-400 ${className || ''}`}
        style={{
          width: typeof width === 'number' ? `${width}px` : width,
          height: typeof height === 'number' ? `${height}px` : height
        }}
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

  // Si detectamos error con Next.js Image, usar native img tag
  if (useNativeImg && !hasError) {
    const imgSrc = fallbackSrc || getSrcString(src);
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={imgSrc}
        alt={alt}
        className={className}
        width={typeof width === 'number' ? width : undefined}
        height={typeof height === 'number' ? height : undefined}
        onError={handleNativeError}
        loading="lazy"
      />
    );
  }

  // Intento inicial con Next.js Image
  return (
    <Image
      {...props}
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      onError={handleError}
    />
  );
}
