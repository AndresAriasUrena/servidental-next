/**
 * Brand logo utilities for ServidentalCR
 */

// Brand logo mapping based on available assets
const BRAND_LOGOS: Record<string, string> = {
  // Match common brand names (case insensitive) to their logo files
  'bioart': '/assets/logos/brands/bioart_logo.avif',
  'coxo': '/assets/logos/brands/coxo_logo.avif',
  'dof': '/assets/logos/brands/dof_logo.avif',
  'meyer': '/assets/logos/brands/meyer.avif',
  'micro nx': '/assets/logos/brands/micro_nx_logo.avif',
  'micro-nx': '/assets/logos/brands/micro_nx_logo.avif',
  'micronx': '/assets/logos/brands/micro_nx_logo.avif',
  'siger': '/assets/logos/brands/siger_logo.avif',
  'tpc': '/assets/logos/brands/tpc_logo.avif',
  'xpect vision': '/assets/logos/brands/xpect-vision.avif',
  'xpect-vision': '/assets/logos/brands/xpect-vision.avif',
  'dentech': '/assets/logos/brands/DenTech.avif',
  'den-tech': '/assets/logos/brands/DenTech.avif',
  'dentafilm': '/assets/logos/brands/DentaFilm.avif',
  'denta-film': '/assets/logos/brands/DentaFilm.avif',
  'launca': '/assets/logos/brands/Launca.avif',
  'elec': '/assets/logos/brands/elec.avif',
  'epdent': '/assets/logos/brands/epdent.avif',
  'ep-dent': '/assets/logos/brands/epdent.avif',
  'mdmed': '/assets/logos/brands/mdmed.avif',
  'md-med': '/assets/logos/brands/mdmed.avif',
  'sturdy': '/assets/logos/brands/sturdy_logo.avif',
  'whitebrand': '/assets/logos/brands/whitebrand.png',
  'white brand': '/assets/logos/brands/whitebrand.png',
  'artelectron': '/assets/logos/brands/ARTElectron.avif',
  'art electron': '/assets/logos/brands/ARTElectron.avif',
  'dimed': '/assets/logos/brands/DIMED.avif',
  'fame': '/assets/logos/brands/FAME.avif',
  'dentofrim': '/assets/logos/brands/DentaFrim.avif',
  'dentafrim': '/assets/logos/brands/DentaFrim.avif',
  'denta frim': '/assets/logos/brands/DentaFrim.avif'
};

/**
 * Gets the logo path for a brand name
 * @param brandName - The brand name to lookup
 * @returns The logo path or null if not found
 */
export function getBrandLogo(brandName: string): string | null {
  if (!brandName) {
    console.log('🔍 getBrandLogo: No brand name provided');
    return null;
  }
  
  // Normalize brand name for lookup
  const normalizedBrand = brandName.toLowerCase().trim();
  
  console.log(`🔍 getBrandLogo: Looking for logo for brand "${brandName}" (normalized: "${normalizedBrand}")`);
  
  // Direct match
  if (BRAND_LOGOS[normalizedBrand]) {
    console.log(`✅ getBrandLogo: Found direct match for "${normalizedBrand}" -> ${BRAND_LOGOS[normalizedBrand]}`);
    return BRAND_LOGOS[normalizedBrand];
  }
  
  // Try partial matches for compound brand names
  for (const [key, logo] of Object.entries(BRAND_LOGOS)) {
    if (normalizedBrand.includes(key) || key.includes(normalizedBrand)) {
      console.log(`✅ getBrandLogo: Found partial match "${key}" for "${normalizedBrand}" -> ${logo}`);
      return logo;
    }
  }
  
  console.log(`❌ getBrandLogo: No logo found for "${brandName}" (normalized: "${normalizedBrand}")`);
  console.log('🔍 Available brand keys:', Object.keys(BRAND_LOGOS));
  
  return null;
}

/**
 * Gets brand logo by product name as fallback
 * @param productName - The product name to analyze
 * @returns The logo path or null if not found
 */
export function getBrandLogoByProductName(productName: string): string | null {
  if (!productName) return null;
  
  const normalizedName = productName.toLowerCase();
  
  // Product name to brand mapping (temporary solution)
  const productBrandMapping: Record<string, string> = {
    'freedom': 'dof',
    'escaner intraoral freedom': 'dof',
    'escáner intraoral freedom': 'dof',
    'escaner de placas': 'fame',
    'escáner de placas': 'fame',
    'placas para imagenes': 'fame',
    'placas para imágenes': 'fame',
    'kit de piezas de mano': 'coxo',
    'pieza de mano': 'coxo',
    'piezas de mano': 'coxo',
  };
  
  // Check for matches in product name
  for (const [keyword, brand] of Object.entries(productBrandMapping)) {
    if (normalizedName.includes(keyword)) {
      return BRAND_LOGOS[brand] || null;
    }
  }
  
  // Also try to find brand names directly in product name
  for (const [brand, logo] of Object.entries(BRAND_LOGOS)) {
    if (normalizedName.includes(brand)) {
      return logo;
    }
  }
  
  return null;
}

/**
 * Gets all available brand logos
 * @returns Array of brand entries with name and logo path
 */
export function getAllBrandLogos(): Array<{ name: string; logo: string }> {
  return Object.entries(BRAND_LOGOS).map(([name, logo]) => ({
    name,
    logo
  }));
}

/**
 * Checks if a brand logo is available
 * @param brandName - The brand name to check
 * @returns True if logo is available
 */
export function hasBrandLogo(brandName: string): boolean {
  return getBrandLogo(brandName) !== null;
}