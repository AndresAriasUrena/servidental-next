// Sistema de promociones configurable por fecha.
// Cada promo aplica un % de descuento (solo por transferencia) a los productos
// que tengan su etiqueta de WooCommerce, dentro de su ventana de vigencia.
// Agregar/retirar promos editando el array PROMOS; todo se activa/desactiva solo por fecha.

import { ProductTag, CartItem } from '@/types/woocommerce';
import { parsePrice } from '@/utils/currency';

export interface Promo {
  id: string;
  /** Texto largo visible (ficha del producto). */
  label: string;
  /** Texto corto del badge (grid de productos). */
  badgeLabel: string;
  /** Etiquetas de WooCommerce (slug o name, case-insensitive) que activan la promo. */
  tagSlugs: string[];
  /** Inicio en ms (hora CR, UTC-6). */
  start: number;
  /** Fin en ms, exclusivo. */
  end: number;
  /** Tasa de descuento (0.20 = 20%). */
  rate: number;
  /** Clases Tailwind del badge/distintivo. */
  badgeClassName: string;
  /** Nota de la ficha del producto. */
  noteText: string;
}

export const PROMOS: Promo[] = [
  {
    id: 'independencia',
    label: 'Promo Independencia',
    badgeLabel: '-20% Independencia',
    tagSlugs: ['independencia'],
    start: new Date('2026-09-14T00:00:00-06:00').getTime(),
    end: new Date('2026-10-01T00:00:00-06:00').getTime(), // hasta el 30-sep inclusive
    rate: 0.20,
    badgeClassName: 'bg-gradient-to-r from-blue-700 to-red-600 text-white',
    noteText: 'Aplica pagando por transferencia bancaria. Válido del 14 al 30 de setiembre.',
  },
  {
    id: 'promoespecial',
    label: 'Promo especial',
    badgeLabel: '-20% Promo',
    tagSlugs: ['promoespecial'],
    start: new Date('2026-10-01T00:00:00-06:00').getTime(), // ya activa
    end: new Date('2026-10-16T00:00:00-06:00').getTime(), // incluye el 15-oct completo
    rate: 0.20,
    badgeClassName: 'bg-gradient-to-r from-servi_green to-servi_dark text-white',
    noteText: 'Aplica pagando por transferencia bancaria. Válido hasta el 15 de octubre.',
  },
];

/** ¿La promo está activa según la fecha actual? */
export function isPromoActive(promo: Promo, now: number = Date.now()): boolean {
  return now >= promo.start && now < promo.end;
}

/** ¿Los tags del producto coinciden con alguna etiqueta de la promo? (case-insensitive) */
export function tagsMatchPromo(promo: Promo, tags?: ProductTag[]): boolean {
  if (!tags || tags.length === 0) return false;
  const wanted = promo.tagSlugs.map((s) => s.toLowerCase());
  return tags.some(
    (t) =>
      (t.slug && wanted.includes(t.slug.toLowerCase())) ||
      (t.name && wanted.includes(t.name.toLowerCase()))
  );
}

/**
 * Devuelve la primera promo activa que aplica a los tags dados, o null.
 * El orden de PROMOS define la prioridad si un producto cayera en dos promos.
 */
export function getActivePromoForTags(tags?: ProductTag[], now: number = Date.now()): Promo | null {
  return PROMOS.find((p) => isPromoActive(p, now) && tagsMatchPromo(p, tags)) || null;
}

/**
 * Descuento total (en USD) sobre los items del carrito cuya promo esté activa.
 * Cada item usa su propia promo (y su propia tasa). Devuelve 0 si nada aplica.
 */
export function getPromoDiscount(items: CartItem[], now: number = Date.now()): number {
  return items.reduce((sum, item) => {
    const promo = getActivePromoForTags(item.tags, now);
    if (!promo) return sum;
    const itemSubtotal =
      typeof item.subtotal === 'number' ? item.subtotal : parsePrice(item.price) * item.quantity;
    return sum + itemSubtotal * promo.rate;
  }, 0);
}

// ---------------------------------------------------------------------------
// Wrappers legacy (Promoción de Independencia). Se conservan para no romper
// consumidores existentes; delegan en el sistema genérico.
// ---------------------------------------------------------------------------

const INDEPENDENCIA = PROMOS.find((p) => p.id === 'independencia')!;

export const INDEPENDENCIA_RATE = INDEPENDENCIA.rate;

export function isIndependenciaActive(now: number = Date.now()): boolean {
  return isPromoActive(INDEPENDENCIA, now);
}

export function hasIndependenciaTag(tags?: ProductTag[]): boolean {
  return tagsMatchPromo(INDEPENDENCIA, tags);
}

export function getIndependenciaDiscount(items: CartItem[], now: number = Date.now()): number {
  if (!isIndependenciaActive(now)) return 0;
  const eligibleSubtotal = items.reduce((sum, item) => {
    if (hasIndependenciaTag(item.tags)) {
      const itemSubtotal =
        typeof item.subtotal === 'number' ? item.subtotal : parsePrice(item.price) * item.quantity;
      return sum + itemSubtotal;
    }
    return sum;
  }, 0);
  return eligibleSubtotal * INDEPENDENCIA_RATE;
}
