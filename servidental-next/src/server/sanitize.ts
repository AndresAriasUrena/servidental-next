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

type BlogRenderedField = { rendered?: unknown };
type BlogRenderedFields = {
  title?: BlogRenderedField;
  excerpt?: BlogRenderedField;
  content?: BlogRenderedField;
};

export function sanitizeBlogPost<T extends BlogRenderedFields>(post: T): T {
  const result = { ...post };
  for (const key of ['title', 'excerpt', 'content'] as const) {
    const field = post[key];
    if (typeof field?.rendered !== 'string') continue;

    result[key] = {
      ...field,
      rendered: sanitizeHtml(field.rendered, {
        allowedTags: key === 'title' ? [] : [
          ...sanitizeHtml.defaults.allowedTags, 'img', 'figure', 'figcaption',
        ],
        allowedAttributes: {
          a: ['href', 'title'],
          img: ['src', 'alt', 'title', 'width', 'height', 'loading'],
        },
        allowedSchemes: ['https', 'http', 'mailto', 'tel'],
        allowedSchemesByTag: { img: ['https', 'http'] },
        allowProtocolRelative: false,
      }),
    };
  }

  return result;
}
