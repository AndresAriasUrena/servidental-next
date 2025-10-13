'use client';

import { useState, useEffect } from 'react';
import { ProductFilters, WooCommerceCategory, WooCommerceBrand } from '@/types/woocommerce';
import { useWooCommerce } from '@/hooks/useWooCommerce';
import { formatPriceRange, PRIMARY_CURRENCY } from '@/utils/currency';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface ProductFiltersPanelProps {
  filters: ProductFilters;
  onFiltersChange: (filters: ProductFilters, shouldCloseMobile?: boolean) => void;
  className?: string;
}

export function ProductFiltersPanel({ filters, onFiltersChange, className = '' }: ProductFiltersPanelProps) {
  const { fetchCategories, fetchBrands } = useWooCommerce();
  const [categories, setCategories] = useState<WooCommerceCategory[]>([]);
  const [brands, setBrands] = useState<WooCommerceBrand[]>([]);
  const [loading, setLoading] = useState(true);
  const [brandsLoading, setBrandsLoading] = useState(true);
  const [categoriesExpanded, setCategoriesExpanded] = useState(true);
  const [brandsExpanded, setBrandsExpanded] = useState(true);

  // Estado local para inputs de precio (evita cerrar modal en mobile al escribir)
  const [priceMinInput, setPriceMinInput] = useState(String(filters.price_min || ''));
  const [priceMaxInput, setPriceMaxInput] = useState(String(filters.price_max || ''));

  // Sincronizar estado local con filtros externos
  useEffect(() => {
    setPriceMinInput(String(filters.price_min || ''));
    setPriceMaxInput(String(filters.price_max || ''));
  }, [filters.price_min, filters.price_max]);

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

  useEffect(() => {
    async function loadBrands() {
      try {
        const response = await fetchBrands();
        setBrands(response.data || []);
      } catch (error) {
        console.error('Error loading brands:', error);
      } finally {
        setBrandsLoading(false);
      }
    }

    loadBrands();
  }, [fetchBrands]);

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

  const handleBrandChange = (brandSlug: string) => {
    const currentBrands = filters.brands || [];
    const updatedBrands = currentBrands.includes(brandSlug)
      ? currentBrands.filter(slug => slug !== brandSlug)
      : [...currentBrands, brandSlug];

    onFiltersChange({
      ...filters,
      brands: updatedBrands
    });
  };

  const applyPriceFilter = () => {
    onFiltersChange({
      ...filters,
      price_min: priceMinInput ? parseFloat(priceMinInput) : undefined,
      price_max: priceMaxInput ? parseFloat(priceMaxInput) : undefined
    }, false); // No cerrar modal en mobile
  };

  const handlePriceKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      applyPriceFilter();
    }
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

  const relevantFilterKeys = ['search', 'categories', 'brands', 'price_min', 'price_max', 'on_sale', 'in_stock'];
  const hasActiveFilters = relevantFilterKeys.some(key => {
    const value = filters[key as keyof ProductFilters];
    if ((key === 'categories' || key === 'brands') && Array.isArray(value)) {
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
        <button
          onClick={() => setCategoriesExpanded(!categoriesExpanded)}
          className="flex items-center justify-between w-full text-sm font-medium text-gray-700 mb-3"
        >
          <span>Categorías</span>
          {categoriesExpanded ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </button>
        {categoriesExpanded && (
          <>
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
          </>
        )}
      </div>

      {/* Brands */}
      <div>
        <button
          onClick={() => setBrandsExpanded(!brandsExpanded)}
          className="flex items-center justify-between w-full text-sm font-medium text-gray-700 mb-3"
        >
          <span>Marcas</span>
          {brandsExpanded ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </button>
        {brandsExpanded && (
          <>
            {brandsLoading ? (
              <div className="space-y-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="h-6 bg-gray-200 rounded animate-pulse"></div>
                ))}
              </div>
            ) : (
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {brands.map((brand) => (
                  <label key={brand.id} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={(filters.brands || []).includes(brand.slug)}
                      onChange={() => handleBrandChange(brand.slug)}
                      className="rounded border-gray-300 text-servi_green focus:ring-servi_green"
                    />
                    <span className="text-sm text-gray-700">
                      {brand.name} ({brand.count})
                    </span>
                  </label>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* Price Range */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Rango de precios ({PRIMARY_CURRENCY.symbol})
        </label>
        <div className="grid grid-cols-2 gap-3 mb-2">
          <div>
            <input
              type="number"
              placeholder="Mínimo"
              value={priceMinInput}
              onChange={(e) => setPriceMinInput(e.target.value)}
              onBlur={applyPriceFilter}
              onKeyDown={handlePriceKeyDown}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-servi_green focus:border-transparent text-sm"
            />
          </div>
          <div>
            <input
              type="number"
              placeholder="Máximo"
              value={priceMaxInput}
              onChange={(e) => setPriceMaxInput(e.target.value)}
              onBlur={applyPriceFilter}
              onKeyDown={handlePriceKeyDown}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-servi_green focus:border-transparent text-sm"
            />
          </div>
        </div>
        <button
          onClick={applyPriceFilter}
          className="w-full px-3 py-2 text-sm bg-servi_green text-white rounded-md hover:bg-servi_dark transition-colors"
        >
          Aplicar rango
        </button>
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
            <span className="text-sm text-gray-700">Black November</span>
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
            <span className="text-sm text-gray-700">Entrega Inmediata</span>
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
            {filters.brands?.map(brandSlug => {
              const brand = brands.find(b => b.slug === brandSlug);
              return brand ? (
                <span key={brandSlug} className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-purple-100 text-purple-800">
                  {brand.name}
                  <button
                    onClick={() => handleBrandChange(brandSlug)}
                    className="ml-1 text-purple-600 hover:text-purple-800"
                  >
                    ×
                  </button>
                </span>
              ) : null;
            })}
            {(filters.price_min || filters.price_max) && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                {formatPriceRange(filters.price_min, filters.price_max)}
                <button
                  onClick={() => {
                    setPriceMinInput('');
                    setPriceMaxInput('');
                    onFiltersChange({
                      ...filters,
                      price_min: undefined,
                      price_max: undefined
                    }, false);
                  }}
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