import { useLoaderData, useSearchParams } from 'react-router-dom'
import FilterBar from '../components/FilterBar.jsx'
import ProductBreadcrumb from '../components/ProductBreadcrumb.jsx'
import ProductGrid from '../components/ProductGrid.jsx'
import { getFilteredProducts, getSelectedFilters } from '../utils/catalog.js'

export default function CatalogPage() {
  const catalog = useLoaderData()
  const [searchParams] = useSearchParams()
  const selectedFilters = getSelectedFilters(catalog, searchParams)
  const products = getFilteredProducts(catalog, selectedFilters)

  return (
    <main className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600">
              NEXT Code Challenge 1
            </p>
            <h1 className="mt-1 text-2xl font-bold text-slate-900">
              Product Catalog
            </h1>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl space-y-6 px-4 py-8">
        <FilterBar catalog={catalog} />
        <ProductBreadcrumb
          category={selectedFilters.category}
          subcategory={selectedFilters.subcategory}
          brand={selectedFilters.brand}
        />
        <ProductGrid catalog={catalog} products={products} />
      </div>
    </main>
  )
}
