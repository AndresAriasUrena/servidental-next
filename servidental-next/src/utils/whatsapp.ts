/**
 * WhatsApp integration utilities for ServidentalCR
 */

import { WooCommerceProduct } from '@/types/woocommerce';
import { formatPrice, parsePrice } from '@/utils/currency';

// WhatsApp phone number for ServidentalCR (Costa Rica format)
const WHATSAPP_PHONE = '50621016114'; // Replace with actual phone number

/**
 * Checks if a product requires quotation instead of direct purchase
 */
export function requiresQuote(product: WooCommerceProduct): boolean {
  // Check if product has 'cotizar' tag
  if (product.tags && product.tags.length > 0) {
    return product.tags.some(tag => 
      tag.name.toLowerCase().includes('cotizar') || 
      tag.name.toLowerCase().includes('cotización') ||
      tag.name.toLowerCase().includes('quote')
    );
  }
  
  // Fallback: Check if price is 0 or not set (consultation price)
  const price = parsePrice(product.price);
  if (price === 0) {
    return true;
  }
  
  return false;
}

/**
 * Checks if a product should show the "notify me when in stock" option.
 * Controlado por la etiqueta 'avisar' en WooCommerce (configurada manualmente por el cliente).
 */
export function hasStockAlertTag(product: WooCommerceProduct): boolean {
  return product.tags?.some(tag =>
    tag.name.toLowerCase().includes('avisar')
  ) || false;
}

/**
 * Generates WhatsApp message for product quotation
 */
export function generateQuoteMessage(product: WooCommerceProduct): string {
  const price = parsePrice(product.price);
  const brandName = product.attributes?.find(attr => 
    attr.name.toLowerCase().includes('marca') || 
    attr.name.toLowerCase().includes('brand')
  )?.options?.[0] || '';
  
  const productUrl = `${typeof window !== 'undefined' ? window.location.origin : ''}/tienda/${product.slug}`;
  
  let message = `¡Hola! Me interesa solicitar una cotización para el siguiente producto:\n\n`;
  message += `📦 *${product.name}*\n`;
  
  if (brandName) {
    message += `🏷️ Marca: ${brandName}\n`;
  }
  
  if (product.sku) {
    message += `🔢 SKU: ${product.sku}\n`;
  }
  
  if (price > 0) {
    message += `💰 Precio de referencia: ${formatPrice(price)}\n`;
  }
  
  message += `🔗 Enlace: ${productUrl}\n\n`;
  message += `Por favor, envíenme información sobre:\n`;
  message += `• Precio actualizado\n`;
  message += `• Disponibilidad\n`;
  message += `• Tiempos de entrega\n`;
  message += `• Condiciones de pago\n\n`;
  message += `¡Gracias!`;
  
  return message;
}

/**
 * Generates enhanced WhatsApp message for product quotation with customer info
 */
export function generateQuoteMessageWithCustomerInfo(
  product: WooCommerceProduct, 
  fullName: string, 
  email: string
): string {
  const productUrl = `${typeof window !== 'undefined' ? window.location.origin : ''}/tienda/${product.slug}`;
  
  let message = `¡Hola! Me interesa solicitar una cotización para el siguiente producto:\n\n`;
  message += `    📦 ${product.name}\n`;
  message += `    📋 SKU: ${product.sku || product.name}\n`;
  message += `    🔗 Enlace: ${productUrl}\n\n`;
  message += `    Mi nombre completo es ${fullName}\n`;
  message += `    Mi correo electrónico es ${email}\n\n`;
  message += `    Por favor, envíenme información sobre:\n`;
  message += `    * Precio actualizado\n`;
  message += `    * Disponibilidad\n`;
  message += `    * Tiempos de entrega\n`;
  message += `    * Condiciones de pago\n\n`;
  message += `    ¡Gracias!`;
  
  return message;
}

/**
 * Opens WhatsApp with pre-filled quotation message
 */
export function sendQuoteToWhatsApp(product: WooCommerceProduct): void {
  const message = generateQuoteMessage(product);
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodedMessage}`;
  
  // Open WhatsApp in new tab/window
  window.open(whatsappUrl, '_blank');
}

/**
 * Opens WhatsApp with enhanced quotation message including customer info
 */
export function sendQuoteToWhatsAppWithCustomerInfo(
  product: WooCommerceProduct, 
  fullName: string, 
  email: string
): void {
  const message = generateQuoteMessageWithCustomerInfo(product, fullName, email);
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodedMessage}`;
  
  // Open WhatsApp in new tab/window
  window.open(whatsappUrl, '_blank');
}

/**
 * Generates WhatsApp message for a "notify me when in stock" lead
 */
export function generateStockAlertMessage(
  product: WooCommerceProduct,
  fullName: string,
  email: string
): string {
  const productUrl = `${typeof window !== 'undefined' ? window.location.origin : ''}/tienda/${product.slug}`;

  let message = `¡Hola! Me interesa el siguiente producto que actualmente está agotado:\n\n`;
  message += `    📦 ${product.name}\n`;
  message += `    📋 SKU: ${product.sku || product.name}\n`;
  message += `    🔗 Enlace: ${productUrl}\n\n`;
  message += `    Mi nombre completo es ${fullName}\n`;
  message += `    Mi correo electrónico es ${email}\n\n`;
  message += `    Por favor, avísenme cuando haya stock disponible.\n\n`;
  message += `    ¡Gracias!`;

  return message;
}

/**
 * Opens WhatsApp with a "notify me when in stock" message including customer info
 */
export function sendStockAlertToWhatsAppWithCustomerInfo(
  product: WooCommerceProduct,
  fullName: string,
  email: string
): void {
  const message = generateStockAlertMessage(product, fullName, email);
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodedMessage}`;

  window.open(whatsappUrl, '_blank');
}

/**
 * Generates WhatsApp message for general inquiries
 */
export function generateGeneralInquiryMessage(subject?: string): string {
  let message = `¡Hola! Me gustaría obtener más información sobre sus productos y servicios.\n\n`;
  
  if (subject) {
    message += `Consulta sobre: ${subject}\n\n`;
  }
  
  message += `Por favor, contáctenme para conocer más detalles.\n\n`;
  message += `¡Gracias!`;
  
  return message;
}

/**
 * Opens WhatsApp for general inquiries
 */
export function sendGeneralInquiryToWhatsApp(subject?: string): void {
  const message = generateGeneralInquiryMessage(subject);
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodedMessage}`;
  
  window.open(whatsappUrl, '_blank');
}