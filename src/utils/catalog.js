export function getSubCategoriesByCategory(subCategories, categoryId) {
  if (!categoryId) {
    return []
  }

  return subCategories.filter((item) => item.categoryId === categoryId)
}

export function getBrandsBySubCategory(brands, subcategoryId) {
  if (!subcategoryId) {
    return []
  }

  return brands.filter((item) => item.subCategoryId === subcategoryId)
}

export function findById(items, id) {
  if (!id) {
    return null
  }

  return items.find((item) => item.id === id) ?? null
}

export function getSelectedFilters(catalog, searchParams) {
  const category = findById(catalog.categories, searchParams.get('category'))
  const subcategory = category
    ? findById(
        getSubCategoriesByCategory(catalog.subCategories, category.id),
        searchParams.get('subcategory'),
      )
    : null
  const brand = subcategory
    ? findById(
        getBrandsBySubCategory(catalog.brands, subcategory.id),
        searchParams.get('brand'),
      )
    : null

  return { category, subcategory, brand }
}
