'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { WooCommerceProduct } from '@/types/woocommerce';
import { useCart } from '@/hooks/useCart';
import { useWooCommerce } from '@/hooks/useWooCommerce';
import { formatPrice, parsePrice, isOnSale, getBestPrice } from '@/utils/currency';
import { MinusIcon, PlusIcon, ShoppingBagIcon, StarIcon, ShareIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';
import { ShareButton } from '../ui/ShareButton';
import { ProductCard } from './ProductCard';

interface ProductDetailsProps {
  slug: string;
}

function ProductDetailsSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:h-[calc(100vh-120px)]">
        <div className="space-y-3">
          <div className="aspect-square bg-gray-200 rounded-xl animate-pulse"></div>
          <div className="grid grid-cols-5 gap-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="aspect-square bg-gray-200 rounded-lg animate-pulse"></div>
            ))}
          </div>
        </div>
        <div className="space-y-6">
          <div className="h-8 bg-gray-200 rounded w-3/4 animate-pulse"></div>
          <div className="h-6 bg-gray-200 rounded w-1/2 animate-pulse"></div>
          <div className="h-12 bg-gray-200 rounded animate-pulse"></div>
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
  const [thumbnailStartIndex, setThumbnailStartIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'overview' | 'description' | 'specs'>('overview');
  const [relatedProducts, setRelatedProducts] = useState<WooCommerceProduct[]>([]);
  const [loadingRelated, setLoadingRelated] = useState(false);
  const { addToCart, isLoading: cartLoading } = useCart();
  const { fetchProductBySlug, fetchProducts } = useWooCommerce();

  useEffect(() => {
    async function loadProduct() {
      setLoading(true);
      setError(null);
      
      try {
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

  useEffect(() => {
    async function loadRelatedProducts() {
      if (!product || !product.categories || product.categories.length === 0) {
        return;
      }

      setLoadingRelated(true);

      try {
        const categoryId = product.categories[0].id;
        const response = await fetchProducts({
          category: categoryId,
          per_page: 8, 
          exclude: [product.id], 
          status: 'publish'
        });

        setRelatedProducts(response.data || []);
      } catch (err) {
        console.error('Error loading related products:', err);
        setRelatedProducts([]);
      } finally {
        setLoadingRelated(false);
      }
    }

    loadRelatedProducts();
  }, [product, fetchProducts]);

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

  const price = parsePrice(product.price);
  const regularPrice = parsePrice(product.regular_price);
  const salePrice = parsePrice(product.sale_price);
  const productOnSale = isOnSale(product.regular_price, product.sale_price);
  const rating = parseFloat(product.average_rating) || 0;

  return (
    <div className="text-black max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 relative">

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:h-[calc(100vh-120px)]">
        
        {/* COLUMNA IZQUIERDA: IMÁGENES */}
        <div className="flex flex-col space-y-4">
          {/* Imagen Principal */}
          <div className="flex-1 bg-gray-50 rounded-2xl overflow-hidden relative group">
            {product.images && product.images.length > 0 ? (
              <Image
                src={product.images[selectedImageIndex]?.src || product.images[0].src}
                alt={product.images[selectedImageIndex]?.alt || product.name}
                width={600}
                height={600}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                <div className="text-center">
                  <div className="w-20 h-20 bg-gray-200 rounded-lg mx-auto mb-2"></div>
                  <p>Sin imagen</p>
                </div>
              </div>
            )}
          </div>

          {/* Miniaturas con navegación */}
          {product.images && product.images.length > 1 && (
            <div className="relative">
              {/* Botón Anterior */}
              {thumbnailStartIndex > 0 && (
                <button
                  onClick={() => setThumbnailStartIndex(prev => Math.max(0, prev - 1))}
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-8 h-8 bg-white shadow-lg rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors z-10"
                >
                  <ChevronLeftIcon className="w-5 h-5 text-gray-600" />
                </button>
              )}

              {/* Miniaturas visibles */}
              <div className="grid grid-cols-5 gap-2">
                {product.images.slice(thumbnailStartIndex, thumbnailStartIndex + 5).map((image, index) => (
                  <button
                    key={thumbnailStartIndex + index}
                    onClick={() => setSelectedImageIndex(thumbnailStartIndex + index)}
                    className={`aspect-square bg-gray-50 rounded-lg overflow-hidden border-2 transition-all duration-200 hover:shadow-md ${
                      selectedImageIndex === thumbnailStartIndex + index 
                        ? 'border-servi_green shadow-md scale-105' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <Image
                      src={image.src}
                      alt={image.alt || product.name}
                      width={120}
                      height={120}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>

              {/* Botón Siguiente */}
              {product.images.length > thumbnailStartIndex + 5 && (
                <button
                  onClick={() => setThumbnailStartIndex(prev => Math.min(product.images.length - 5, prev + 1))}
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-8 h-8 bg-white shadow-lg rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors z-10"
                >
                  <ChevronRightIcon className="w-5 h-5 text-gray-600" />
                </button>
              )}

              {/* Indicador de posición */}
              {product.images.length > 5 && (
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex gap-1">
                  {Array.from({ length: Math.ceil(product.images.length / 5) }).map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setThumbnailStartIndex(index * 5)}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        Math.floor(thumbnailStartIndex / 5) === index
                          ? 'bg-servi_green'
                          : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* COLUMNA DERECHA: INFO Y TABS */}
        <div className="flex flex-col lg:overflow-hidden">
          
          {/* Header Fijo */}
          <div className="space-y-4 pb-6 border-b border-gray-200">
            {/* Título y Categoría */}
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-2">
                {product.name}
              </h1>
              {product.categories && product.categories.length > 0 && (
                <p className="text-servi_green font-medium">
                  {product.categories.map(cat => cat.name).join(' • ')}
                </p>
              )}
            </div>

            {/* Precio, Stock y Rating en una sola línea inteligente */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                {/* Precio */}
                {productOnSale ? (
                  <div className="flex items-center gap-2">
                    <span className="text-3xl font-bold text-servi_green">
                      {formatPrice(salePrice)}
                    </span>
                    <span className="text-lg text-gray-500 line-through">
                      {formatPrice(regularPrice)}
                    </span>
                    <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                      OFERTA
                    </span>
                  </div>
                ) : price > 0 ? (
                  <span className="text-3xl font-bold text-gray-900">
                    {formatPrice(price)}
                  </span>
                ) : (
                  <span className="text-xl text-gray-500">
                    Consultar precio
                  </span>
                )}

                {/* Stock */}
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${
                    product.stock_status === 'instock' ? 'bg-green-500' : 'bg-red-500'
                  }`}></div>
                  <span className={`text-sm font-medium ${
                    product.stock_status === 'instock' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {product.stock_status === 'instock' ? 'En Stock' : 'Agotado'}
                  </span>
                </div>
              </div>

              {/* Rating */}
              {rating > 0 && (
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, index) => {
                      const isFilled = index < Math.floor(rating);
                      const Icon = isFilled ? StarIconSolid : StarIcon;
                      return (
                        <Icon
                          key={index}
                          className={`w-5 h-5 ${isFilled ? 'text-yellow-400' : 'text-gray-300'}`}
                        />
                      );
                    })}
                  </div>
                  <span className="text-sm text-gray-600 font-medium">
                    {rating.toFixed(1)} ({product.rating_count})
                  </span>
                </div>
              )}
            </div>

            {/* Controles de Compra */}
            {product.stock_status === 'instock' && (
              <div className="flex items-center gap-4">
                <div className="flex items-center">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 border border-gray-300 rounded-l-lg hover:bg-gray-50 flex items-center justify-center"
                  >
                    <MinusIcon className="w-4 h-4" />
                  </button>
                  <div className="w-16 h-10 border-t border-b border-gray-300 flex items-center justify-center font-medium">
                    {quantity}
                  </div>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 border border-gray-300 rounded-r-lg hover:bg-gray-50 flex items-center justify-center"
                  >
                    <PlusIcon className="w-4 h-4" />
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  disabled={cartLoading}
                  className="flex-1 bg-servi_green text-white h-10 px-6 rounded-lg hover:bg-servi_dark transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 font-medium"
                >
                  <ShoppingBagIcon className="w-5 h-5" />
                  {cartLoading ? 'Agregando...' : 'Agregar al Carrito'}
                </button>
              </div>
            )}
          </div>

          {/* Tabs de Contenido */}
          <div className="flex-1 flex flex-col pt-6">
            {/* Tab Navigation */}
            <div className="flex border-b border-gray-200 mb-4 -mx-1">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'overview'
                    ? 'border-servi_green text-servi_green'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Resumen
              </button>
              {product.description && (
                <button
                  onClick={() => setActiveTab('description')}
                  className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === 'description'
                      ? 'border-servi_green text-servi_green'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Descripción
                </button>
              )}
              {product.attributes && product.attributes.length > 0 && (
                <button
                  onClick={() => setActiveTab('specs')}
                  className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === 'specs'
                      ? 'border-servi_green text-servi_green'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Especificaciones
                </button>
              )}
            </div>

            {/* Tab Content */}
            <div className="flex-1 overflow-y-auto pr-2">
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  {product.short_description && (
                    <div className="prose prose-gray max-w-none">
                      <div dangerouslySetInnerHTML={{ __html: product.short_description }} />
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-xl text-center">
                      <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">SKU</p>
                      <p className="font-bold text-gray-900">{product.sku || 'N/A'}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-xl text-center">
                      <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Peso</p>
                      <p className="font-bold text-gray-900">
                        {product.weight ? `${product.weight} kg` : 'N/A'}
                      </p>
                    </div>
                      <ShareButton 
            url={`${typeof window !== 'undefined' ? window.location.origin : ''}/tienda/${product.slug}`}
            title={product.name}
            description={product.short_description}
          />
                  </div>

                  {product.attributes && product.attributes.length > 0 && (
                    <div className="space-y-2">
                      <h3 className="font-semibold text-gray-900">Características principales:</h3>
                      <div className="space-y-1">
                        {product.attributes.slice(0, 3).map((attribute, index) => (
                          <div key={index} className="flex justify-between text-sm">
                            <span className="text-gray-600">{attribute.name}:</span>
                            <span className="font-medium text-gray-900">
                              {attribute.options.slice(0, 2).join(', ')}
                              {attribute.options.length > 2 && '...'}
                            </span>
                          </div>
                        ))}
                        {product.attributes.length > 3 && (
                          <button
                            onClick={() => setActiveTab('specs')}
                            className="text-servi_green text-sm hover:underline"
                          >
                            Ver todas las especificaciones →
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'description' && product.description && (
                <div className="prose prose-gray max-w-none max-h-96 overflow-y-auto pr-4">
                  <div dangerouslySetInnerHTML={{ __html: product.description }} />
                </div>
              )}

              {activeTab === 'specs' && product.attributes && product.attributes.length > 0 && (
                <div className="space-y-4">
                  {product.attributes.map((attribute, index) => (
                    <div key={index} className="pb-3 border-b border-gray-100 last:border-b-0">
                      <div className="flex justify-between items-start">
                        <dt className="font-medium text-gray-900 text-sm">{attribute.name}</dt>
                        <dd className="text-gray-700 text-sm text-right max-w-[60%]">
                          {attribute.options.join(', ')}
                        </dd>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <div className="mt-16 border-t border-gray-200 pt-16">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Productos Relacionados
            </h2>
            <p className="text-gray-600">
              Otros productos de la categoría{' '}
              <span className="font-medium text-servi_green">
                {product.categories?.[0]?.name}
              </span>
            </p>
          </div>

          {loadingRelated ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="animate-pulse">
                  <div className="aspect-square bg-gray-200 rounded-lg mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.slice(0, 4).map((relatedProduct) => (
                <ProductCard
                  key={relatedProduct.id}
                  product={relatedProduct}
                  showAddToCart={true}
                />
              ))}
            </div>
          )}

          {relatedProducts.length > 4 && (
            <div className="text-center mt-8">
              <a
                href={`/tienda?categories=${product.categories?.[0]?.id}`}
                className="inline-flex items-center px-6 py-3 border border-servi_green text-servi_green hover:bg-servi_green hover:text-white rounded-lg transition-colors duration-200"
              >
                Ver más productos de {product.categories?.[0]?.name}
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export { ProductDetails };