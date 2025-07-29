'use client';

import { useState, useEffect } from 'react';
import { ProductFilters, WooCommerceCategory } from '@/types/woocommerce';
import { useWooCommerce } from '@/hooks/useWooCommerce';

interface ProductFiltersPanelProps {
  filters: ProductFilters;
  onFiltersChange: (filters: ProductFilters) => void;
  className?: string;
}

export function ProductFiltersPanel({ filters, onFiltersChange, className = '' }: ProductFiltersPanelProps) {
  const { fetchCategories } = useWooCommerce();
  const [categories, setCategories] = useState<WooCommerceCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCategories() {
      try {
        const response = await fetchCategories();
        setCategories(response.data || []);
      } catch (error) {
        console.error('Error loading categories:', error);
      } finally {
        setLoading(false);
      }
    }
    
    loadCategories();
  }, [fetchCategories]);

  const handleCategoryChange = (categoryId: number) => {
    const currentCategories = filters.categories || [];
    const updatedCategories = currentCategories.includes(categoryId)
      ? currentCategories.filter(id => id !== categoryId)
      : [...currentCategories, categoryId];
    
    onFiltersChange({
      ...filters,
      categories: updatedCategories
    });
  };

  const handlePriceChange = (min: string, max: string) => {
    onFiltersChange({
      ...filters,
      price_min: min ? parseFloat(min) : undefined,
      price_max: max ? parseFloat(max) : undefined
    });
  };

  const handleSearchChange = (search: string) => {
    onFiltersChange({
      ...filters,
      search: search || undefined
    });
  };

  const clearFilters = () => {
    onFiltersChange({});
  };

  const relevantFilterKeys = ['search', 'categories', 'price_min', 'price_max', 'on_sale', 'in_stock'];
  const hasActiveFilters = relevantFilterKeys.some(key => {
    const value = filters[key as keyof ProductFilters];
    if (key === 'categories' && Array.isArray(value)) {
      return value.length > 0;
    }
    return value !== undefined && value !== null && value !== '';
  });

  return (
    <div className={`bg-white rounded-lg shadow-sm border p-6 space-y-6 ${className}`}>
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Filtros</h3>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-sm text-servi_green hover:text-servi_dark transition-colors"
          >
            Limpiar filtros
          </button>
        )}
      </div>

      {/* Search */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Buscar productos
        </label>
        <input
          type="text"
          value={filters.search || ''}
          onChange={(e) => handleSearchChange(e.target.value)}
          placeholder="Nombre, descripción o SKU..."
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-servi_green focus:border-transparent"
        />
      </div>

      {/* Categories */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Categorías
        </label>
        {loading ? (
          <div className="space-y-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-6 bg-gray-200 rounded animate-pulse"></div>
            ))}
          </div>
        ) : (
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {categories.map((category) => (
              <label key={category.id} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={(filters.categories || []).includes(category.id)}
                  onChange={() => handleCategoryChange(category.id)}
                  className="rounded border-gray-300 text-servi_green focus:ring-servi_green"
                />
                <span className="text-sm text-gray-700">
                  {category.name} ({category.count})
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Price Range */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Rango de precios (₡)
        </label>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <input
              type="number"
              placeholder="Mínimo"
              value={filters.price_min || ''}
              onChange={(e) => handlePriceChange(e.target.value, String(filters.price_max || ''))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-servi_green focus:border-transparent text-sm"
            />
          </div>
          <div>
            <input
              type="number"
              placeholder="Máximo"
              value={filters.price_max || ''}
              onChange={(e) => handlePriceChange(String(filters.price_min || ''), e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-servi_green focus:border-transparent text-sm"
            />
          </div>
        </div>
      </div>

      {/* Special Filters */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Filtros especiales
        </label>
        <div className="space-y-2">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.on_sale || false}
              onChange={(e) => onFiltersChange({
                ...filters,
                on_sale: e.target.checked || undefined
              })}
              className="rounded border-gray-300 text-servi_green focus:ring-servi_green"
            />
            <span className="text-sm text-gray-700">En oferta</span>
          </label>
          
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.in_stock || false}
              onChange={(e) => onFiltersChange({
                ...filters,
                in_stock: e.target.checked || undefined
              })}
              className="rounded border-gray-300 text-servi_green focus:ring-servi_green"
            />
            <span className="text-sm text-gray-700">En stock</span>
          </label>
        </div>
      </div>

      {/* Active Filters Summary */}
      {hasActiveFilters && (
        <div className="pt-4 border-t">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Filtros activos:</h4>
          <div className="flex flex-wrap gap-2">
            {filters.search && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-servi_green text-white">
                "{filters.search}"
                <button
                  onClick={() => handleSearchChange('')}
                  className="ml-1 text-white hover:text-gray-200"
                >
                  ×
                </button>
              </span>
            )}
            {filters.categories?.map(categoryId => {
              const category = categories.find(c => c.id === categoryId);
              return category ? (
                <span key={categoryId} className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                  {category.name}
                  <button
                    onClick={() => handleCategoryChange(categoryId)}
                    className="ml-1 text-blue-600 hover:text-blue-800"
                  >
                    ×
                  </button>
                </span>
              ) : null;
            })}
            {(filters.price_min || filters.price_max) && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                ₡{filters.price_min || '0'} - ₡{filters.price_max || '∞'}
                <button
                  onClick={() => handlePriceChange('', '')}
                  className="ml-1 text-green-600 hover:text-green-800"
                >
                  ×
                </button>
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}