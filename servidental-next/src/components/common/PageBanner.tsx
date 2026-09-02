import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';

interface PageBannerProps {
  /** Imagen del banner para escritorio (2560×800). */
  desktop: StaticImageData;
  /** Imagen del banner para móvil (1080×720). */
  mobile: StaticImageData;
  /** Texto alternativo de la imagen. */
  alt: string;
  /** Si se define, el banner es un enlace; si no, es decorativo. */
  href?: string;
  /** Contenido superpuesto centrado (título/subtítulos). Opcional. */
  children?: React.ReactNode;
  /** Prioriza la carga (usar en banners visibles al cargar la página). */
  priority?: boolean;
}

/**
 * Banner superior reutilizable con estilo de tarjeta (márgenes + esquinas redondeadas),
 * imagen responsiva desktop/móvil y contenido opcional superpuesto (título del código).
 */
export default function PageBanner({
  desktop,
  mobile,
  alt,
  href,
  children,
  priority = true,
}: PageBannerProps) {
  const inner = (
    <div className="relative overflow-hidden rounded-2xl shadow-lg">
      {/* Imagen de fondo — desktop */}
      <Image
        src={desktop}
        alt={alt}
        className="hidden w-full md:block"
        priority={priority}
        sizes="(min-width: 768px) 1280px, 100vw"
      />
      {/* Imagen de fondo — móvil */}
      <Image
        src={mobile}
        alt={alt}
        className="w-full md:hidden"
        priority={priority}
        sizes="100vw"
      />

      {/* Título superpuesto (opcional), centrado vertical y horizontalmente */}
      {children && (
        <div className="absolute inset-0 flex items-center justify-center px-4">
          <div className="w-full text-center text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]">
            {children}
          </div>
        </div>
      )}
    </div>
  );

  return (
    // Fondo blanco alrededor del banner para que el espacio de márgenes no muestre
    // el color de fondo de la página.
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-6">
        {href ? (
          <Link href={href} aria-label={alt} className="block transition-transform hover:scale-[1.01]">
            {inner}
          </Link>
        ) : (
          inner
        )}
      </div>
    </div>
  );
}
