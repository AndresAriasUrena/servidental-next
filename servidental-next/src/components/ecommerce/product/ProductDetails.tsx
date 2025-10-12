'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { WooCommerceProduct } from '@/types/woocommerce';
import { useCart } from '@/hooks/useCart';
import { useWooCommerce } from '@/hooks/useWooCommerce';
import { formatPrice, parsePrice, isOnSale, getBestPrice } from '@/utils/currency';
import { requiresQuote, sendQuoteToWhatsAppWithCustomerInfo } from '@/utils/whatsapp';
import { MinusIcon, PlusIcon, ShoppingBagIcon, StarIcon, ShareIcon } from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';
import { ShareButton } from '../ui/ShareButton';
import { ProductCard } from './ProductCard';
import { QuoteFormModal } from '../quote/QuoteFormModal';

// Helper functions for media handling
const getYouTubeVideoId = (url: string): string | null => {
  if (!url) return null;
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/);
  return match ? match[1] : null;
};

const getMetaDataValue = (product: WooCommerceProduct, key: string): string | null => {
  if (!product.meta_data) return null;
  const metaItem = product.meta_data.find(item => item.key === key);
  return metaItem?.value || null;
};

// Types for unified media gallery
interface MediaItem {
  type: 'image' | 'video';
  src: string;
  alt: string;
  thumbnail?: string;
  videoId?: string; // For YouTube videos
}

// Helper function to create unified media array
const getUnifiedMediaItems = (product: WooCommerceProduct): MediaItem[] => {
  const mediaItems: MediaItem[] = [];
  
  // Add product images first
  if (product.images && product.images.length > 0) {
    product.images.forEach(image => {
      mediaItems.push({
        type: 'image',
        src: image.src,
        alt: image.alt || product.name,
        thumbnail: image.src
      });
    });
  }
  
  // Add videos from custom fields
  const video1Url = getMetaDataValue(product, 'video_1_url');
  if (video1Url) {
    const videoId = getYouTubeVideoId(video1Url);
    if (videoId) {
      mediaItems.push({
        type: 'video',
        src: video1Url,
        alt: `Video demostrativo - ${product.name}`,
        thumbnail: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
        videoId
      });
    }
  }
  
  const video2Url = getMetaDataValue(product, 'video_2_url');
  if (video2Url) {
    const videoId = getYouTubeVideoId(video2Url);
    if (videoId) {
      mediaItems.push({
        type: 'video',
        src: video2Url,
        alt: `Video demostrativo #2 - ${product.name}`,
        thumbnail: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
        videoId
      });
    }
  }
  
  return mediaItems;
};

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
  const [selectedMediaIndex, setSelectedMediaIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState<WooCommerceProduct[]>([]);
  const [loadingRelated, setLoadingRelated] = useState(false);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
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
      // Emit custom event to open mini cart
      window.dispatchEvent(new CustomEvent('openMiniCart'));
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const handleQuoteRequest = () => {
    setIsQuoteModalOpen(true);
  };

  const handleQuoteSubmit = (fullName: string, email: string) => {
    if (!product) return;
    sendQuoteToWhatsAppWithCustomerInfo(product, fullName, email);
  };

  // Check if product has 'timbre' tag
  const hasTimbreTag = (product: WooCommerceProduct): boolean => {
    return product.tags?.some(tag => 
      tag.name.toLowerCase().includes('timbre')
    ) || false;
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* COLUMNA IZQUIERDA: GALERÍA MULTIMEDIA */}
        <div className="flex flex-col space-y-4">
          {/* Imagen/Video Principal */}
          <div className="aspect-square lg:aspect-[4/3] lg:max-h-[500px] bg-gray-50 rounded-2xl overflow-hidden relative group">
            {(() => {
              const mediaItems = getUnifiedMediaItems(product);
              const currentMedia = mediaItems[selectedMediaIndex] || mediaItems[0];
              
              if (!currentMedia) {
                return (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <div className="text-center">
                      <div className="w-20 h-20 bg-gray-200 rounded-lg mx-auto mb-2"></div>
                      <p>Sin contenido multimedia</p>
                    </div>
                  </div>
                );
              }
              
              if (currentMedia.type === 'video') {
                return (
                  <div className="w-full h-full bg-black rounded-2xl overflow-hidden">
                    <iframe
                      src={`https://www.youtube.com/embed/${currentMedia.videoId}`}
                      title={currentMedia.alt}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                );
              } else {
                return (
                  <Image
                    src={currentMedia.src}
                    alt={currentMedia.alt}
                    width={600}
                    height={600}
                    className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                );
              }
            })()}
          </div>

          {/* Miniaturas Multimedia en Grid */}
          {(() => {
            const mediaItems = getUnifiedMediaItems(product);
            
            if (mediaItems.length === 0) return null;
            
            return (
              <div className="space-y-2">
                <div className="grid grid-cols-6 gap-2">
                  {mediaItems.map((media, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedMediaIndex(index)}
                      className={`aspect-square bg-gray-50 rounded-lg overflow-hidden border-2 transition-all duration-200 hover:shadow-md relative ${
                        selectedMediaIndex === index 
                          ? 'border-servi_green shadow-md scale-105' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <Image
                        src={media.thumbnail || media.src}
                        alt={media.alt}
                        width={120}
                        height={120}
                        className="w-full h-full object-cover"
                      />
                      {/* Video indicator */}
                      {media.type === 'video' && (
                        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z"/>
                          </svg>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            );
          })()}
        </div>

        {/* COLUMNA DERECHA: INFO */}
        <div className="flex flex-col">
          
          {/* Header Fijo */}
          <div className="space-y-4 pb-6 border-b border-gray-200">
            {/* Título, Categoría y Logo de Marca */}
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-2">
                  {product.name}
                </h1>
                {product.categories && product.categories.length > 0 && (
                  <p className="text-servi_green font-medium">
                    {product.categories.map(cat => cat.name).join(' • ')}
                  </p>
                )}
              </div>
              
              {/* Logo de Marca - Posicionado en esquina superior derecha */}
              {product.primaryBrand?.logoUrl && (
                <div className="flex-shrink-0">
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3">
                    <Image
                      src={product.primaryBrand.logoUrl}
                      alt={`${product.primaryBrand.name} logo`}
                      width={120}
                      height={60}
                      className="max-w-[120px] max-h-[60px] object-contain"
                    />
                  </div>
                </div>
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

                {/* Timbre Note */}
                {hasTimbreTag(product) && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-3">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-blue-800 text-sm font-medium">
                        Incluye timbre odontológico
                      </span>
                    </div>
                  </div>
                )}

                {/* Stock */}
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${
                    product.stock_status === 'instock' ? 'bg-green-500' : 'bg-red-500'
                  }`}></div>
                  <span className={`text-sm font-medium ${
                    product.stock_status === 'instock' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {product.stock_status === 'instock' ? 'Entrega Inmediata' : 'Contra Pedido'}
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
            <div className="flex items-center gap-4">
              {!requiresQuote(product) && product.stock_status === 'instock' && (
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
                )}

                {requiresQuote(product) ? (
                  <button
                    onClick={handleQuoteRequest}
                    className="flex-1 bg-servi_green text-white h-10 px-6 rounded-lg hover:bg-servi_dark transition-colors duration-200 flex items-center justify-center gap-2 font-medium"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.703"/>
                    </svg>
                    Solicitar Cotización
                  </button>
                ) : product.stock_status === 'instock' ? (
                  <button
                    onClick={handleAddToCart}
                    disabled={cartLoading}
                    className="flex-1 bg-servi_green text-white h-10 px-6 rounded-lg hover:bg-servi_dark transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 font-medium"
                  >
                    <ShoppingBagIcon className="w-5 h-5" />
                    {cartLoading ? 'Agregando...' : 'Agregar al Carrito'}
                  </button>
                ) : (
                  <button
                    onClick={handleQuoteRequest}
                    className="flex-1 bg-servi_green text-white h-10 px-6 rounded-lg hover:bg-servi_dark transition-colors duration-200 flex items-center justify-center gap-2 font-medium"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.703"/>
                    </svg>
                    Solicitar Cotización
                  </button>
                )}
            </div>
          </div>

          {/* Información del Producto - Secuencial */}
          <div className="flex-1 flex flex-col pt-6 space-y-8">
            
            {/* Descripción Corta como Lead */}
            <div className="space-y-6">
              {product.short_description && (
                <div
                  className="text-base md:text-lg leading-relaxed font-medium mb-4 text-gray-700"
                  dangerouslySetInnerHTML={{ __html: product.short_description }}
                />
              )}


              <ShareButton 
                url={`${typeof window !== 'undefined' ? window.location.origin : ''}/tienda/${product.slug}`}
                title={product.name}
                description={product.short_description}
              />

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
                  </div>
                </div>
              )}
            </div>

            {/* Descripción */}
            {product.description && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-gray-900 border-b border-gray-200 pb-2">Descripción</h2>
                <div className="prose prose-slate max-w-none product-description">
                  <div dangerouslySetInnerHTML={{ __html: product.description }} />
                </div>
              </div>
            )}

            {/* Especificaciones */}
            {product.attributes && product.attributes.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-gray-900 border-b border-gray-200 pb-2">Especificaciones</h2>
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
              </div>
            )}

            {/* Documentos y Recursos */}
            {(getMetaDataValue(product, 'manual_pdf_url') || getMetaDataValue(product, 'product_sheet_pdf_url')) && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-gray-900 border-b border-gray-200 pb-2 flex items-center gap-2">
                  <svg className="w-5 h-5 text-servi_green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Documentos y Recursos
                </h2>
                <div className="space-y-3">
                  {getMetaDataValue(product, 'manual_pdf_url') && (
                    <a
                      href={getMetaDataValue(product, 'manual_pdf_url') || ''}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-4 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">Manual de Usuario</p>
                          <p className="text-sm text-gray-600">Instrucciones detalladas de uso</p>
                        </div>
                      </div>
                      <svg className="w-5 h-5 text-blue-500 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  )}
                  {getMetaDataValue(product, 'product_sheet_pdf_url') && (
                    <a
                      href={getMetaDataValue(product, 'product_sheet_pdf_url') || ''}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">Folleto del Equipo</p>
                          <p className="text-sm text-gray-600">Especificaciones técnicas</p>
                        </div>
                      </div>
                      <svg className="w-5 h-5 text-green-500 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            )}

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
              {relatedProducts.slice(0, 4).map((relatedProduct, index) => (
                <ProductCard
                  key={`related-${relatedProduct.id}-${index}`}
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
      
      {/* Quote Form Modal */}
      {product && (
        <QuoteFormModal
          isOpen={isQuoteModalOpen}
          onClose={() => setIsQuoteModalOpen(false)}
          product={product}
          onSubmit={handleQuoteSubmit}
        />
      )}
    </div>
  );
}

export { ProductDetails };