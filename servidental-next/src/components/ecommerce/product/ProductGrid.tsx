'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
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

function ProductGrid({ 
  initialProducts = [], 
  showFilters = true, 
  perPage = 12,
  categoryId 
}: ProductGridProps) {
  const [products, setProducts] = useState<WooCommerceProduct[]>(initialProducts);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { fetchProducts } = useWooCommerce();

  const getFiltersFromURL = (): ProductFilters => {
    const filters: ProductFilters = {};
    
    const search = searchParams.get('search');
    if (search) filters.search = search;
    
    const categoriesParam = searchParams.get('categories');
    if (categoriesParam) {
      filters.categories = categoriesParam.split(',').map(Number).filter(Boolean);
    }
    
    const priceMin = searchParams.get('price_min');
    if (priceMin) filters.price_min = parseFloat(priceMin);
    
    const priceMax = searchParams.get('price_max');
    if (priceMax) filters.price_max = parseFloat(priceMax);
    
    const onSale = searchParams.get('on_sale');
    if (onSale === 'true') filters.on_sale = true;
    
    const inStock = searchParams.get('in_stock');
    if (inStock === 'true') filters.in_stock = true;
    
    const page = searchParams.get('page');
    if (page) setCurrentPage(parseInt(page));
    
    return filters;
  };

  const [filters, setFilters] = useState<ProductFilters>(getFiltersFromURL);

  const getHasActiveFilters = () => {
    const relevantFilterKeys = ['search', 'categories', 'price_min', 'price_max', 'on_sale', 'in_stock'];
    return relevantFilterKeys.some(key => {
      const value = filters[key as keyof ProductFilters];
      if (key === 'categories' && Array.isArray(value)) {
        return value.length > 0;
      }
      return value !== undefined && value !== null && value !== '';
    });
  };

  const updateURL = (newFilters: ProductFilters, page: number = 1) => {
    const params = new URLSearchParams();
    
    if (newFilters.search) params.set('search', newFilters.search);
    if (newFilters.categories && newFilters.categories.length > 0) {
      params.set('categories', newFilters.categories.join(','));
    }
    if (newFilters.price_min !== undefined) params.set('price_min', String(newFilters.price_min));
    if (newFilters.price_max !== undefined) params.set('price_max', String(newFilters.price_max));
    if (newFilters.on_sale) params.set('on_sale', 'true');
    if (newFilters.in_stock) params.set('in_stock', 'true');
    if (page > 1) params.set('page', String(page));
    
    const newURL = params.toString() ? `${pathname}?${params.toString()}` : pathname;
    router.push(newURL, { scroll: false });
  };

  const loadProducts = async (filtersToUse: ProductFilters = filters, pageToUse: number = currentPage) => {
    setLoading(true);
    try {
      const params = {
        per_page: perPage,
        page: pageToUse,
        ...filtersToUse,
        ...(categoryId && { categories: [categoryId] }) // Si hay categoryId, lo incluimos
      };
      
      console.log('Loading products with params:', params);
      
      const response = await fetchProducts(params);
      setProducts(response.data);
      setTotalPages(response.total_pages);
      setTotal(response.total);
    } catch (error) {
      console.error('Error loading products:', error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, [filters, currentPage, categoryId]);

  useEffect(() => {
    const urlFilters = getFiltersFromURL();
    setFilters(urlFilters);
  }, [searchParams]);

  const handleFiltersChange = (newFilters: ProductFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
    updateURL(newFilters, 1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    updateURL(filters, page);
  };

  return (
    <div className="w-full">
      <div className="flex flex-col lg:flex-row gap-8">
        {showFilters && (
          <div className="w-full lg:w-1/4">
            <ProductFiltersPanel 
              filters={filters}
              onFiltersChange={handleFiltersChange}
            />
          </div>
        )}
        
        <div className="flex-1">
          {!loading && (
            <div className="mb-4 flex justify-between items-center">
              <p className="text-sm text-gray-600">
                Mostrando {products.length} de {total} productos
                {getHasActiveFilters() && ' (filtrados)'}
              </p>
              {getHasActiveFilters() && (
                <button
                  onClick={() => handleFiltersChange({})}
                  className="text-sm text-servi_green hover:text-servi_dark transition-colors"
                >
                  Limpiar todos los filtros
                </button>
              )}
            </div>
          )}

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
                  <p className="text-gray-500 mb-4">
                    Intenta ajustar los filtros de búsqueda
                  </p>
                  {getHasActiveFilters() && (
                    <button
                      onClick={() => handleFiltersChange({})}
                      className="bg-servi_green text-white px-4 py-2 rounded-md hover:bg-servi_dark transition-colors"
                    >
                      Limpiar filtros
                    </button>
                  )}
                </div>
              )}

              {totalPages > 1 && (
                <div className="mt-8 flex justify-center">
                  <nav className="flex items-center space-x-2">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage <= 1}
                      className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Anterior
                    </button>
                    
                    {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                      const page = i + 1;
                      return (
                        <button
                          key={page}
                          onClick={() => handlePageChange(page)}
                          className={`px-3 py-2 text-sm font-medium rounded-md ${
                            currentPage === page
                              ? 'bg-servi_green text-white'
                              : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
                          }`}
                        >
                          {page}
                        </button>
                      );
                    })}
                    
                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage >= totalPages}
                      className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Siguiente
                    </button>
                  </nav>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductGrid;