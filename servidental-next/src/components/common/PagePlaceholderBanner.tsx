import Image from 'next/image';
import Link from 'next/link';
import sorteoDesktop from '@/assets/banners/sorteo-desktop.avif';
import sorteoMobile from '@/assets/banners/sorteo-mobile.avif';

/**
 * Banner del SORTEO en la parte superior de la tienda.
 * Usa la imagen gráfica de la clienta (versión desktop y móvil).
 * Se auto-oculta después del 31 de agosto de 2026 (fin del sorteo).
 */
export default function PagePlaceholderBanner() {
  // El sorteo corre del 7 al 31 de agosto de 2026.
  const expiresAt = new Date('2026-09-01T00:00:00-06:00').getTime();
  if (Date.now() > expiresAt) {
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 md:pt-6">
      <Link
        href="/tienda"
        aria-label="Sorteo ServiDental — participe realizando una compra"
        className="block overflow-hidden rounded-2xl shadow-lg transition-transform hover:scale-[1.01]"
      >
        {/* Desktop */}
        <Image
          src={sorteoDesktop}
          alt="Sorteo ServiDental: realice una compra y participe por una taza china exclusiva, una vela aromática y una pieza de alta velocidad. Válido del 7 al 31 de agosto de 2026."
          className="hidden w-full md:block"
          priority
          sizes="(min-width: 768px) 1280px, 100vw"
        />
        {/* Móvil */}
        <Image
          src={sorteoMobile}
          alt="Sorteo ServiDental: realice una compra y participe por una taza china exclusiva, una vela aromática y una pieza de alta velocidad. Válido del 7 al 31 de agosto de 2026."
          className="w-full md:hidden"
          priority
          sizes="100vw"
        />
      </Link>
    </div>
  );
}
