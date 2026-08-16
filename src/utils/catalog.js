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

export function getProductRelations(catalog, product) {
  const brand = findById(catalog.brands, product.brandId)
  const subcategory = findById(catalog.subCategories, brand?.subCategoryId)
  const category = findById(catalog.categories, subcategory?.categoryId)

  return { brand, subcategory, category }
}

export function getFilteredProducts(catalog, selectedFilters) {
  return catalog.products.filter((product) => {
    const relations = getProductRelations(catalog, product)

    if (
      selectedFilters.category &&
      relations.category?.id !== selectedFilters.category.id
    ) {
      return false
    }

    if (
      selectedFilters.subcategory &&
      relations.subcategory?.id !== selectedFilters.subcategory.id
    ) {
      return false
    }

    if (selectedFilters.brand && relations.brand?.id !== selectedFilters.brand.id) {
      return false
    }

    return true
  })
}

export function formatPrice(price) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(price)
}
