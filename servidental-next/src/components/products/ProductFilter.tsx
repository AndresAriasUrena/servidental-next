'use client'

import { categories } from '@/data/manual-products'

interface ProductFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}
export const categoryGroups: Record<string, string[]> = {
  Mobiliario: ['Carritos', 'Armarios'], 
  "Piezas de mano": ['Contrangulos', 'Piezas de mano de alta velocidad', 'Piezas de mano recta de baja velocidad', 'Kits de piezas dentales'],

};

export default function ProductFilter({ selectedCategory, onCategoryChange }: ProductFilterProps) {


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
            Todos los productos
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
              {/* Subcategorías */}
              {categoryGroups[category]?.map((subcategory) => (
                <button
                  key={subcategory}
                  onClick={() => onCategoryChange(subcategory)}
                  className={`ml-4 text-left px-3 py-1 rounded-md transition-colors ${
                    selectedCategory === subcategory
                      ? 'bg-servi_green text-white'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  -- {subcategory}
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
