/**
 * Server-only module for brand metadata and logo resolution
 *
 * Priority order for logo resolution:
 * A. WooCommerce Brands API (/wc/v3/products/brands) with image.src
 * B. WordPress REST API thumbnail (if exposed)
 * C. Local assets in /public/assets/logos/brands/<slug>.(avif|webp|svg|png|jpg)
 */

import fs from 'fs';
import path from 'path';

// ============================================
// TYPES
// ============================================

export interface BrandMetadata {
  id: number;
  name: string;
  slug: string;
  imageSrc?: string; // URL o path relativo al logo
}

interface WooCommerceBrand {
  id: number;
  name: string;
  slug: string;
  image?: {
    id: number;
    src: string;
    name: string;
    alt: string;
  };
}

// ============================================
// CONFIGURATION
// ============================================

const WP_URL = process.env.WOOCOMMERCE_URL;
const WC_KEY = process.env.WOOCOMMERCE_CONSUMER_KEY;
const WC_SECRET = process.env.WOOCOMMERCE_CONSUMER_SECRET;

const CACHE_TTL = 10 * 60 * 1000; // 10 minutos
const CACHE_KEY = 'brands:metadata:v1';

// Alias para marcas cuyos archivos no siguen el slug exacto
const BRAND_ASSET_ALIAS: Record<string, string> = {
  // Ejemplo: "siger": "siger_logo",
  // Si TPC tuviera archivo "tpc_logo.png" en lugar de "tpc.png"
};

// Extensiones en orden de preferencia
const LOGO_EXTENSIONS = ['.avif', '.webp', '.svg', '.png', '.jpg'];

// ============================================
// CACHE
// ============================================

interface CacheEntry {
  data: BrandMetadata[];
  timestamp: number;
}

let cache: CacheEntry | null = null;

function getCached(): BrandMetadata[] | null {
  if (!cache) return null;

  const age = Date.now() - cache.timestamp;
  if (age > CACHE_TTL) {
    cache = null;
    return null;
  }

  return cache.data;
}

function setCache(data: BrandMetadata[]): void {
  cache = {
    data,
    timestamp: Date.now()
  };
}

// ============================================
// LOGO RESOLUTION
// ============================================

/**
 * Busca logo en assets locales (/public/assets/logos/brands/)
 * Retorna path relativo (para <img src>) o null
 */
function resolveLocalLogoAsset(slug: string): string | null {
  // Alias si existe
  const baseName = BRAND_ASSET_ALIAS[slug] || slug;

  // Directorio público de logos
  const logosDir = path.join(process.cwd(), 'public', 'assets', 'logos', 'brands');

  // Verificar si el directorio existe
  if (!fs.existsSync(logosDir)) {
    console.warn('[Brands] Local logos directory not found:', logosDir);
    return null;
  }

  // Buscar archivo con cualquier extensión soportada
  for (const ext of LOGO_EXTENSIONS) {
    const fileName = `${baseName}${ext}`;
    const filePath = path.join(logosDir, fileName);

    if (fs.existsSync(filePath)) {
      // Retornar path relativo para uso en <img src>
      return `/assets/logos/brands/${fileName}`;
    }
  }

  return null;
}

// ============================================
// FETCHING
// ============================================

/**
 * Fuente A: Obtener marcas desde WooCommerce Brands API
 * Endpoint: /wc/v3/products/brands
 * Incluye image.src si está configurado en WooCommerce
 */
async function fetchBrandsFromWooCommerce(): Promise<BrandMetadata[]> {
  if (!WP_URL || !WC_KEY || !WC_SECRET) {
    throw new Error('Missing WooCommerce credentials');
  }

  try {
    const params = new URLSearchParams({
      consumer_key: WC_KEY,
      consumer_secret: WC_SECRET,
      per_page: '100'
    });

    const url = `${WP_URL}/wp-json/wc/v3/products/brands?${params.toString()}`;

    console.log('[Brands] Fetching from WooCommerce Brands API...');

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'User-Agent': 'ServidentalCR-NextJS/1.0',
        'Accept': 'application/json'
      },
      next: { revalidate: 0 } // No cache en fetch
    });

    if (!response.ok) {
      throw new Error(`WooCommerce API returned ${response.status}`);
    }

    const wcBrands: WooCommerceBrand[] = await response.json();

    console.log(`[Brands] ✅ Fetched ${wcBrands.length} brands from WooCommerce`);

    // Mapear a nuestro formato
    const brands: BrandMetadata[] = wcBrands.map((brand) => ({
      id: brand.id,
      name: brand.name,
      slug: brand.slug,
      imageSrc: brand.image?.src // Fuente A: directo desde WooCommerce
    }));

    return brands;
  } catch (error) {
    console.error('[Brands] Error fetching from WooCommerce:', error);
    throw error;
  }
}

/**
 * Enriquecer marcas con logos desde assets locales (Fuente C)
 * Si imageSrc ya existe (Fuente A), no sobrescribir
 */
function enrichWithLocalLogos(brands: BrandMetadata[]): BrandMetadata[] {
  let localLogosFound = 0;

  const enriched = brands.map((brand) => {
    // Si ya tiene imageSrc desde WooCommerce (Fuente A), mantenerlo
    if (brand.imageSrc) {
      return brand;
    }

    // Intentar resolver desde assets locales (Fuente C)
    const localLogo = resolveLocalLogoAsset(brand.slug);

    if (localLogo) {
      localLogosFound++;
      return {
        ...brand,
        imageSrc: localLogo
      };
    }

    // Sin logo
    return brand;
  });

  console.log(`[Brands] 📁 Found ${localLogosFound} logos in local assets`);

  return enriched;
}

// ============================================
// PUBLIC API
// ============================================

/**
 * Obtener todas las marcas con metadata y logos resueltos
 * Cache: 10 minutos
 */
export async function fetchAllBrandsWithMeta(): Promise<BrandMetadata[]> {
  // Intentar desde cache
  const cached = getCached();
  if (cached) {
    console.log('[Brands] ✅ Serving from cache');
    return cached;
  }

  console.log('[Brands] Cache miss, fetching fresh data...');

  try {
    // Fuente A: WooCommerce Brands API (con image.src)
    let brands = await fetchBrandsFromWooCommerce();

    // Fuente C: Enriquecer con logos locales (si no tienen de WooCommerce)
    brands = enrichWithLocalLogos(brands);

    // Estadísticas
    const withLogo = brands.filter((b) => b.imageSrc).length;
    const total = brands.length;
    console.log(`[Brands] source=A+C logoOK=${withLogo}/${total}`);

    // Listar marcas sin logo para referencia
    const withoutLogo = brands.filter((b) => !b.imageSrc);
    if (withoutLogo.length > 0) {
      console.log('[Brands] ⚠️  Brands without logo:', withoutLogo.map(b => b.slug).join(', '));
    }

    // Guardar en cache
    setCache(brands);

    return brands;
  } catch (error) {
    console.error('[Brands] Fatal error fetching brands:', error);
    // En caso de error, retornar array vacío
    return [];
  }
}

/**
 * Obtener mapa de ID → Brand Metadata
 * Útil para lookups rápidos por ID
 */
export async function getBrandMap(): Promise<Map<number, BrandMetadata>> {
  const brands = await fetchAllBrandsWithMeta();
  const map = new Map<number, BrandMetadata>();

  brands.forEach((brand) => {
    map.set(brand.id, brand);
  });

  return map;
}

/**
 * Obtener mapa de slug → ID
 * Útil para resolver slugs a IDs
 */
export async function getSlugToIdMap(): Promise<Map<string, number>> {
  const brands = await fetchAllBrandsWithMeta();
  const map = new Map<string, number>();

  brands.forEach((brand) => {
    map.set(brand.slug, brand.id);
  });

  return map;
}

/**
 * Resolver un slug a ID
 */
export async function resolveBrandSlugToId(slug: string): Promise<number | null> {
  const map = await getSlugToIdMap();
  return map.get(slug) || null;
}

/**
 * Obtener metadata de una marca por ID
 */
export async function getBrandById(id: number): Promise<BrandMetadata | null> {
  const map = await getBrandMap();
  return map.get(id) || null;
}
