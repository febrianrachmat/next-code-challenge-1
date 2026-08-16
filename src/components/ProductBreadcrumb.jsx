export default function ProductBreadcrumb({ category, subcategory, brand }) {
  const crumbs = ['All Products']

  if (category) {
    crumbs.push(category.name)
  }

  if (subcategory) {
    crumbs.push(subcategory.name)
  }

  if (brand) {
    crumbs.push(brand.name)
  }

  return (
    <nav
      className="product-breadcrumb rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 shadow-sm"
      aria-label="breadcrumb"
    >
      <ol className="flex flex-wrap items-center gap-2">
        {crumbs.map((crumb, index) => {
          const isLast = index === crumbs.length - 1

          return (
            <li key={`${crumb}-${index}`} className="flex items-center gap-2">
              {index > 0 && <span aria-hidden="true">/</span>}
              <span className={isLast ? 'font-semibold text-slate-900' : ''}>
                {crumb}
              </span>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
