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
  const [loadingMore, setLoadingMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [total, setTotal] = useState(0);
  const [repuestosFilter, setRepuestosFilter] = useState<'all' | 'repuestos' | 'no_repuestos'>('all');
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [categories, setCategories] = useState<any[]>([]);

  const PRODUCTS_PER_PAGE = 27; // Cargar 27 productos por página

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { fetchProducts, fetchCategories } = useWooCommerce();

  const getFiltersFromURL = (): ProductFilters => {
    const filters: ProductFilters = {};

    const search = searchParams.get('search');
    if (search) filters.search = search;

    const categoriesParam = searchParams.get('categories');
    if (categoriesParam) {
      const categorySlugs = categoriesParam.split(',').filter(Boolean);

      // Solo intentar convertir si las categorías están cargadas
      if (categories.length > 0) {
        // Convertir slugs a IDs para uso interno
        const categoryIds = getCategoryIdsFromSlugs(categorySlugs);
        if (categoryIds.length > 0) {
          filters.categories = categoryIds;
        }
      }
      // Si las categorías no están cargadas aún, no asignamos nada
      // El useEffect se encargará de actualizar cuando las categorías estén disponibles
    }

    // ============================================
    // SOPORTE PARA FILTRO DE MARCA DESDE URL
    // Usado por la página /tienda/marca/[slug]
    // ============================================
    const brandSlug = searchParams.get('brand') || pathname.match(/\/marca\/([^\/]+)/)?.[1];
    if (brandSlug) {
      filters.brands = [brandSlug];
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
      // Convertir IDs de categorías a slugs para la URL
      const categorySlugs = getCategorySlugs(newFilters.categories);
      if (categorySlugs.length > 0) {
        params.set('categories', categorySlugs.join(','));
      }
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

  const loadProducts = async (filtersToUse: ProductFilters = filters, pageToUse: number = 1, signal?: AbortSignal, append: boolean = false) => {
    if (append) {
      setLoadingMore(true);
    } else {
      setLoading(true);
    }

    try {
      // Preparar parámetros para la API
      const params = {
        per_page: PRODUCTS_PER_PAGE,
        page: pageToUse,
        ...filtersToUse,
        ...(categoryId && { categories: [categoryId] })
      };

      // ============================================
      // FILTRO DE REPUESTOS: Aplicar en BACKEND
      // Solo para "Solo repuestos" - filtra por categoría en el backend
      // ============================================
      if (repuestosFilter === 'repuestos') {
        // Enviar el slug de categoría al backend, que lo resolverá a ID
        params.category_slug = 'repuestos';
        console.log('[Repuestos Filter] Aplicando filtro de categoría "repuestos" en backend');
      }
      // NOTA: El filtro "no_repuestos" (Equipos principales) se aplica en frontend
      // porque WooCommerce no tiene parámetro nativo para excluir por categoría

      const response = await fetchProducts(params);
      if (signal?.aborted) return;

      console.log(`Total productos cargados: ${response.data.length} (página ${pageToUse})`);

      // Aplicar filtros en el frontend
      let productsToShow = response.data;

      // Filtro de Black November (etiqueta "noviembre")
      // NOTA: Este filtro SÍ se aplica en frontend porque WooCommerce no tiene
      // parámetro nativo para filtrar por etiquetas específicas
      if (filtersToUse.on_sale) {
        console.log('[Black November Filter] Filtrando productos con etiqueta "noviembre"...');
        console.log(`[Black November Filter] Total productos antes del filtro: ${productsToShow.length}`);

        // Filtrar productos con etiqueta "noviembre"
        const productsWithNoviembre = productsToShow.filter(product => {
          const hasNoviembre = product.tags?.some(tag =>
            tag.slug?.toLowerCase() === 'noviembre' || tag.name?.toLowerCase() === 'noviembre'
          );

          return hasNoviembre;
        });

        console.log(`[Black November Filter] Productos con etiqueta "noviembre": ${productsWithNoviembre.length}`);
        productsToShow = productsWithNoviembre;
      }

      // Filtro de "Equipos principales" (excluir repuestos)
      // NOTA: Este filtro se aplica en frontend porque WooCommerce no tiene
      // parámetro nativo para excluir por categoría
      if (repuestosFilter === 'no_repuestos') {
        console.log('[Equipos Principales Filter] Excluyendo productos con categoría "repuestos"...');
        console.log(`[Equipos Principales Filter] Total productos antes del filtro: ${productsToShow.length}`);

        productsToShow = productsToShow.filter(product => {
          const hasRepuestos = product.categories?.some(cat =>
            cat.slug === 'repuestos'
          );
          return !hasRepuestos; // Excluir si tiene categoría repuestos
        });

        console.log(`[Equipos Principales Filter] Productos sin categoría "repuestos": ${productsToShow.length}`);
      }

      // NOTA: El filtro "Solo repuestos" se aplica en BACKEND (ver líneas 137-141)

      // ============================================
      // NOTA: El filtro de marcas ya NO se aplica en el frontend
      // El backend (products API) resuelve brandSlug → brandId
      // y filtra directamente con product_brand={id}
      // ============================================

      if (!signal?.aborted) {
        if (append) {
          // Agregar productos a la lista existente
          setProducts(prev => [...prev, ...productsToShow]);
        } else {
          // Reemplazar productos (nueva búsqueda/filtro)
          setProducts(productsToShow);
        }

        // Actualizar estado de "hay más"
        setHasMore(response.total_pages > pageToUse);
        setTotal(response.total);
      }
    } catch (error) {
      if ((error as Error)?.name !== 'AbortError') {
        console.error('Error loading products:', error);
        if (!signal?.aborted) {
          if (!append) {
            setProducts([]);
          }
        }
      }
    } finally {
      if (!signal?.aborted) {
        setLoading(false);
        setLoadingMore(false);
      }
    }
  };

  // 1) Cargar categorías primero (necesarias para parsear URL)
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const response = await fetchCategories();
        setCategories(response.data || []);
      } catch (error) {
        console.error('Error loading categories:', error);
      }
    };
    loadCategories();
  }, [fetchCategories]);

  // 2) Hidratar desde URL SOLO al montar (después de cargar categorías)
  useEffect(() => {
    // Esperar a que las categorías estén cargadas antes de parsear URL
    if (categories.length === 0) return;
    if (didInit.current) return;
    didInit.current = true;
    const urlFilters = getFiltersFromURL();
    setFilters(urlFilters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categories]);

  // 3) Si cambia la URL por navegación (no por UI), re-hidratar
  useEffect(() => {
    // Esperar a que las categorías estén cargadas
    if (categories.length === 0) return;
    if (!didInit.current) return;
    if (fromUI.current) {
      fromUI.current = false;
      return;
    }
    const urlFilters = getFiltersFromURL();
    setFilters(urlFilters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  // 4) Cargar productos al cambiar filtros, con cancelación
  useEffect(() => {
    // Cancelar carga anterior
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    (async () => {
      try {
        // Solo cargar si currentPage es 1 (nueva búsqueda/filtro)
        // Los cambios de página se manejan en handleLoadMore
        if (currentPage === 1) {
          await loadProducts(filters, 1, abortController.signal, false);
        }
      } catch (error) {
        if ((error as Error)?.name !== 'AbortError') {
          console.error('loadProducts error:', error);
        }
      }
    })();

    return () => {
      abortController.abort();
    };
  }, [filters, categoryId, repuestosFilter]);

  // 5) Función para cargar más productos
  const handleLoadMore = () => {
    if (!loading && !loadingMore && hasMore) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      loadProducts(filters, nextPage, undefined, true);
    }
  };

  const handleFiltersChange = (newFilters: ProductFilters, shouldCloseMobile: boolean = false) => {
    fromUI.current = true;
    setFilters(newFilters);
    setCurrentPage(1);
    setProducts([]); // Limpiar productos actuales
    setHasMore(true); // Resetear estado
    updateURL(newFilters, 1);
    if (shouldCloseMobile) {
      setShowMobileFilters(false); // Cerrar modal de filtros en mobile solo cuando se especifica
    }
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
    setProducts([]);
    setHasMore(true);
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

  // Obtener nombres de categorías desde IDs
  const getCategoryNames = (categoryIds: number[]): string[] => {
    if (!categoryIds || categoryIds.length === 0) return [];

    return categoryIds
      .map(id => {
        const category = categories.find(cat => cat.id === id);
        return category ? category.name : null;
      })
      .filter(Boolean) as string[];
  };

  // Convertir IDs de categorías a slugs
  const getCategorySlugs = (categoryIds: number[]): string[] => {
    if (!categoryIds || categoryIds.length === 0) return [];

    return categoryIds
      .map(id => {
        const category = categories.find(cat => cat.id === id);
        return category ? category.slug : null;
      })
      .filter(Boolean) as string[];
  };

  // Convertir slugs de categorías a IDs
  const getCategoryIdsFromSlugs = (categorySlugs: string[]): number[] => {
    if (!categorySlugs || categorySlugs.length === 0) return [];

    return categorySlugs
      .map(slug => {
        const category = categories.find(cat => cat.slug === slug);
        return category ? category.id : null;
      })
      .filter(Boolean) as number[];
  };

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
                onClick={() => handleRepuestosFilterChange('no_repuestos')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  repuestosFilter === 'no_repuestos'
                    ? 'bg-servi_green text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Equipos principales
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
            </div>
          </div>

          {/* Mostrar categorías activas */}
          {filters.categories && filters.categories.length > 0 && (
            <div className="mb-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-medium text-gray-700">Categorías:</span>
                {getCategoryNames(filters.categories).map((categoryName, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-servi_green/10 text-servi_dark border border-servi_green/20"
                  >
                    {categoryName}
                  </span>
                ))}
              </div>
            </div>
          )}

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

              {/* Botón Cargar Más */}
              {!loading && productsUnique.length > 0 && hasMore && (
                <div className="mt-8 flex justify-center">
                  <button
                    onClick={handleLoadMore}
                    disabled={loadingMore}
                    className="px-8 py-3 bg-servi_green text-white font-medium rounded-lg hover:bg-servi_dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {loadingMore ? (
                      <>
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Cargando...
                      </>
                    ) : (
                      <>
                        Cargar más productos
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </>
                    )}
                  </button>
                </div>
              )}

              {/* Mensaje cuando no hay más productos */}
              {!loading && !hasMore && productsUnique.length > 0 && (
                <div className="mt-8 text-center">
                  <p className="text-gray-500 text-sm">
                    Has visto todos los productos disponibles
                  </p>
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