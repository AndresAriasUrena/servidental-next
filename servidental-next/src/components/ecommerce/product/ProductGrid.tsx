'use client';

import React, { useState, useEffect } from 'react';
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
  const [filters, setFilters] = useState<ProductFilters>({});
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  
  const { fetchProducts } = useWooCommerce();

  useEffect(() => {
    loadProducts();
  }, [filters, currentPage, categoryId]);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const params = {
        per_page: perPage,
        page: currentPage,
        ...filters,
        ...(categoryId && { category: categoryId })
      };
      
      const response = await fetchProducts(params);
      setProducts(response.data);
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFiltersChange = (newFilters: ProductFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
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
                  <p className="text-gray-500">
                    Intenta ajustar los filtros de búsqueda
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