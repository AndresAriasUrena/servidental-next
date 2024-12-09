// src/components/products/ProductGrid.tsx
'use client'

import { useState } from 'react'
import { Product } from '@/types/product'
import { Filter } from 'lucide-react'
import ProductCard from './ProductCard'
import ProductFilter from './ProductFilter'
import { categoryGroups } from './ProductFilter';

interface ProductGridProps {
  products: Product[]
}


export default function ProductGrid({ products }: ProductGridProps) {
  
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false)

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === 'all' ||
      product.category === selectedCategory || // Categoría principal
      (product.subcategory && product.subcategory === selectedCategory) || // Verifica si subcategory existe antes de comparar
      (categoryGroups[selectedCategory]?.includes(product.subcategory ?? '') ?? false); // Maneja subcategorías relacionadas
  
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
  
    return matchesCategory && matchesSearch;
  });
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Search Bar - Always visible at top */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Buscar productos..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Mobile Filter Button */}
      <div className="lg:hidden mb-4">
        <button
          onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-servi_green text-white rounded-lg"
        >
          <Filter size={20} />
          Filtrar Productos
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filter - Desktop */}
        <aside className="hidden lg:block w-64 flex-shrink-0">
          <div className="sticky top-4 max-h-[calc(100vh-4rem)] overflow-y-auto rounded-lg bg-white shadow">
            <ProductFilter
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />
          </div>
        </aside>

        {/* Mobile Filter Overlay */}
        {isMobileFilterOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden">
            <div className="absolute right-0 top-0 h-full w-80 bg-white p-4 overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Filtros</h3>
                <button 
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              <ProductFilter
                selectedCategory={selectedCategory}
                onCategoryChange={(category) => {
                  setSelectedCategory(category)
                  setIsMobileFilterOpen(false)
                }}
              />
            </div>
          </div>
        )}
        
        {/* Main Content */}
        <main className="flex-1">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-gray-900">
                No se encontraron productos
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                Intenta cambiar los filtros o el término de búsqueda
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}