import { formatPrice, getProductRelations } from '../utils/catalog.js'

export default function ProductGrid({ catalog, products }) {
  return (
    <section className="space-y-4">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Products</h2>
          <p className="text-sm text-slate-500">
            {products.length} item{products.length === 1 ? '' : 's'} found
          </p>
        </div>
      </div>

      {products.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center text-slate-500">
          No products match the selected filters.
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {products.map((product) => {
            const { brand, subcategory, category } = getProductRelations(
              catalog,
              product,
            )

            return (
              <article
                key={product.id}
                className="flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600">
                  {category?.name} / {subcategory?.name}
                </p>
                <h3 className="mt-2 text-lg font-bold text-slate-900">
                  {product.name}
                </h3>
                <p className="mt-1 text-sm text-slate-500">{brand?.name}</p>
                <p className="mt-6 text-lg font-semibold text-slate-900">
                  {formatPrice(product.price)}
                </p>
              </article>
            )
          })}
        </div>
      )}
    </section>
  )
}
