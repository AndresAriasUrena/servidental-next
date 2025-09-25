/**
 * Currency utilities for ServidentalCR
 * Handles price display and formatting for USD payments via TiloPay
 */

export const CURRENCY = {
  USD: {
    symbol: '$',
    code: 'USD',
    name: 'US Dollar'
  },
  CRC: {
    symbol: '₡',
    code: 'CRC',
    name: 'Costa Rican Colón'
  }
};

// Use USD as primary currency for TiloPay integration
export const PRIMARY_CURRENCY = CURRENCY.USD;

/**
 * Format price for display
 * @param price - Price as number
 * @param currency - Currency to use (defaults to USD)
 * @returns Formatted price string
 */
export function formatPrice(price: number, currency = PRIMARY_CURRENCY): string {
  if (isNaN(price) || price < 0) {
    return `${currency.symbol}0`;
  }
  
  return `${currency.symbol}${price.toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  })}`;
}

/**
 * Parse price from string (WooCommerce returns prices as strings)
 * @param priceString - Price as string
 * @returns Price as number
 */
export function parsePrice(priceString: string | number): number {
  if (typeof priceString === 'number') {
    return priceString;
  }
  
  const parsed = parseFloat(priceString);
  return isNaN(parsed) ? 0 : parsed;
}

/**
 * Format price range for filters
 * @param min - Minimum price
 * @param max - Maximum price
 * @param currency - Currency to use
 * @returns Formatted price range string
 */
export function formatPriceRange(min?: number, max?: number, currency = PRIMARY_CURRENCY): string {
  const minPrice = min || 0;
  const maxPrice = max || Infinity;
  
  if (maxPrice === Infinity) {
    return `${currency.symbol}${minPrice.toLocaleString()} - ${currency.symbol}∞`;
  }
  
  return `${currency.symbol}${minPrice.toLocaleString()} - ${currency.symbol}${maxPrice.toLocaleString()}`;
}

/**
 * Get the best price to display (sale price if available, otherwise regular price)
 * @param regularPrice - Regular price
 * @param salePrice - Sale price (optional)
 * @returns Best price to display
 */
export function getBestPrice(regularPrice: string | number, salePrice?: string | number): number {
  const regular = parsePrice(regularPrice);
  const sale = salePrice ? parsePrice(salePrice) : 0;
  
  return sale && sale > 0 && sale < regular ? sale : regular;
}

/**
 * Check if product is on sale
 * @param regularPrice - Regular price
 * @param salePrice - Sale price
 * @returns True if product is on sale
 */
export function isOnSale(regularPrice: string | number, salePrice?: string | number): boolean {
  const regular = parsePrice(regularPrice);
  const sale = salePrice ? parsePrice(salePrice) : 0;
  
  return sale > 0 && sale < regular;
}