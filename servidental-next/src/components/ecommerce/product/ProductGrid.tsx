'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { WooCommerceProduct, ProductFilters } from '@/types/woocommerce';
import { ProductCard } from './ProductCard';
import { ProductFiltersPanel } from '../filters/ProductFiltersPanel';
import { useWooCommerce } from '@/hooks/useWooCommerce';
import { SlidersHorizontal, Search, X } from 'lucide-react';

interface ProductGridProps {
  initialProducts?: WooCommerceProduct[];
  showFilters?: boolean;
  perPage?: number;
  categoryId?: number;
  instanceKey?: string;
}

function ProductGrid({ 
  initialProducts = [], 
  showFilters = true, 
  perPage = 12,
  categoryId,
  instanceKey = 'shop'
}: ProductGridProps) {
  const [products, setProducts] = useState<WooCommerceProduct[]>(initialProducts);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [repuestosFilter, setRepuestosFilter] = useState<'all' | 'repuestos' | 'no_repuestos'>('all');
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [searchInput, setSearchInput] = useState('');

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
  const didInit = useRef(false);
  const fromUI = useRef(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  const getHasActiveFilters = () => {
    const relevantFilterKeys = ['search', 'categories', 'price_min', 'price_max', 'on_sale', 'in_stock'];
    const hasRegularFilters = relevantFilterKeys.some(key => {
      const value = filters[key as keyof ProductFilters];
      if (key === 'categories' && Array.isArray(value)) {
        return value.length > 0;
      }
      return value !== undefined && value !== null && value !== '';
    });
    
    return hasRegularFilters || repuestosFilter !== 'all';
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
    if (repuestosFilter !== 'all') params.set('repuestos', repuestosFilter);
    
    const newURL = params.toString() ? `${pathname}?${params.toString()}` : pathname;
    router.push(newURL, { scroll: false });
  };

  const loadProducts = async (filtersToUse: ProductFilters = filters, pageToUse: number = currentPage, signal?: AbortSignal) => {
    setLoading(true);
    try {
      // Aplicar filtros del backend primero
      const params = {
        per_page: 100,
        page: 1,
        ...filtersToUse,
        ...(categoryId && { categories: [categoryId] })
      };
      
      const firstResponse = await fetchProducts(params);
      if (signal?.aborted) return;
      
      let allProducts = [...firstResponse.data];
      const totalPages = firstResponse.total_pages;
      
      // Cargar páginas adicionales si hay más
      for (let page = 2; page <= totalPages; page++) {
        if (signal?.aborted) return;
        const additionalResponse = await fetchProducts({
          ...params,
          page: page
        });
        allProducts.push(...additionalResponse.data);
      }
      
      if (signal?.aborted) return;
      console.log(`Total productos cargados: ${allProducts.length}`);
      
      // Aplicar filtros de repuestos en el frontend
      let productsToShow = allProducts;
      
      if (repuestosFilter === 'repuestos') {
        productsToShow = allProducts.filter(product => 
          product.tags.some(tag => 
            tag.name.toLowerCase().includes('repuesto')
          )
        );
      } else if (repuestosFilter === 'no_repuestos') {
        productsToShow = allProducts.filter(product => 
          !product.tags.some(tag => 
            tag.name.toLowerCase().includes('repuesto')
          )
        );
      }
      
      if (!signal?.aborted) {
        setProducts(productsToShow);
        setTotalPages(1); // Solo una página ya que filtramos en frontend
        setTotal(productsToShow.length);
      }
    } catch (error) {
      if ((error as Error)?.name !== 'AbortError') {
        console.error('Error loading products:', error);
        if (!signal?.aborted) {
          setProducts([]);
        }
      }
    } finally {
      if (!signal?.aborted) {
        setLoading(false);
      }
    }
  };

  // 1) Hidratar desde URL SOLO al montar
  useEffect(() => {
    if (didInit.current) return;
    didInit.current = true;
    const urlFilters = getFiltersFromURL();
    setFilters(urlFilters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 2) Si cambia la URL por navegación (no por UI), re-hidratar
  useEffect(() => {
    if (!didInit.current) return;
    if (fromUI.current) { 
      fromUI.current = false; 
      return; 
    }
    const urlFilters = getFiltersFromURL();
    setFilters(urlFilters);
  }, [searchParams]);

  // 3) Cargar productos al cambiar filtros, con cancelación
  useEffect(() => {
    // Cancelar carga anterior
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    
    const abortController = new AbortController();
    abortControllerRef.current = abortController;
    
    (async () => {
      try {
        await loadProducts(filters, currentPage, abortController.signal);
      } catch (error) {
        if ((error as Error)?.name !== 'AbortError') {
          console.error('loadProducts error:', error);
        }
      }
    })();

    return () => {
      abortController.abort();
    };
  }, [filters, currentPage, categoryId, repuestosFilter]);

  const handleFiltersChange = (newFilters: ProductFilters) => {
    fromUI.current = true;
    setFilters(newFilters);
    setCurrentPage(1);
    updateURL(newFilters, 1);
    setShowMobileFilters(false); // Cerrar modal de filtros en mobile
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleFiltersChange({
      ...filters,
      search: searchInput || undefined
    });
  };

  const handleRepuestosFilterChange = (newRepuestosFilter: 'all' | 'repuestos' | 'no_repuestos') => {
    setRepuestosFilter(newRepuestosFilter);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    updateURL(filters, page);
  };

  // De-duplicación de productos por ID
  const productsUnique = useMemo(() => {
    const map = new Map<string | number, WooCommerceProduct>();
    for (const p of products) {
      if (!map.has(p.id)) {
        map.set(p.id, p);
      }
    }
    return Array.from(map.values());
  }, [products]);

  // Sincronizar searchInput con filters.search
  useEffect(() => {
    setSearchInput(filters.search || '');
  }, [filters.search]);

  return (
    <div className="w-full">
      {/* Barra de búsqueda estilo Amazon - Móvil */}
      <div className="lg:hidden mb-4">
        <form onSubmit={handleSearchSubmit} className="flex gap-2">
          <div className="flex-1 relative">
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Buscar productos..."
              className="w-full pl-4 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-servi_green focus:border-transparent"
            />
            <button
              type="submit"
              className="absolute right-0 top-0 h-full px-4 bg-servi_green text-white rounded-r-lg hover:bg-servi_dark transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>
        </form>

        {/* Botón de filtros móvil */}
        <div className="flex gap-2 mt-3">
          <button
            onClick={() => setShowMobileFilters(true)}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition-colors"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span className="text-sm font-medium">Filtros</span>
          </button>
        </div>
      </div>

      {/* Modal de filtros para móvil */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setShowMobileFilters(false)}
          />
          <div className="absolute inset-y-0 right-0 w-full max-w-sm bg-white shadow-xl overflow-y-auto">
            <div className="sticky top-0 bg-white border-b px-4 py-3 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Filtros</h2>
              <button
                onClick={() => setShowMobileFilters(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4">
              <ProductFiltersPanel
                filters={filters}
                onFiltersChange={handleFiltersChange}
              />
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-8">
        {showFilters && (
          <div className="hidden lg:block w-full lg:w-1/4">
            <ProductFiltersPanel
              filters={filters}
              onFiltersChange={handleFiltersChange}
            />
          </div>
        )}
        
        <div className="flex-1">
          {/* Botones de filtro de repuestos */}
          <div className="mb-6">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => handleRepuestosFilterChange('all')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  repuestosFilter === 'all'
                    ? 'bg-servi_green text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Todos los productos
              </button>
              <button
                onClick={() => handleRepuestosFilterChange('repuestos')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  repuestosFilter === 'repuestos'
                    ? 'bg-servi_green text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Solo repuestos
              </button>
              <button
                onClick={() => handleRepuestosFilterChange('no_repuestos')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  repuestosFilter === 'no_repuestos'
                    ? 'bg-servi_green text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Equipos principales
              </button>
            </div>
          </div>

          {!loading && (
            <div className="mb-4 flex justify-between items-center">
              <p className="text-sm text-gray-600">
                Mostrando {productsUnique.length} de {total} productos
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
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-6">
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
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-6">
                {productsUnique.map((product) => (
                  <ProductCard key={`${instanceKey}-${product.id}`} product={product} />
                ))}
              </div>
              
              {productsUnique.length === 0 && !loading && (
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
                    
                    {(() => {
                      const pages = [];
                      const maxVisible = 5;
                      let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
                      let endPage = Math.min(totalPages, startPage + maxVisible - 1);
                      
                      // Ajustar si estamos cerca del final
                      if (endPage - startPage + 1 < maxVisible) {
                        startPage = Math.max(1, endPage - maxVisible + 1);
                      }
                      
                      for (let i = startPage; i <= endPage; i++) {
                        pages.push(
                          <button
                            key={i}
                            onClick={() => handlePageChange(i)}
                            className={`px-3 py-2 text-sm font-medium rounded-md ${
                              currentPage === i
                                ? 'bg-servi_green text-white'
                                : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
                            }`}
                          >
                            {i}
                          </button>
                        );
                      }
                      return pages;
                    })()}
                    
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