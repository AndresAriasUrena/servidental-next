/**
 * Stock Validation Utilities
 *
 * Calcula el máximo de unidades comprables de un producto sin revelar
 * el stock exacto al usuario.
 *
 * Reglas:
 * - Si manage_stock === false: sin límite (retorna 99)
 * - Si backorders !== 'no': permite backorder (retorna 99)
 * - Si stock_status !== 'instock': no disponible (retorna 0)
 * - Si manage_stock === true y backorders === 'no': máx = stock_quantity - qtyEnCarrito
 */

import type { WooCommerceProduct, ProductVariation } from '@/types/woocommerce';

// Type that represents the stock-related properties needed for validation
type StockableItem = Pick<
  WooCommerceProduct | ProductVariation,
  'stock_status' | 'manage_stock' | 'backorders' | 'stock_quantity'
>;

/**
 * Calcula la cantidad máxima comprable de un producto o variación
 *
 * @param item - Datos del producto o variación de WooCommerce
 * @param currentCartQty - Cantidad ya agregada al carrito para este producto
 * @returns Cantidad máxima disponible (nunca revela stock real al UI)
 */
export function getMaxPurchasable(
  item: StockableItem,
  currentCartQty: number = 0
): number {
  // Si el producto no está en stock, no se puede comprar
  if (item.stock_status !== 'instock') {
    return 0;
  }

  // Si el producto no gestiona stock, permitir hasta 99 unidades
  if (!item.manage_stock) {
    return 99;
  }

  // Si permite backorders (pedidos pendientes), no hay límite práctico
  if (item.backorders !== 'no') {
    return 99;
  }

  // Si gestiona stock y no permite backorders, calcular disponibilidad
  const stockQuantity = item.stock_quantity || 0;
  const available = stockQuantity - currentCartQty;

  return Math.max(0, available);
}

/**
 * Verifica si se puede agregar una cantidad específica al carrito
 *
 * @param item - Datos del producto o variación
 * @param requestedQty - Cantidad que se desea agregar
 * @param currentCartQty - Cantidad ya en el carrito
 * @returns true si la cantidad es válida, false si excede el máximo
 */
export function canAddToCart(
  item: StockableItem,
  requestedQty: number,
  currentCartQty: number = 0
): boolean {
  const max = getMaxPurchasable(item, currentCartQty);
  const totalQty = currentCartQty + requestedQty;
  return totalQty <= max;
}

/**
 * Valida y ajusta una cantidad al máximo permitido
 *
 * @param item - Datos del producto o variación
 * @param desiredQty - Cantidad deseada
 * @param currentCartQty - Cantidad ya en el carrito
 * @returns Cantidad válida (ajustada al máximo si es necesario)
 */
export function validateQuantity(
  item: StockableItem,
  desiredQty: number,
  currentCartQty: number = 0
): number {
  const max = getMaxPurchasable(item, currentCartQty);
  return Math.min(desiredQty, max);
}

/**
 * Genera mensaje de error genérico sin revelar stock
 *
 * @param exceedsStock - true si el problema es stock insuficiente
 * @returns Mensaje genérico para el usuario
 */
export function getStockErrorMessage(exceedsStock: boolean): string {
  if (exceedsStock) {
    return 'No hay suficientes unidades disponibles. Ajusta la cantidad.';
  }
  return 'Este producto no está disponible en este momento.';
}

/**
 * Calcula la cantidad disponible para aumentar en el carrito
 * (útil para deshabilitar botones +)
 *
 * @param item - Datos del producto o variación
 * @param currentCartQty - Cantidad actual en el carrito
 * @returns Cantidad adicional que se puede agregar
 */
export function getRemainingQuantity(
  item: StockableItem,
  currentCartQty: number
): number {
  const max = getMaxPurchasable(item, currentCartQty);
  return Math.max(0, max - currentCartQty);
}
