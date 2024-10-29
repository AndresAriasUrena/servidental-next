// src/components/products/ProductFilter.tsx
'use client'

import { categories } from '@/data/manual-products'

interface ProductFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  onSearchChange: (search: string) => void;
}

export default function ProductFilter({ 
  selectedCategory, 
  onCategoryChange, 
  onSearchChange 
}: ProductFilterProps) {
  return (
    <div className="sticky top-24 space-y-4">
      <div className="w-full">
        <input
          type="text"
          placeholder="Buscar productos..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-3">Categorías</h3>
        <div className="space-y-2">
          <button
            onClick={() => onCategoryChange('all')}
            className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
              selectedCategory === 'all'
                ? 'bg-blue-500 text-white'
                : 'hover:bg-gray-100'
            }`}
          >
            Todos los productos
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                selectedCategory === category
                  ? 'bg-blue-500 text-white'
                  : 'hover:bg-gray-100'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}