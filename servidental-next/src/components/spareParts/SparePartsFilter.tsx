'use client'

import { categories } from '@/data/manual-SpareParts'

interface SparePartsFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function SparePartsFilter({ selectedCategory, onCategoryChange }: SparePartsFilterProps) {

  return (
    <div className="sticky top-4 space-y-4">
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-3">Categorías</h3>
        <div className="space-y-1">
          <button
            onClick={() => onCategoryChange('all')}
            className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
              selectedCategory === 'all'
                ? 'bg-servi_green text-white'
                : 'hover:bg-gray-100'
            }`}
          >
            Todos los repuestos
          </button>
          {categories.map((category) => (
            <div key={category}>
              <button
                onClick={() => onCategoryChange(category)}
                className={`w-full text-left px-3 py-1 rounded-md transition-colors ${
                  selectedCategory === category
                    ? 'bg-servi_green text-white'
                    : 'hover:bg-gray-100'
                }`}
              >
                {category}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
