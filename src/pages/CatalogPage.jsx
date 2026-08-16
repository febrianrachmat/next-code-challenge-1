import { useLoaderData } from 'react-router-dom'

export default function CatalogPage() {
  const catalog = useLoaderData()

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

      <div className="mx-auto max-w-6xl px-4 py-10">
        <p className="text-slate-600">
          Loaded {catalog.categories.length} categories and{' '}
          {catalog.products.length} products from the catalog loader.
        </p>
      </div>
    </main>
  )
}
