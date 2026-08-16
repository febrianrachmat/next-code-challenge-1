import { createBrowserRouter } from 'react-router-dom'
import CatalogPage from './pages/CatalogPage.jsx'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <CatalogPage />,
  },
])
