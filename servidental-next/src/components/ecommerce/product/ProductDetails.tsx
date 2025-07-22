'use client';

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
                  className={`aspect-square bg-gray-50 rounded-lg overflow-hidden border-2 ${
                    selectedImageIndex === index ? 'border-servi_green' : 'border-transparent'
                  }`}
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
            <div className={`w-3 h-3 rounded-full ${
              product.stock_status === 'instock' ? 'bg-green-400' : 'bg-red-400'
            }`}></div>
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
                {isLoading ? 'Agregando...' : `Agregar al carrito (${quantity})`}
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
            url={`${window.location.origin}/products/${product.slug}`}
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
}