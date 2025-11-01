import sanitizeHtml from 'sanitize-html';

/**
 * Sanitiza HTML de productos WooCommerce permitiendo solo tags seguros
 * para renderizar descripciones con formato rico
 */
export function sanitizeProductHtml(html: string): string {
  return sanitizeHtml(html ?? '', {
    allowedTags: ['p', 'br', 'strong', 'em', 'ul', 'ol', 'li', 'h3', 'h4', 'a'],
    allowedAttributes: {
      a: ['href', 'title', 'target', 'rel']
    },
    transformTags: {
      a: sanitizeHtml.simpleTransform('a', {
        rel: 'nofollow noopener',
        target: '_blank'
      })
    }
  });
}

/**
 * Normaliza la descripción del producto eliminando el encabezado
 * "Características" si aparece al inicio del contenido
 */
export function normalizeDescription(html: string): string {
  if (!html) return '';

  // Quitar "Características" al inicio si viene solo en negrita
  const cleaned = html.replace(
    /^\s*<p><strong>\s*Caracter[íi]sticas\s*<\/strong><\/p>\s*/i,
    ''
  );

  return cleaned;
}
