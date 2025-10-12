'use client';

import { useState, useCallback } from 'react';
import { WooCommerceProduct, WooCommerceCategory, WooCommerceBrand, PaginatedResponse } from '@/types/woocommerce';

export function useWooCommerce() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const makeRequest = useCallback(async (endpoint: string, params: URLSearchParams = new URLSearchParams()) => {
    // Ensure trailing slash for Next.js API routes
    const normalizedEndpoint = endpoint.endsWith('/') ? endpoint : `${endpoint}/`;
    const url = `/api/woocommerce/${normalizedEndpoint}?${params.toString()}`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    return await response.json();
  }, []);

  const mapFiltersToWooCommerceParams = useCallback((filters: any) => {
    const params: Record<string, string> = {};

    if (filters.search) {
      params.search = filters.search;
    }

    if (filters.categories && Array.isArray(filters.categories) && filters.categories.length > 0) {
      params.category = filters.categories.join(',');
    }

    // ============================================
    // FILTRO DE MARCAS: Pasar slug al backend
    // El backend resolverá slug → id y usará product_brand={id}
    // ============================================
    if (filters.brands && Array.isArray(filters.brands) && filters.brands.length > 0) {
      // Por ahora solo soportamos una marca a la vez
      // Si hay múltiples, usar la primera
      params.brand = filters.brands[0];
    }

    if (filters.price_min !== undefined) {
      params.min_price = String(filters.price_min);
    }

    if (filters.price_max !== undefined) {
      params.max_price = String(filters.price_max);
    }

    if (filters.on_sale) {
      params.on_sale = 'true';
    }

    if (filters.in_stock) {
      params.stock_status = 'instock';
    }

    if (filters.per_page) {
      params.per_page = String(filters.per_page);
    }

    if (filters.page) {
      params.page = String(filters.page);
    }

    if (filters.exclude && Array.isArray(filters.exclude)) {
      params.exclude = filters.exclude.join(',');
    }

    if (filters.status) {
      params.status = filters.status;
    }

    return params;
  }, []);

  const fetchProducts = useCallback(async (params: any = {}): Promise<PaginatedResponse<WooCommerceProduct>> => {
    setLoading(true);
    setError(null);
    
    try {
      const queryParams = new URLSearchParams();
      
      const mappedParams = mapFiltersToWooCommerceParams(params);
      
      Object.entries(mappedParams).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          queryParams.append(key, String(value));
        }
      });

      console.log('Mapped WooCommerce params:', Object.fromEntries(queryParams.entries()));

      const response = await makeRequest('products', queryParams);
      
      return response;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error fetching products';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [makeRequest, mapFiltersToWooCommerceParams]);

  const fetchProduct = useCallback(async (id: number): Promise<WooCommerceProduct> => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await makeRequest(`products/${id}`);
      return response;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error fetching product';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [makeRequest]);

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const queryParams = new URLSearchParams({ per_page: '100' });
      const response = await makeRequest('categories', queryParams);
      return response;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error fetching categories';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [makeRequest]);

  /**
   * Obtener marcas con conteos reales desde la API
   * NO recalcular conteos en el cliente - vienen listos desde el backend
   */
  const fetchBrands = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // Llamar directamente sin parámetros - el backend maneja el per_page
      const response = await makeRequest('brands', new URLSearchParams());

      // La API ya devuelve { data: [...], total: N, cached: boolean }
      // Los conteos (count) ya están calculados correctamente
      return response;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error fetching brands';
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
      const queryParams = new URLSearchParams({ search: query });
      const response = await makeRequest('products', queryParams);
      return response.data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error searching products';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [makeRequest]);

  const fetchProductBySlug = useCallback(async (slug: string): Promise<WooCommerceProduct> => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`/api/woocommerce/products/slug/${slug}/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Product not found: ${response.status}`);
      }

      return await response.json();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error fetching product';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    fetchProducts,
    fetchProduct,
    fetchProductBySlug,
    fetchCategories,
    fetchBrands,
    searchProducts
  };
}