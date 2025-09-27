'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { WooCommerceProduct } from '@/types/woocommerce';
import { useCart } from '@/hooks/useCart';
import { formatPrice, parsePrice, isOnSale } from '@/utils/currency';
import { getProductBrand } from '@/utils/woocommerce';
import { getBrandLogo } from '@/utils/brandLogos';
import { requiresQuote, sendQuoteToWhatsApp } from '@/utils/whatsapp';
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
            <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded z-10">
              Oferta
            </div>
          )}
          
          {/* Brand Logo */}
          {(() => {
            const brandName = getProductBrand(product);
            const brandLogo = getBrandLogo(brandName);
            
            if (brandLogo && brandName && !productOnSale) {
              return (
                <div className="absolute top-2 right-2 z-10">
                  <div className="bg-white/90 backdrop-blur-sm rounded-md p-1 shadow-sm">
                    <Image
                      src={brandLogo}
                      alt={`Logo de ${brandName}`}
                      width={40}
                      height={20}
                      className="max-w-[40px] max-h-[20px] object-contain"
                    />
                  </div>
                </div>
              );
            }
            return null;
          })()}
          
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

          {/* Add to Cart or Quote Button */}
          {showAddToCart && product.stock_status === 'instock' && (
            requiresQuote(product) ? (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  sendQuoteToWhatsApp(product);
                }}
                className="w-full bg-servi_green text-white py-2 px-4 rounded-md hover:bg-servi_dark transition-colors duration-200 flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.703"/>
                </svg>
                Solicitar Cotización
              </button>
            ) : (
              <button
                onClick={handleAddToCart}
                disabled={isLoading}
                className="w-full bg-servi_green text-white py-2 px-4 rounded-md hover:bg-servi_dark transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <ShoppingBagIcon className="w-4 h-4" />
                {isLoading ? 'Agregando...' : 'Agregar al carrito'}
              </button>
            )
          )}
        </div>
      </div>
    </Link>
  );
}