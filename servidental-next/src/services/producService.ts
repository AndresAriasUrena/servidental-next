// src/services/productService.ts
import { Product, ProductCategory, ProductBrand } from '@/types/product';

export class ProductService {
  private static instance: ProductService;
  private products: Product[];

  private constructor() {
    this.products = [];
  }

  static getInstance(): ProductService {
    if (!ProductService.instance) {
      ProductService.instance = new ProductService();
    }
    return ProductService.instance;
  }

  // Getters básicos
  getAllProducts(): Product[] {
    return this.products;
  }

  getProductBySlug(slug: string): Product | undefined {
    return this.products.find(p => p.slug === slug);
  }

  getProductsByCategory(category: ProductCategory): Product[] {
    return this.products.filter(p => p.category === category);
  }

  getProductsByBrand(brand: ProductBrand): Product[] {
    return this.products.filter(p => p.brand.name === brand);
  }

  // Búsqueda y filtrado
  searchProducts(query: string): Product[] {
    const searchTerm = query.toLowerCase();
    return this.products.filter(product => 
      product.name.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm) ||
      product.features.unique.items.some(item => 
        item.toLowerCase().includes(searchTerm)
      )
    );
  }

  // Productos relacionados
  getRelatedProducts(productId: string, limit: number = 4): Product[] {
    const product = this.products.find(p => p.id === productId);
    if (!product) return [];

    return this.products
      .filter(p => 
        p.id !== productId && 
        (p.category === product.category || p.brand.name === product.brand.name)
      )
      .slice(0, limit);
  }

  // Categorías y marcas
  getCategories(): ProductCategory[] {
    return Array.from(new Set(this.products.map(p => p.category)));
  }

  getBrands(): ProductBrand[] {
    return Array.from(new Set(this.products.map(p => p.brand.name)));
  }

  // Importación de datos
  importProducts(products: Product[]): void {
    this.products = products;
  }
}

export const productService = ProductService.getInstance();