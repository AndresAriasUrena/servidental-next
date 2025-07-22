'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { WooCommerceProduct } from '@/types/woocommerce';
import { useCart } from '@/hooks/useCart';
import { useWooCommerce } from '@/hooks/useWooCommerce';
import { MinusIcon, PlusIcon, ShoppingBagIcon, StarIcon } from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';
import { ShareButton } from '../ui/ShareButton';

interface ProductDetailsProps {
  slug: string;
}

function ProductDetailsSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-4">
          <div className="aspect-square bg-gray-200 rounded-lg animate-pulse"></div>
          <div className="grid grid-cols-4 gap-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="aspect-square bg-gray-200 rounded-lg animate-pulse"></div>
            ))}
          </div>
        </div>
        <div className="space-y-6">
          <div className="h-8 bg-gray-200 rounded w-3/4 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
          <div className="h-6 bg-gray-200 rounded w-1/3 animate-pulse"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProductDetails({ slug }: ProductDetailsProps) {
  const [product, setProduct] = useState<WooCommerceProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { addToCart, isLoading: cartLoading } = useCart();
  const { fetchProductBySlug } = useWooCommerce();

  useEffect(() => {
    async function loadProduct() {
      setLoading(true);
      setError(null);
      
      try {
        // Buscar producto por slug
        const product = await fetchProductBySlug(slug);
        setProduct(product);
      } catch (err) {
        console.error('Error loading product:', err);
        setError('Producto no encontrado');
      } finally {
        setLoading(false);
      }
    }

    loadProduct();
  }, [slug, fetchProductBySlug]);

  const handleAddToCart = async () => {
    if (!product) return;
    
    try {
      await addToCart(product, quantity);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  if (loading) {
    return <ProductDetailsSkeleton />;
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Error</h1>
        <p className="text-gray-600 mb-8">{error}</p>
        <a 
          href="/tienda" 
          className="bg-servi_green text-white px-6 py-3 rounded-md hover:bg-servi_dark transition-colors"
        >
          Volver a la tienda
        </a>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Producto no encontrado</h1>
        <p className="text-gray-600 mb-8">El producto que buscas no existe o ha sido removido.</p>
        <a 
          href="/tienda" 
          className="bg-servi_green text-white px-6 py-3 rounded-md hover:bg-servi_dark transition-colors"
        >
          Volver a la tienda
        </a>
      </div>
    );
  }

  const price = parseFloat(product.price) || 0;
  const isOnSale = product.on_sale && parseFloat(product.sale_price) > 0;
  const rating = parseFloat(product.average_rating) || 0;

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
            
            {/* Categories and Rating */}
            <div className="flex items-center justify-between">
              {product.categories && product.categories.length > 0 && (
                <p className="text-sm text-gray-500">
                  Categoría: {product.categories.map(cat => cat.name).join(', ')}
                </p>
              )}
              
              {/* Rating */}
              {rating > 0 && (
                <div className="flex items-center space-x-1">
                  {Array.from({ length: 5 }).map((_, index) => {
                    const isFilled = index < Math.floor(rating);
                    const Icon = isFilled ? StarIconSolid : StarIcon;
                    return (
                      <Icon
                        key={index}
                        className={`w-4 h-4 ${isFilled ? 'text-yellow-400' : 'text-gray-300'}`}
                      />
                    );
                  })}
                  <span className="text-sm text-gray-500 ml-2">
                    ({product.rating_count} reseñas)
                  </span>
                </div>
              )}
            </div>
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
                disabled={cartLoading}
                className="w-full bg-servi_green text-white py-3 px-6 rounded-md hover:bg-servi_dark transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <ShoppingBagIcon className="w-5 h-5" />
                {cartLoading ? 'Agregando...' : `Agregar al carrito (${quantity})`}
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

          {/* Additional Product Info */}
          <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
            <div className="text-center">
              <p className="text-sm text-gray-500">SKU</p>
              <p className="font-medium text-gray-900">{product.sku || 'N/A'}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-500">Peso</p>
              <p className="font-medium text-gray-900">
                {product.weight ? `${product.weight} kg` : 'N/A'}
              </p>
            </div>
          </div>

          {/* Share Button */}
          <ShareButton 
            url={`${typeof window !== 'undefined' ? window.location.origin : ''}/tienda/${product.slug}`}
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

export { ProductDetails };