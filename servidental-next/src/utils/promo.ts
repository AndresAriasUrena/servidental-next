// Promoción de Independencia — 20% OFF por transferencia bancaria.
// Aplica a productos con la etiqueta 'independencia' (AMI-23B + categoría Mobiliario).
// Válida del 14 al 30 de setiembre de 2026.

import { ProductTag, CartItem } from '@/types/woocommerce';
import { parsePrice } from '@/utils/currency';

// Rango de la promo (hora de Costa Rica, UTC-6). Válida del 14 al 30 de setiembre.
const PROMO_START = new Date('2026-09-14T00:00:00-06:00').getTime();
const PROMO_END = new Date('2026-10-01T00:00:00-06:00').getTime(); // hasta el 30-sep inclusive

export const INDEPENDENCIA_RATE = 0.20;

/** ¿La promoción está activa según la fecha actual? */
export function isIndependenciaActive(now: number = Date.now()): boolean {
  return now >= PROMO_START && now < PROMO_END;
}

/** ¿Un conjunto de tags contiene la etiqueta 'independencia'? */
export function hasIndependenciaTag(tags?: ProductTag[]): boolean {
  return (
    tags?.some(
      (t) => t.slug?.toLowerCase() === 'independencia' || t.name?.toLowerCase() === 'independencia'
    ) || false
  );
}

/**
 * Descuento de independencia (en USD) sobre los items del carrito que tengan la
 * etiqueta, solo si la promo está activa. Devuelve 0 si no aplica.
 */
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
