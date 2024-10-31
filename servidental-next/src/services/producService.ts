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

  // Convertimos los métodos a async
  async getAllProducts(): Promise<Product[]> {
    return this.products;
  }

  async getProductBySlug(slug: string): Promise<Product | undefined> {
    return this.products.find(p => p.slug === slug);
  }

  async getProductsByCategory(category: ProductCategory): Promise<Product[]> {
    return this.products.filter(p => p.category === category);
  }

  async getProductsByBrand(brand: ProductBrand): Promise<Product[]> {
    return this.products.filter(p => p.brand.name === brand);
  }

  async searchProducts(query: string): Promise<Product[]> {
    const searchTerm = query.toLowerCase();
    return this.products.filter(product => 
      product.name.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm) ||
      product.features.unique.items.some(item => 
        item.toLowerCase().includes(searchTerm)
      )
    );
  }

  async getRelatedProducts(productId: string, limit: number = 4): Promise<Product[]> {
    const product = this.products.find(p => p.id === productId);
    if (!product) return [];

    return this.products
      .filter(p => 
        p.id !== productId && 
        (p.category === product.category || p.brand.name === product.brand.name)
      )
      .slice(0, limit);
  }

  async getCategories(): Promise<ProductCategory[]> {
    return Array.from(new Set(this.products.map(p => p.category)));
  }

  async getBrands(): Promise<ProductBrand[]> {
    return Array.from(new Set(this.products.map(p => p.brand.name)));
  }

  // Este método puede permanecer síncrono ya que es interno
  importProducts(products: Product[]): void {
    this.products = products;
  }
}

export const productService = ProductService.getInstance();