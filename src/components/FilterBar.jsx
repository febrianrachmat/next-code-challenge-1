import { useSearchParams } from 'react-router-dom'
import {
  getBrandsBySubCategory,
  getSelectedFilters,
  getSubCategoriesByCategory,
} from '../utils/catalog.js'

function buildSearchParams({ category, subcategory, brand }) {
  const nextParams = new URLSearchParams()

  if (category) {
    nextParams.set('category', category)
  }

  if (subcategory) {
    nextParams.set('subcategory', subcategory)
  }

  if (brand) {
    nextParams.set('brand', brand)
  }

  return nextParams
}

export default function FilterBar({ catalog }) {
  const [searchParams, setSearchParams] = useSearchParams()
  const { category, subcategory, brand } = getSelectedFilters(
    catalog,
    searchParams,
  )

  const categoryId = category?.id ?? ''
  const subcategoryId = subcategory?.id ?? ''
  const brandId = brand?.id ?? ''

  const subCategoryOptions = getSubCategoriesByCategory(
    catalog.subCategories,
    categoryId,
  )
  const brandOptions = getBrandsBySubCategory(catalog.brands, subcategoryId)

  function handleCategoryChange(event) {
    setSearchParams(
      buildSearchParams({
        category: event.target.value,
      }),
    )
  }

  function handleSubCategoryChange(event) {
    setSearchParams(
      buildSearchParams({
        category: categoryId,
        subcategory: event.target.value,
      }),
    )
  }

  function handleBrandChange(event) {
    setSearchParams(
      buildSearchParams({
        category: categoryId,
        subcategory: subcategoryId,
        brand: event.target.value,
      }),
    )
  }

  return (
    <form
      className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:grid-cols-3"
      onSubmit={(event) => event.preventDefault()}
    >
      <label className="flex flex-col gap-2 text-left">
        <span className="text-sm font-semibold text-slate-700">
          Main Category
        </span>
        <select
          name="category"
          value={categoryId}
          onChange={handleCategoryChange}
          className="h-11 rounded-xl border border-slate-300 bg-white px-3 text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
        >
          <option value="">Select main category</option>
          {catalog.categories.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </label>

      <label className="flex flex-col gap-2 text-left">
        <span className="text-sm font-semibold text-slate-700">
          Sub-Category
        </span>
        <select
          name="subcategory"
          value={subcategoryId}
          onChange={handleSubCategoryChange}
          disabled={!categoryId}
          className="h-11 rounded-xl border border-slate-300 bg-white px-3 text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400"
        >
          <option value="">
            {categoryId ? 'Select sub-category' : 'Select a main category first'}
          </option>
          {subCategoryOptions.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </label>

      <label className="flex flex-col gap-2 text-left">
        <span className="text-sm font-semibold text-slate-700">Brand</span>
        <select
          name="brand"
          value={brandId}
          onChange={handleBrandChange}
          disabled={!subcategoryId}
          className="h-11 rounded-xl border border-slate-300 bg-white px-3 text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400"
        >
          <option value="">
            {subcategoryId ? 'Select brand' : 'Select a sub-category first'}
          </option>
          {brandOptions.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </label>
    </form>
  )
}
