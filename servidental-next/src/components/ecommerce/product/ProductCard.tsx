'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { WooCommerceProduct } from '@/types/woocommerce';
import { useCart } from '@/hooks/useCart';
import { formatPrice, parsePrice, isOnSale } from '@/utils/currency';
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

  const price = parsePrice(product.price);
  const regularPrice = parsePrice(product.regular_price);
  const salePrice = parsePrice(product.sale_price);
  const productOnSale = isOnSale(product.regular_price, product.sale_price);

  return (
    <Link href={`/tienda/${product.slug}`} className="group block">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200 overflow-hidden h-full">
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
          {productOnSale && (
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
              {productOnSale ? (
                <>
                  <span className="text-lg font-bold text-servi_green">
                    {formatPrice(salePrice)}
                  </span>
                  <span className="text-sm text-gray-500 line-through">
                    {formatPrice(regularPrice)}
                  </span>
                </>
              ) : price > 0 ? (
                <span className="text-lg font-bold text-gray-900">
                  {formatPrice(price)}
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
}