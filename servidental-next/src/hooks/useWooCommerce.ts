'use client';

import { useState, useCallback } from 'react';
import { WooCommerceProduct, WooCommerceCategory, PaginatedResponse } from '@/types/woocommerce';

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

  const fetchProducts = useCallback(async (params: any = {}): Promise<PaginatedResponse<WooCommerceProduct>> => {
    setLoading(true);
    setError(null);
    
    try {
      const queryParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          queryParams.append(key, String(value));
        }
      });

      const response = await makeRequest('products', queryParams);
      
      return response;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error fetching products';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [makeRequest]);

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
    searchProducts
  };
}