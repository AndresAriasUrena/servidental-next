/**
 * Product Resources Parser
 * Extrae únicamente PDFs específicos desde meta_data de WooCommerce
 * - manual_pdf_url → Manual de Usuario
 * - product_sheet_pdf_url → Ficha Técnica
 *
 * Los videos NO se incluyen aquí (van en la galería multimedia)
 */

export type ProductResource = {
  id: string;
  title: string;
  url: string;          // enlace de vista/apertura
  downloadUrl?: string; // si aplica (Drive PDF con descarga directa)
  kind: 'pdf';
  mime: 'application/pdf';
};

/**
 * Claves específicas permitidas para recursos de documentación
 */
const ALLOWED_PDF_KEYS = ['manual_pdf_url', 'product_sheet_pdf_url'] as const;

/**
 * Normaliza URLs de Google Drive
 * Soporta: /file/d/<id>/view, /open?id=<id>, /uc?id=<id>
 */
export function normalizeDriveUrl(url: string): { view: string; download?: string } | null {
  if (!url.includes('drive.google.com')) return null;

  let fileId: string | null = null;

  // Patrón: /file/d/<id>/view o /file/d/<id>/edit
  const fileMatch = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (fileMatch) {
    fileId = fileMatch[1];
  }

  // Patrón: open?id=<id> o uc?id=<id>
  const idMatch = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (idMatch) {
    fileId = idMatch[1];
  }

  if (!fileId) return null;

  return {
    view: `https://drive.google.com/file/d/${fileId}/preview`,
    download: `https://drive.google.com/uc?export=download&id=${fileId}`
  };
}

/**
 * Normaliza URLs de YouTube
 * Soporta: youtu.be/<id>, youtube.com/watch?v=<id>, youtube.com/embed/<id>
 */
export function normalizeYouTube(url: string): { view: string; embed: string } | null {
  if (!url.includes('youtu')) return null;

  let videoId: string | null = null;

  // Patrón: youtu.be/<id>
  const shortMatch = url.match(/youtu\.be\/([a-zA-Z0-9_-]+)/);
  if (shortMatch) {
    videoId = shortMatch[1];
  }

  // Patrón: youtube.com/watch?v=<id>
  const watchMatch = url.match(/[?&]v=([a-zA-Z0-9_-]+)/);
  if (watchMatch) {
    videoId = watchMatch[1];
  }

  // Patrón: youtube.com/embed/<id>
  const embedMatch = url.match(/\/embed\/([a-zA-Z0-9_-]+)/);
  if (embedMatch) {
    videoId = embedMatch[1];
  }

  if (!videoId) return null;

  return {
    view: `https://www.youtube.com/watch?v=${videoId}`,
    embed: `https://www.youtube.com/embed/${videoId}`
  };
}

/**
 * Genera título legible desde la clave del meta_data
 */
function generateTitle(key: string): string {
  const titleMap: Record<string, string> = {
    'manual_pdf_url': 'Manual de Usuario (PDF)',
    'product_sheet_pdf_url': 'Ficha Técnica (PDF)',
  };

  return titleMap[key] || 'Documento (PDF)';
}

/**
 * Extrae recursos (únicamente PDFs específicos) desde el array meta_data de WooCommerce
 * Solo procesa: manual_pdf_url y product_sheet_pdf_url
 */
export function extractResourcesFromMeta(
  meta: Array<{ key: string; value: any }>
): ProductResource[] {
  if (!Array.isArray(meta) || meta.length === 0) {
    return [];
  }

  const resources: ProductResource[] = [];

  for (const item of meta) {
    const { key, value } = item;

    // Solo procesar claves específicas permitidas
    if (!ALLOWED_PDF_KEYS.includes(key as any)) {
      continue;
    }

    // Validar que sea una URL válida (string, no array)
    if (typeof value !== 'string' || !value.match(/^https?:\/\/.+/)) {
      continue;
    }

    const rawUrl = value;
    const title = generateTitle(key);
    const id = key; // Usar la clave como ID único

    let finalUrl = rawUrl;
    let downloadUrl: string | undefined;

    // Normalizar Google Drive si aplica
    const driveNormalized = normalizeDriveUrl(rawUrl);
    if (driveNormalized) {
      finalUrl = driveNormalized.view;
      downloadUrl = driveNormalized.download;
    }

    resources.push({
      id,
      title,
      url: finalUrl,
      downloadUrl,
      kind: 'pdf',
      mime: 'application/pdf'
    });

    console.log(`[Resources] ✅ Parsed PDF resource: ${title} from "${key}"`);
  }

  if (resources.length > 0) {
    console.log(`[Resources] 📦 Extracted ${resources.length} PDF resources from meta_data`);
  }

  return resources;
}

/**
 * Cache simple en memoria (TTL 15 min) - Opcional para optimización
 */
interface CacheEntry {
  resources: ProductResource[];
  timestamp: number;
}

const resourceCache = new Map<string | number, CacheEntry>();
const CACHE_TTL = 15 * 60 * 1000; // 15 minutos

export function getCachedResources(productId: string | number): ProductResource[] | null {
  const cached = resourceCache.get(productId);
  if (!cached) return null;

  const now = Date.now();
  if (now - cached.timestamp > CACHE_TTL) {
    resourceCache.delete(productId);
    return null;
  }

  return cached.resources;
}

export function setCachedResources(productId: string | number, resources: ProductResource[]): void {
  resourceCache.set(productId, {
    resources,
    timestamp: Date.now()
  });
}
