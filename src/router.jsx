import { createBrowserRouter } from 'react-router-dom'
import { catalogLoader } from './loaders/catalogLoader.js'
import CatalogPage from './pages/CatalogPage.jsx'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <CatalogPage />,
    loader: catalogLoader,
  },
])
