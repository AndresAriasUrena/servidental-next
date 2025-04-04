'use client'

import { Suspense, useState } from 'react'
import { SpareParts } from '@/types/spareparts'
import { Filter } from 'lucide-react'
import SparePartsCard from './SparePartsCard'
import SparePartsFilter from './SparePartsFilter'
import { useSearchParams, useRouter } from 'next/navigation'

interface FilteredSparePartsProps {
  spareParts: SpareParts[]
}

function FilteredSpareParts({ spareParts }: FilteredSparePartsProps) {
  const searchParams = useSearchParams()
  const router = useRouter()
  
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get('category') || 'all'
  )
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get('search') || ''
  )
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false)

  const updateFilters = (category: string, search: string) => {
    const params = new URLSearchParams()
    if (category !== 'all') params.set('category', category)
    if (search) params.set('search', search)
    
    const newUrl = params.toString()
      ? `?${params.toString()}`
      : window.location.pathname
    
    router.push(newUrl, { scroll: false })
  }

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    updateFilters(category, searchQuery)
  }

  const handleSearchChange = (search: string) => {
    setSearchQuery(search)
    updateFilters(selectedCategory, search)
  }

  const filteredSpareParts = spareParts.filter((part) => {
    const matchesCategory =
      selectedCategory === 'all' ||
      part.category === selectedCategory

    const matchesSearch =
      part.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <>
      <div className="mb-6">
        <input
          type="text"
          placeholder="Buscar productos..."
          value={searchQuery}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => handleSearchChange(e.target.value)}
        />
      </div>

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
        <aside className="hidden lg:block w-64 flex-shrink-0">
          <div className="sticky top-4 max-h-[calc(100vh-4rem)] overflow-y-auto rounded-lg bg-white shadow">
            <SparePartsFilter
              selectedCategory={selectedCategory}
              onCategoryChange={handleCategoryChange}
            />
          </div>
        </aside>

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
              <SparePartsFilter
                selectedCategory={selectedCategory}
                onCategoryChange={(category) => {
                  handleCategoryChange(category)
                  setIsMobileFilterOpen(false)
                }}
              />
            </div>
          </div>
        )}
        
        <main className="flex-1">
          {filteredSpareParts.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-gray-900">
                No se encontraron productos
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                Intenta cambiar los filtros o el término de búsqueda
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredSpareParts.map((part) => (
                <SparePartsCard key={part.id} sparePart={part} />
              ))}
            </div>
          )}
        </main>
      </div>
    </>
  )
}

export default function SparePartsGrid({ spareParts }: FilteredSparePartsProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <Suspense fallback={<div>Loading...</div>}>
        <FilteredSpareParts spareParts={spareParts} />
      </Suspense>
    </div>
  )
}