// create-ecommerce-components.js
// Generador automático de componentes React para e-commerce WooCommerce
// Ejecutar con: node create-ecommerce-components.js

require('dotenv').config();
const fs = require('fs');
const path = require('path');

class ECommerceComponentGenerator {
  constructor() {
    this.componentsDir = path.join(process.cwd(), 'src', 'components', 'ecommerce');
    this.hooksDir = path.join(process.cwd(), 'src', 'hooks');
    this.utilsDir = path.join(process.cwd(), 'src', 'utils');
  }

  async generateComponents() {
    console.log('🏪 Generando componentes e-commerce para ServidentalCR...');
    console.log('='.repeat(50));

    try {
      // Crear directorios
      this.ensureDirectories();

      // Generar componentes principales
      await this.generateProductComponents();
      await this.generateCartComponents();
      await this.generateCheckoutComponents();
      await this.generateHooks();
      await this.generateUtils();
      
      console.log('');
      console.log('✅ ¡Componentes e-commerce generados exitosamente!');
      this.printSummary();
      
    } catch (error) {
      console.error('❌ Error generando componentes:', error.message);
      process.exit(1);
    }
  }

  ensureDirectories() {
    console.log('📁 Creando estructura de directorios...');
    
    const dirs = [
      this.componentsDir,
      path.join(this.componentsDir, 'product'),
      path.join(this.componentsDir, 'cart'),
      path.join(this.componentsDir, 'checkout'),
      path.join(this.componentsDir, 'filters'),
      this.hooksDir,
      this.utilsDir
    ];

    dirs.forEach(dir => {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
        console.log(`   ✅ ${dir}`);
      }
    });
  }

  async generateProductComponents() {
    console.log('🛍️ Generando componentes de productos...');

    // ProductGrid Component
    const productGridComponent = `'use client';

import React, { useState, useEffect } from 'react';
import { WooCommerceProduct, ProductFilters } from '@/types/woocommerce';
import { ProductCard } from './ProductCard';
import { ProductFiltersPanel } from '../filters/ProductFiltersPanel';
import { useWooCommerce } from '@/hooks/useWooCommerce';

interface ProductGridProps {
  initialProducts?: WooCommerceProduct[];
  showFilters?: boolean;
  perPage?: number;
  categoryId?: number;
}

export function ProductGrid({ 
  initialProducts = [], 
  showFilters = true, 
  perPage = 12,
  categoryId 
}: ProductGridProps) {
  const [products, setProducts] = useState<WooCommerceProduct[]>(initialProducts);
  const [filters, setFilters] = useState<ProductFilters>({});
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  
  const { fetchProducts } = useWooCommerce();

  useEffect(() => {
    loadProducts();
  }, [filters, currentPage, categoryId]);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const params = {
        per_page: perPage,
        page: currentPage,
        ...filters,
        ...(categoryId && { category: categoryId })
      };
      
      const response = await fetchProducts(params);
      setProducts(response.data);
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFiltersChange = (newFilters: ProductFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  return (
    <div className="w-full">
      <div className="flex flex-col lg:flex-row gap-8">
        {showFilters && (
          <div className="w-full lg:w-1/4">
            <ProductFiltersPanel 
              filters={filters}
              onChange={handleFiltersChange}
            />
          </div>
        )}
        
        <div className="flex-1">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: perPage }).map((_, index) => (
                <div key={index} className="animate-pulse">
                  <div className="bg-gray-200 aspect-square rounded-lg mb-4"></div>
                  <div className="bg-gray-200 h-4 rounded mb-2"></div>
                  <div className="bg-gray-200 h-4 rounded w-3/4"></div>
                </div>
              ))}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
              
              {products.length === 0 && !loading && (
                <div className="text-center py-12">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No se encontraron productos
                  </h3>
                  <p className="text-gray-500">
                    Intenta ajustar los filtros de búsqueda
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}`;

    // ProductCard Component
    const productCardComponent = `'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { WooCommerceProduct } from '@/types/woocommerce';
import { useCart } from '@/hooks/useCart';
import { ShoppingBagIcon } from '@heroicons/react/24/outline';

interface ProductCardProps {
  product: WooCommerceProduct;
  showAddToCart?: boolean;
}

export function ProductCard({ product, showAddToCart = true }: ProductCardProps) {
  const { addToCart, isLoading } = useCart();

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    try {
      await addToCart(product, 1);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const price = parseFloat(product.price) || 0;
  const regularPrice = parseFloat(product.regular_price) || 0;
  const salePrice = parseFloat(product.sale_price) || 0;
  const isOnSale = product.on_sale && salePrice > 0;

  return (
    <Link href={\`/products/\${product.slug}\`} className="group block">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200 overflow-hidden">
        {/* Product Image */}
        <div className="relative aspect-square bg-gray-50">
          {product.images && product.images.length > 0 ? (
            <Image
              src={product.images[0].src}
              alt={product.images[0].alt || product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-200"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-gray-400">Sin imagen</div>
            </div>
          )}
          
          {/* Sale Badge */}
          {isOnSale && (
            <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
              Oferta
            </div>
          )}
          
          {/* Stock Status */}
          {product.stock_status === 'outofstock' && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <span className="text-white font-medium">Agotado</span>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="p-4">
          <h3 className="text-sm font-medium text-gray-900 line-clamp-2 mb-2">
            {product.name}
          </h3>
          
          {/* Categories */}
          {product.categories && product.categories.length > 0 && (
            <p className="text-xs text-gray-500 mb-2">
              {product.categories[0].name}
            </p>
          )}

          {/* Price */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              {isOnSale ? (
                <>
                  <span className="text-lg font-bold text-servi_green">
                    ₡{salePrice.toLocaleString()}
                  </span>
                  <span className="text-sm text-gray-500 line-through">
                    ₡{regularPrice.toLocaleString()}
                  </span>
                </>
              ) : price > 0 ? (
                <span className="text-lg font-bold text-gray-900">
                  ₡{price.toLocaleString()}
                </span>
              ) : (
                <span className="text-sm text-gray-500">
                  Consultar precio
                </span>
              )}
            </div>
          </div>

          {/* Add to Cart Button */}
          {showAddToCart && product.stock_status === 'instock' && (
            <button
              onClick={handleAddToCart}
              disabled={isLoading}
              className="w-full bg-servi_green text-white py-2 px-4 rounded-md hover:bg-servi_dark transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <ShoppingBagIcon className="w-4 h-4" />
              {isLoading ? 'Agregando...' : 'Agregar al carrito'}
            </button>
          )}
        </div>
      </div>
    </Link>
  );
}`;

    // ProductDetails Component
    const productDetailsComponent = `'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { WooCommerceProduct } from '@/types/woocommerce';
import { useCart } from '@/hooks/useCart';
import { MinusIcon, PlusIcon, ShoppingBagIcon } from '@heroicons/react/24/outline';
import { ShareButton } from '../ui/ShareButton';

interface ProductDetailsProps {
  product: WooCommerceProduct;
}

export function ProductDetails({ product }: ProductDetailsProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { addToCart, isLoading } = useCart();

  const handleAddToCart = async () => {
    try {
      await addToCart(product, quantity);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const price = parseFloat(product.price) || 0;
  const isOnSale = product.on_sale && parseFloat(product.sale_price) > 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          {/* Main Image */}
          <div className="aspect-square bg-gray-50 rounded-lg overflow-hidden">
            {product.images && product.images.length > 0 ? (
              <Image
                src={product.images[selectedImageIndex]?.src || product.images[0].src}
                alt={product.images[selectedImageIndex]?.alt || product.name}
                width={600}
                height={600}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                Sin imagen
              </div>
            )}
          </div>

          {/* Thumbnail Images */}
          {product.images && product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={\`aspect-square bg-gray-50 rounded-lg overflow-hidden border-2 \${
                    selectedImageIndex === index ? 'border-servi_green' : 'border-transparent'
                  }\`}
                >
                  <Image
                    src={image.src}
                    alt={image.alt || product.name}
                    width={150}
                    height={150}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {product.name}
            </h1>
            
            {/* Categories */}
            {product.categories && product.categories.length > 0 && (
              <p className="text-sm text-gray-500">
                Categoría: {product.categories.map(cat => cat.name).join(', ')}
              </p>
            )}
          </div>

          {/* Price */}
          <div className="flex items-center space-x-4">
            {isOnSale ? (
              <>
                <span className="text-3xl font-bold text-servi_green">
                  ₡{parseFloat(product.sale_price).toLocaleString()}
                </span>
                <span className="text-xl text-gray-500 line-through">
                  ₡{parseFloat(product.regular_price).toLocaleString()}
                </span>
                <span className="bg-red-100 text-red-800 text-sm px-2 py-1 rounded">
                  ¡Oferta!
                </span>
              </>
            ) : price > 0 ? (
              <span className="text-3xl font-bold text-gray-900">
                ₡{price.toLocaleString()}
              </span>
            ) : (
              <span className="text-xl text-gray-500">
                Consultar precio
              </span>
            )}
          </div>

          {/* Stock Status */}
          <div className="flex items-center space-x-2">
            <div className={\`w-3 h-3 rounded-full \${
              product.stock_status === 'instock' ? 'bg-green-400' : 'bg-red-400'
            }\`}></div>
            <span className="text-sm text-gray-600">
              {product.stock_status === 'instock' ? 'En stock' : 'Agotado'}
            </span>
          </div>

          {/* Short Description */}
          {product.short_description && (
            <div className="prose prose-sm max-w-none">
              <div dangerouslySetInnerHTML={{ __html: product.short_description }} />
            </div>
          )}

          {/* Quantity and Add to Cart */}
          {product.stock_status === 'instock' && (
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <label className="text-sm font-medium text-gray-700">
                  Cantidad:
                </label>
                <div className="flex items-center border border-gray-300 rounded-md">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:bg-gray-50"
                  >
                    <MinusIcon className="w-4 h-4" />
                  </button>
                  <span className="px-4 py-2 border-x border-gray-300 min-w-[60px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 hover:bg-gray-50"
                  >
                    <PlusIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={isLoading}
                className="w-full bg-servi_green text-white py-3 px-6 rounded-md hover:bg-servi_dark transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <ShoppingBagIcon className="w-5 h-5" />
                {isLoading ? 'Agregando...' : \`Agregar al carrito (\${quantity})\`}
              </button>
            </div>
          )}

          {/* Product Attributes */}
          {product.attributes && product.attributes.length > 0 && (
            <div className="border-t pt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Especificaciones
              </h3>
              <dl className="space-y-3">
                {product.attributes.map((attribute, index) => (
                  <div key={index} className="flex justify-between">
                    <dt className="text-sm text-gray-600">{attribute.name}:</dt>
                    <dd className="text-sm text-gray-900">
                      {attribute.options.join(', ')}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          )}

          {/* Share Button */}
          <ShareButton 
            url={\`\${window.location.origin}/products/\${product.slug}\`}
            title={product.name}
            description={product.short_description}
          />
        </div>
      </div>

      {/* Full Description */}
      {product.description && (
        <div className="mt-12 border-t pt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Descripción del producto
          </h2>
          <div className="prose max-w-none">
            <div dangerouslySetInnerHTML={{ __html: product.description }} />
          </div>
        </div>
      )}
    </div>
  );
}`;

    // Write product components
    fs.writeFileSync(path.join(this.componentsDir, 'product', 'ProductGrid.tsx'), productGridComponent);
    fs.writeFileSync(path.join(this.componentsDir, 'product', 'ProductCard.tsx'), productCardComponent);
    fs.writeFileSync(path.join(this.componentsDir, 'product', 'ProductDetails.tsx'), productDetailsComponent);

    console.log('   ✅ ProductGrid.tsx');
    console.log('   ✅ ProductCard.tsx');
    console.log('   ✅ ProductDetails.tsx');
  }

  async generateCartComponents() {
    console.log('🛒 Generando componentes de carrito...');

    // Cart Component
    const cartComponent = `'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/hooks/useCart';
import { XMarkIcon, MinusIcon, PlusIcon } from '@heroicons/react/24/outline';

export function Cart() {
  const { cart, updateQuantity, removeFromCart, clearCart, isLoading } = useCart();

  if (cart.items.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Tu carrito está vacío
        </h2>
        <p className="text-gray-600 mb-8">
          Agrega algunos productos para comenzar tu compra
        </p>
        <Link
          href="/products"
          className="bg-servi_green text-white px-6 py-3 rounded-md hover:bg-servi_dark transition-colors"
        >
          Ver productos
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Carrito de compras
        </h1>
        <button
          onClick={clearCart}
          className="text-red-600 hover:text-red-800 text-sm font-medium"
        >
          Vaciar carrito
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cart.items.map((item) => (
            <div
              key={item.id}
              className="flex items-center space-x-4 bg-white border border-gray-200 rounded-lg p-4"
            >
              {/* Product Image */}
              <div className="flex-shrink-0 w-20 h-20 bg-gray-50 rounded-lg overflow-hidden">
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    Sin imagen
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="flex-grow">
                <h3 className="font-medium text-gray-900">
                  <Link href={\`/products/\${item.slug}\`} className="hover:text-servi_green">
                    {item.name}
                  </Link>
                </h3>
                {item.sku && (
                  <p className="text-sm text-gray-500">SKU: {item.sku}</p>
                )}
                <p className="text-sm text-gray-600">
                  ₡{item.price.toLocaleString()} c/u
                </p>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  disabled={isLoading}
                  className="p-1 rounded-md hover:bg-gray-100 disabled:opacity-50"
                >
                  <MinusIcon className="w-4 h-4" />
                </button>
                <span className="w-8 text-center">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  disabled={isLoading}
                  className="p-1 rounded-md hover:bg-gray-100 disabled:opacity-50"
                >
                  <PlusIcon className="w-4 h-4" />
                </button>
              </div>

              {/* Item Total */}
              <div className="text-right">
                <p className="font-medium text-gray-900">
                  ₡{item.subtotal.toLocaleString()}
                </p>
              </div>

              {/* Remove Button */}
              <button
                onClick={() => removeFromCart(item.id)}
                disabled={isLoading}
                className="p-1 text-red-500 hover:text-red-700 disabled:opacity-50"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>

        {/* Cart Summary */}
        <div className="lg:col-span-1">
          <div className="bg-gray-50 rounded-lg p-6 sticky top-4">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Resumen del pedido
            </h2>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span>Subtotal ({cart.totalQuantity} artículos)</span>
                <span>₡{cart.total.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Envío</span>
                <span>Por calcular</span>
              </div>
              <div className="border-t pt-3">
                <div className="flex justify-between font-medium text-lg">
                  <span>Total</span>
                  <span>₡{cart.total.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <Link
              href="/checkout"
              className="w-full bg-servi_green text-white py-3 px-4 rounded-md hover:bg-servi_dark transition-colors text-center block"
            >
              Proceder al checkout
            </Link>
            
            <Link
              href="/products"
              className="w-full text-center text-servi_green hover:text-servi_dark mt-4 block"
            >
              Continuar comprando
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}`;

    // MiniCart Component
    const miniCartComponent = `'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/hooks/useCart';
import { ShoppingBagIcon, XMarkIcon } from '@heroicons/react/24/outline';

export function MiniCart() {
  const [isOpen, setIsOpen] = useState(false);
  const { cart, removeFromCart } = useCart();

  return (
    <div className="relative">
      {/* Cart Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-700 hover:text-servi_green transition-colors"
      >
        <ShoppingBagIcon className="w-6 h-6" />
        {cart.totalQuantity > 0 && (
          <span className="absolute -top-1 -right-1 bg-servi_green text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {cart.totalQuantity}
          </span>
        )}
      </button>

      {/* Mini Cart Dropdown */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 top-full mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
            <div className="p-4">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Carrito ({cart.totalQuantity})
              </h3>
              
              {cart.items.length === 0 ? (
                <p className="text-gray-500 text-center py-4">
                  Tu carrito está vacío
                </p>
              ) : (
                <>
                  <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
                    {cart.items.map((item) => (
                      <div key={item.id} className="flex items-center space-x-3">
                        <div className="flex-shrink-0 w-12 h-12 bg-gray-50 rounded overflow-hidden">
                          {item.image ? (
                            <Image
                              src={item.image}
                              alt={item.name}
                              width={48}
                              height={48}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-gray-200" />
                          )}
                        </div>
                        <div className="flex-grow min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {item.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            {item.quantity} x ₡{item.price.toLocaleString()}
                          </p>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <XMarkIcon className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                  
                  <div className="border-t pt-4">
                    <div className="flex justify-between font-medium text-lg mb-4">
                      <span>Total:</span>
                      <span>₡{cart.total.toLocaleString()}</span>
                    </div>
                    
                    <div className="space-y-2">
                      <Link
                        href="/cart"
                        onClick={() => setIsOpen(false)}
                        className="w-full bg-gray-100 text-gray-900 py-2 px-4 rounded-md hover:bg-gray-200 transition-colors text-center block"
                      >
                        Ver carrito
                      </Link>
                      <Link
                        href="/checkout"
                        onClick={() => setIsOpen(false)}
                        className="w-full bg-servi_green text-white py-2 px-4 rounded-md hover:bg-servi_dark transition-colors text-center block"
                      >
                        Checkout
                      </Link>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}`;

    fs.writeFileSync(path.join(this.componentsDir, 'cart', 'Cart.tsx'), cartComponent);
    fs.writeFileSync(path.join(this.componentsDir, 'cart', 'MiniCart.tsx'), miniCartComponent);

    console.log('   ✅ Cart.tsx');
    console.log('   ✅ MiniCart.tsx');
  }

  async generateCheckoutComponents() {
    console.log('💳 Generando componentes de checkout...');

    // Checkout Component
    const checkoutComponent = `'use client';

import React, { useState } from 'react';
import { useCart } from '@/hooks/useCart';
import { BillingAddress, ShippingAddress } from '@/types/woocommerce';

interface CheckoutFormData {
  billing: BillingAddress;
  shipping: ShippingAddress;
  payment_method: string;
  customer_note: string;
  terms_accepted: boolean;
}

export function Checkout() {
  const { cart, clearCart } = useCart();
  const [formData, setFormData] = useState<CheckoutFormData>({
    billing: {
      first_name: '',
      last_name: '',
      company: '',
      address_1: '',
      address_2: '',
      city: '',
      state: '',
      postcode: '',
      country: 'CR',
      email: '',
      phone: ''
    },
    shipping: {
      first_name: '',
      last_name: '',
      company: '',
      address_1: '',
      address_2: '',
      city: '',
      state: '',
      postcode: '',
      country: 'CR'
    },
    payment_method: 'cod',
    customer_note: '',
    terms_accepted: false
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [useShippingForBilling, setUseShippingForBilling] = useState(true);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.terms_accepted) {
      alert('Debe aceptar los términos y condiciones');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Aquí iría la lógica para crear la orden en WooCommerce
      console.log('Creating order with:', { formData, cart });
      
      // Simular procesamiento
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Limpiar carrito después de orden exitosa
      clearCart();
      
      // Redirigir a página de éxito
      window.location.href = '/checkout/success';
      
    } catch (error) {
      console.error('Error creating order:', error);
      alert('Error al procesar la orden. Inténtalo nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (cart.items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          No hay productos en el carrito
        </h1>
        <p className="text-gray-600 mb-8">
          Agrega algunos productos antes de proceder al checkout
        </p>
        <a
          href="/products"
          className="bg-servi_green text-white px-6 py-3 rounded-md hover:bg-servi_dark transition-colors"
        >
          Ver productos
        </a>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Billing & Shipping Info */}
          <div className="space-y-8">
            {/* Billing Address */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Información de facturación
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Nombre *"
                  required
                  value={formData.billing.first_name}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    billing: { ...prev.billing, first_name: e.target.value }
                  }))}
                  className="border border-gray-300 rounded-md px-3 py-2"
                />
                <input
                  type="text"
                  placeholder="Apellidos *"
                  required
                  value={formData.billing.last_name}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    billing: { ...prev.billing, last_name: e.target.value }
                  }))}
                  className="border border-gray-300 rounded-md px-3 py-2"
                />
                <input
                  type="email"
                  placeholder="Email *"
                  required
                  value={formData.billing.email}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    billing: { ...prev.billing, email: e.target.value }
                  }))}
                  className="border border-gray-300 rounded-md px-3 py-2 md:col-span-2"
                />
                <input
                  type="tel"
                  placeholder="Teléfono *"
                  required
                  value={formData.billing.phone}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    billing: { ...prev.billing, phone: e.target.value }
                  }))}
                  className="border border-gray-300 rounded-md px-3 py-2"
                />
                <input
                  type="text"
                  placeholder="Empresa (opcional)"
                  value={formData.billing.company}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    billing: { ...prev.billing, company: e.target.value }
                  }))}
                  className="border border-gray-300 rounded-md px-3 py-2"
                />
              </div>
            </div>

            {/* Shipping Address */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Dirección de envío
              </h2>
              <div className="mb-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={useShippingForBilling}
                    onChange={(e) => setUseShippingForBilling(e.target.checked)}
                    className="mr-2"
                  />
                  Usar la misma dirección para facturación y envío
                </label>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Dirección línea 1 *"
                  required
                  value={formData.shipping.address_1}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    shipping: { ...prev.shipping, address_1: e.target.value },
                    ...(useShippingForBilling && {
                      billing: { ...prev.billing, address_1: e.target.value }
                    })
                  }))}
                  className="border border-gray-300 rounded-md px-3 py-2 md:col-span-2"
                />
                <input
                  type="text"
                  placeholder="Dirección línea 2 (opcional)"
                  value={formData.shipping.address_2}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    shipping: { ...prev.shipping, address_2: e.target.value },
                    ...(useShippingForBilling && {
                      billing: { ...prev.billing, address_2: e.target.value }
                    })
                  }))}
                  className="border border-gray-300 rounded-md px-3 py-2 md:col-span-2"
                />
                <input
                  type="text"
                  placeholder="Ciudad *"
                  required
                  value={formData.shipping.city}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    shipping: { ...prev.shipping, city: e.target.value },
                    ...(useShippingForBilling && {
                      billing: { ...prev.billing, city: e.target.value }
                    })
                  }))}
                  className="border border-gray-300 rounded-md px-3 py-2"
                />
                <input
                  type="text"
                  placeholder="Provincia *"
                  required
                  value={formData.shipping.state}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    shipping: { ...prev.shipping, state: e.target.value },
                    ...(useShippingForBilling && {
                      billing: { ...prev.billing, state: e.target.value }
                    })
                  }))}
                  className="border border-gray-300 rounded-md px-3 py-2"
                />
                <input
                  type="text"
                  placeholder="Código postal *"
                  required
                  value={formData.shipping.postcode}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    shipping: { ...prev.shipping, postcode: e.target.value },
                    ...(useShippingForBilling && {
                      billing: { ...prev.billing, postcode: e.target.value }
                    })
                  }))}
                  className="border border-gray-300 rounded-md px-3 py-2 md:col-span-2"
                />
              </div>
            </div>

            {/* Payment Method */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Método de pago
              </h2>
              <div className="space-y-3">
                <label className="flex items-center p-3 border border-gray-300 rounded-md">
                  <input
                    type="radio"
                    name="payment_method"
                    value="cod"
                    checked={formData.payment_method === 'cod'}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      payment_method: e.target.value
                    }))}
                    className="mr-3"
                  />
                  <div>
                    <div className="font-medium">Contra entrega</div>
                    <div className="text-sm text-gray-500">
                      Paga en efectivo al recibir tu pedido
                    </div>
                  </div>
                </label>
                <label className="flex items-center p-3 border border-gray-300 rounded-md opacity-50">
                  <input
                    type="radio"
                    name="payment_method"
                    value="card"
                    disabled
                    className="mr-3"
                  />
                  <div>
                    <div className="font-medium">Tarjeta de crédito/débito</div>
                    <div className="text-sm text-gray-500">
                      Próximamente disponible
                    </div>
                  </div>
                </label>
              </div>
            </div>

            {/* Order Notes */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Notas del pedido
              </h2>
              <textarea
                placeholder="Notas sobre tu pedido (opcional)"
                rows={4}
                value={formData.customer_note}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  customer_note: e.target.value
                }))}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-gray-50 rounded-lg p-6 sticky top-4">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Resumen del pedido
              </h2>
              
              <div className="space-y-3 mb-6">
                {cart.items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span>{item.name} x {item.quantity}</span>
                    <span>₡{item.subtotal.toLocaleString()}</span>
                  </div>
                ))}
              </div>
              
              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₡{cart.total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Envío</span>
                  <span>Por calcular</span>
                </div>
                <div className="border-t pt-2">
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>₡{cart.total.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <label className="flex items-start">
                  <input
                    type="checkbox"
                    required
                    checked={formData.terms_accepted}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      terms_accepted: e.target.checked
                    }))}
                    className="mr-2 mt-1"
                  />
                  <span className="text-sm text-gray-600">
                    He leído y acepto los{' '}
                    <a href="/terms" className="text-servi_green hover:underline">
                      términos y condiciones
                    </a>
                  </span>
                </label>
              </div>

              <button
                type="submit"
                disabled={isSubmitting || !formData.terms_accepted}
                className="w-full mt-6 bg-servi_green text-white py-3 px-4 rounded-md hover:bg-servi_dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isSubmitting ? 'Procesando...' : 'Realizar pedido'}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}`;

    fs.writeFileSync(path.join(this.componentsDir, 'checkout', 'Checkout.tsx'), checkoutComponent);

    console.log('   ✅ Checkout.tsx');
  }

  async generateHooks() {
    console.log('🎣 Generando hooks personalizados...');

    // useWooCommerce Hook
    const useWooCommerceHook = `'use client';

import { useState, useCallback } from 'react';
import { WooCommerceProduct, WooCommerceCategory, PaginatedResponse } from '@/types/woocommerce';

export function useWooCommerce() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const makeRequest = useCallback(async (endpoint: string, options: RequestInit = {}) => {
    const baseUrl = process.env.NEXT_PUBLIC_WOOCOMMERCE_URL || 'https://wp.servidentalcr.com';
    const consumerKey = process.env.NEXT_PUBLIC_WOOCOMMERCE_CONSUMER_KEY;
    const consumerSecret = process.env.NEXT_PUBLIC_WOOCOMMERCE_CONSUMER_SECRET;

    const url = new URL(\`\${baseUrl}/wp-json/wc/v3/\${endpoint}\`);
    url.searchParams.append('consumer_key', consumerKey || '');
    url.searchParams.append('consumer_secret', consumerSecret || '');

    const response = await fetch(url.toString(), {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(\`API Error: \${response.status}\`);
    }

    const data = await response.json();
    const total = response.headers.get('x-wp-total');
    const totalPages = response.headers.get('x-wp-totalpages');

    return {
      data,
      total: total ? parseInt(total) : data.length,
      totalPages: totalPages ? parseInt(totalPages) : 1
    };
  }, []);

  const fetchProducts = useCallback(async (params: any = {}): Promise<PaginatedResponse<WooCommerceProduct>> => {
    setLoading(true);
    setError(null);
    
    try {
      const queryParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          queryParams.append(key, String(value));
        }
      });

      const endpoint = \`products?\${queryParams.toString()}\`;
      const response = await makeRequest(endpoint);
      
      return {
        data: response.data,
        total: response.total,
        total_pages: response.totalPages,
        current_page: params.page || 1,
        per_page: params.per_page || 12
      };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error fetching products';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [makeRequest]);

  const fetchProduct = useCallback(async (id: number): Promise<WooCommerceProduct> => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await makeRequest(\`products/\${id}\`);
      return response.data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error fetching product';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [makeRequest]);

  const fetchCategories = useCallback(async (): Promise<WooCommerceCategory[]> => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await makeRequest('products/categories?per_page=100');
      return response.data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error fetching categories';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [makeRequest]);

  const searchProducts = useCallback(async (query: string): Promise<WooCommerceProduct[]> => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await makeRequest(\`products?search=\${encodeURIComponent(query)}\`);
      return response.data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error searching products';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [makeRequest]);

  return {
    loading,
    error,
    fetchProducts,
    fetchProduct,
    fetchCategories,
    searchProducts
  };
}`;

    // useCart Hook
    const useCartHook = `'use client';

import { useState, useEffect, useCallback, createContext, useContext } from 'react';
import { WooCommerceProduct, Cart, CartItem, productToCartItem } from '@/types/woocommerce';

const CartContext = createContext<{
  cart: Cart;
  addToCart: (product: WooCommerceProduct, quantity: number) => Promise<void>;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  isLoading: boolean;
} | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Cart>({
    items: [],
    total: 0,
    totalItems: 0,
    totalQuantity: 0
  });
  const [isLoading, setIsLoading] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('servidental-cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        setCart(parsedCart);
      } catch (error) {
        console.error('Error parsing saved cart:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('servidental-cart', JSON.stringify(cart));
  }, [cart]);

  const calculateCartTotals = useCallback((items: CartItem[]): Cart => {
    const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
    const total = items.reduce((sum, item) => sum + item.subtotal, 0);
    
    return {
      items,
      total,
      totalItems: items.length,
      totalQuantity
    };
  }, []);

  const addToCart = useCallback(async (product: WooCommerceProduct, quantity: number = 1) => {
    setIsLoading(true);
    
    try {
      setCart(currentCart => {
        const existingItemIndex = currentCart.items.findIndex(item => item.id === product.id);
        let newItems: CartItem[];

        if (existingItemIndex >= 0) {
          // Update existing item
          newItems = currentCart.items.map((item, index) => 
            index === existingItemIndex 
              ? { ...item, quantity: item.quantity + quantity, subtotal: (item.quantity + quantity) * item.price }
              : item
          );
        } else {
          // Add new item
          const newItem = productToCartItem(product, quantity);
          newItems = [...currentCart.items, newItem];
        }

        return calculateCartTotals(newItems);
      });
    } catch (error) {
      console.error('Error adding to cart:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [calculateCartTotals]);

  const removeFromCart = useCallback((productId: number) => {
    setCart(currentCart => {
      const newItems = currentCart.items.filter(item => item.id !== productId);
      return calculateCartTotals(newItems);
    });
  }, [calculateCartTotals]);

  const updateQuantity = useCallback((productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCart(currentCart => {
      const newItems = currentCart.items.map(item => 
        item.id === productId 
          ? { ...item, quantity, subtotal: quantity * item.price }
          : item
      );
      return calculateCartTotals(newItems);
    });
  }, [calculateCartTotals, removeFromCart]);

  const clearCart = useCallback(() => {
    setCart({
      items: [],
      total: 0,
      totalItems: 0,
      totalQuantity: 0
    });
  }, []);

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      isLoading
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}`;

    fs.writeFileSync(path.join(this.hooksDir, 'useWooCommerce.ts'), useWooCommerceHook);
    fs.writeFileSync(path.join(this.hooksDir, 'useCart.tsx'), useCartHook);

    console.log('   ✅ useWooCommerce.ts');
    console.log('   ✅ useCart.tsx');
  }

  async generateUtils() {
    console.log('🛠️ Generando utilidades...');

    // WooCommerce utils
    const wooCommerceUtils = `import { WooCommerceProduct, ProductFilters } from '@/types/woocommerce';

/**
 * Formats price in Costa Rican Colón
 */
export function formatPrice(price: number | string): string {
  const numPrice = typeof price === 'string' ? parseFloat(price) : price;
  if (isNaN(numPrice) || numPrice === 0) return 'Consultar precio';
  
  return \`₡\${numPrice.toLocaleString('es-CR')}\`;
}

/**
 * Calculates discount percentage
 */
export function getDiscountPercentage(regularPrice: string, salePrice: string): number {
  const regular = parseFloat(regularPrice) || 0;
  const sale = parseFloat(salePrice) || 0;
  
  if (regular === 0 || sale === 0 || sale >= regular) return 0;
  
  return Math.round(((regular - sale) / regular) * 100);
}

/**
 * Checks if product is on sale
 */
export function isProductOnSale(product: WooCommerceProduct): boolean {
  return product.on_sale && parseFloat(product.sale_price) > 0;
}

/**
 * Gets product main image
 */
export function getProductMainImage(product: WooCommerceProduct): string {
  return product.images?.[0]?.src || '/images/placeholder-product.jpg';
}

/**
 * Gets product category name
 */
export function getProductCategory(product: WooCommerceProduct): string {
  return product.categories?.[0]?.name || 'Sin categoría';
}

/**
 * Gets product brand from attributes
 */
export function getProductBrand(product: WooCommerceProduct): string {
  const brandAttribute = product.attributes?.find(attr => 
    attr.name.toLowerCase().includes('marca') || 
    attr.name.toLowerCase().includes('brand')
  );
  
  return brandAttribute?.options?.[0] || '';
}

/**
 * Builds WooCommerce API URL with parameters
 */
export function buildWooCommerceUrl(endpoint: string, params: Record<string, any> = {}): string {
  const baseUrl = process.env.NEXT_PUBLIC_WOOCOMMERCE_URL || 'https://wp.servidentalcr.com';
  const consumerKey = process.env.NEXT_PUBLIC_WOOCOMMERCE_CONSUMER_KEY;
  const consumerSecret = process.env.NEXT_PUBLIC_WOOCOMMERCE_CONSUMER_SECRET;
  
  const url = new URL(\`\${baseUrl}/wp-json/wc/v3/\${endpoint}\`);
  
  // Add authentication
  url.searchParams.append('consumer_key', consumerKey || '');
  url.searchParams.append('consumer_secret', consumerSecret || '');
  
  // Add other parameters
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      url.searchParams.append(key, String(value));
    }
  });
  
  return url.toString();
}

/**
 * Filters products based on criteria
 */
export function filterProducts(products: WooCommerceProduct[], filters: ProductFilters): WooCommerceProduct[] {
  return products.filter(product => {
    // Category filter
    if (filters.categories && filters.categories.length > 0) {
      const hasCategory = product.categories.some(cat => 
        filters.categories!.includes(cat.id)
      );
      if (!hasCategory) return false;
    }
    
    // Price filter
    const price = parseFloat(product.price) || 0;
    if (filters.price_min && price < filters.price_min) return false;
    if (filters.price_max && price > filters.price_max) return false;
    
    // Sale filter
    if (filters.on_sale && !product.on_sale) return false;
    
    // Stock filter
    if (filters.in_stock && product.stock_status !== 'instock') return false;
    
    // Search filter
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      const matchesName = product.name.toLowerCase().includes(searchTerm);
      const matchesDescription = product.description.toLowerCase().includes(searchTerm);
      const matchesSKU = product.sku?.toLowerCase().includes(searchTerm);
      
      if (!matchesName && !matchesDescription && !matchesSKU) return false;
    }
    
    return true;
  });
}

/**
 * Sorts products by different criteria
 */
export function sortProducts(
  products: WooCommerceProduct[], 
  sortBy: 'name' | 'price' | 'date' | 'popularity' = 'name',
  order: 'asc' | 'desc' = 'asc'
): WooCommerceProduct[] {
  const sorted = [...products].sort((a, b) => {
    let comparison = 0;
    
    switch (sortBy) {
      case 'name':
        comparison = a.name.localeCompare(b.name);
        break;
      case 'price':
        const priceA = parseFloat(a.price) || 0;
        const priceB = parseFloat(b.price) || 0;
        comparison = priceA - priceB;
        break;
      case 'date':
        comparison = new Date(a.date_created).getTime() - new Date(b.date_created).getTime();
        break;
      case 'popularity':
        comparison = b.total_sales - a.total_sales;
        break;
      default:
        comparison = 0;
    }
    
    return order === 'desc' ? -comparison : comparison;
  });
  
  return sorted;
}

/**
 * Creates a product slug from name
 */
export function createProductSlug(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove accents
    .replace(/[^a-z0-9\\s-]/g, '') // Remove special chars
    .replace(/\\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Remove multiple hyphens
    .trim()
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
}

/**
 * Validates Costa Rican phone number
 */
export function validateCostaRicanPhone(phone: string): boolean {
  // Costa Rican phone patterns: +506 XXXX-XXXX, 506 XXXX-XXXX, XXXX-XXXX
  const phoneRegex = /^(\\+?506\\s?)?\\d{4}-?\\d{4}$/;
  return phoneRegex.test(phone.replace(/\\s/g, ''));
}

/**
 * Formats Costa Rican phone number
 */
export function formatCostaRicanPhone(phone: string): string {
  const cleaned = phone.replace(/\\D/g, '');
  
  if (cleaned.length === 8) {
    return \`\${cleaned.slice(0, 4)}-\${cleaned.slice(4)}\`;
  } else if (cleaned.length === 11 && cleaned.startsWith('506')) {
    return \`+506 \${cleaned.slice(3, 7)}-\${cleaned.slice(7)}\`;
  }
  
  return phone; // Return original if format doesn't match
}

/**
 * Gets shipping estimate for Costa Rica
 */
export function getShippingEstimate(province: string): { days: string; cost: number } {
  const shippingRates: Record<string, { days: string; cost: number }> = {
    'san-jose': { days: '1-2', cost: 2500 },
    'alajuela': { days: '1-2', cost: 2500 },
    'cartago': { days: '1-3', cost: 3000 },
    'heredia': { days: '1-2', cost: 2500 },
    'puntarenas': { days: '2-4', cost: 4000 },
    'guanacaste': { days: '2-4', cost: 4500 },
    'limon': { days: '3-5', cost: 5000 }
  };
  
  const provinceKey = province.toLowerCase().replace(/\\s+/g, '-');
  return shippingRates[provinceKey] || { days: '3-5', cost: 3500 };
}`;

    fs.writeFileSync(path.join(this.utilsDir, 'woocommerce.ts'), wooCommerceUtils);

    console.log('   ✅ woocommerce.ts');
  }

  printSummary() {
    console.log('');
    console.log('📊 Resumen de componentes generados:');
    console.log('='.repeat(50));
    console.log('🛍️ Componentes de productos:');
    console.log('   • ProductGrid.tsx - Grid responsivo de productos');
    console.log('   • ProductCard.tsx - Card individual de producto');
    console.log('   • ProductDetails.tsx - Página detalle de producto');
    console.log('');
    console.log('🛒 Componentes de carrito:');
    console.log('   • Cart.tsx - Página principal del carrito');
    console.log('   • MiniCart.tsx - Mini carrito para header');
    console.log('');
    console.log('💳 Componentes de checkout:');
    console.log('   • Checkout.tsx - Formulario completo de checkout');
    console.log('');
    console.log('🎣 Hooks personalizados:');
    console.log('   • useWooCommerce.ts - API calls a WooCommerce');
    console.log('   • useCart.tsx - Gestión del carrito + Context');
    console.log('');
    console.log('🛠️ Utilidades:');
    console.log('   • woocommerce.ts - Funciones helper para e-commerce');
    console.log('');
    console.log('🚀 Próximos pasos:');
    console.log('   1. Añadir CartProvider al layout principal');
    console.log('   2. Configurar variables de entorno públicas');
    console.log('   3. Crear páginas para usar los componentes');
    console.log('   4. Implementar filtros de productos');
    console.log('   5. Añadir MiniCart al header');
  }
}

// Ejecutar generador
if (require.main === module) {
  const generator = new ECommerceComponentGenerator();
  generator.generateComponents();
}

module.exports = ECommerceComponentGenerator;