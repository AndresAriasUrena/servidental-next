import Link from 'next/link';

/**
 * Banner placeholder del SORTEO para la parte superior de la tienda (estilo tipo Ekono:
 * alto, con márgenes laterales y esquinas redondeadas).
 * Es una maqueta tentativa de cómo quedaría el cintillo/banner mientras la clienta
 * envía la imagen gráfica definitiva (con las dimensiones que le pasamos).
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
        aria-label="Sorteo ServiDental"
        className="group relative block w-full overflow-hidden rounded-2xl bg-gradient-to-r from-servi_dark via-servi_green to-servi_dark text-white shadow-lg"
      >
        {/* Patrón decorativo de fondo */}
        <div
          className="pointer-events-none absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              'repeating-linear-gradient(45deg, transparent, transparent 12px, rgba(255,255,255,0.15) 12px, rgba(255,255,255,0.15) 24px)',
          }}
        />

        <div className="relative flex flex-col items-center gap-4 px-6 py-10 text-center md:flex-row md:justify-between md:gap-8 md:px-12 md:py-14 md:text-left">
          {/* Contenido textual */}
          <div className="flex-1">
            <span className="inline-flex items-center rounded-full bg-yellow-400 px-4 py-1 text-sm font-bold uppercase tracking-wide text-servi_dark">
              🎉 Sorteo
            </span>
            <h2 className="mt-4 text-2xl font-bold leading-tight md:text-4xl">
              Realice una compra y participe por una{' '}
              <span className="text-yellow-300">taza china exclusiva</span>
            </h2>
            <p className="mt-3 text-base text-gray-100 md:text-lg">
              + una vela aromática, y de bonus una pieza de alta velocidad.
            </p>
            <p className="mt-2 text-xs text-gray-200 md:text-sm">
              Válido del 7 al 31 de agosto de 2026. Únicamente para compras en la tienda en línea.
            </p>
          </div>

          {/* CTA */}
          <div className="shrink-0">
            <span className="inline-flex items-center whitespace-nowrap rounded-lg bg-yellow-400 px-8 py-4 text-base font-bold text-servi_dark transition-colors group-hover:bg-yellow-300 md:text-lg">
              Compre ahora →
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}
