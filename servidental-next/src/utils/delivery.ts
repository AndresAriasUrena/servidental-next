// Badges de "entrega en X días" por etiqueta de WooCommerce.
// Mapa configurable: agregar una entrada aquí habilita el badge en grid y ficha.

import { ProductTag } from '@/types/woocommerce';

/** Etiqueta (slug o name, case-insensitive) → días de entrega. */
export const DELIVERY_BADGES: Record<string, number> = {
  black30: 30,
  black15: 15,
  'silla-dental': 22, // compat: 0 productos hoy, se mantiene por si reaparece
};

/** Días de entrega del primer tag que matchee, o null si ninguno aplica. */
export function getDeliveryDaysForTags(tags?: ProductTag[]): number | null {
  if (!tags) return null;
  for (const tag of tags) {
    const key = (tag.slug || tag.name || '').toLowerCase();
    if (key in DELIVERY_BADGES) return DELIVERY_BADGES[key];
  }
  return null;
}
