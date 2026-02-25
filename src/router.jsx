import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom'
import SignInPage from './pages/signInPage'
import ForgotPasswordPage from './pages/forgotPasswordPage'
import ResetPasswordPage from './pages/resetPasswordPage'
import Dashboard from './pages/Dashboard'
import ProductList from './pages/ProductList'
import NewProduct from './pages/NewProduct'
import LowStocks from './pages/LowStocks'
import Category from './pages/Category'
import NewCategory from './pages/NewCategory'
import TransactionReport from './pages/TransactionReport'
import SupplierList from './pages/SupplierList'
import NewSupplier from './pages/NewSupplier'
import UserList from './pages/UserList'
import NewUser from './pages/NewUser'
import POSPage from './pages/POSPage'
import Purchase from './pages/Purchase'
import InventoryLedger from './pages/InventoryLedger'
import SalesAnalysis from './pages/SalesAnalysis'

// Protected Route Component
const ProtectedRoute = () => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true'
  return isAuthenticated ? <Outlet /> : <Navigate to="/signin" replace />
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/signin" replace />
  },
  {
    path: '/signin',
    element: <SignInPage />
  },
  {
    path: '/forgot-password',
    element: <ForgotPasswordPage />
  },
  {
    path: '/reset-password',
    element: <ResetPasswordPage />
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: '/pos',
        element: <POSPage />
      },
      {
        path: '/dashboard',
        element: <Dashboard />
      },
      {
        path: '/products',
        element: <Dashboard />
      },
      {
        path: '/products/new',
        element: <Dashboard />
      },
      {
        path: '/products/edit/:id',
        element: <Dashboard />
      },
      {
        path: '/low-stocks',
        element: <Dashboard />
      },
      {
        path: '/purchases',
        element: <Dashboard />
      },
      {
        path: '/purchase',
        element: <Dashboard />
      },
      {
        path: '/purchases/edit/:id',
        element: <Dashboard />
      },
      {
        path: '/inventory-ledger',
        element: <Dashboard />
      },
      {
        path: '/category',
        element: <Dashboard />
      },
      {
        path: '/category/new',
        element: <Dashboard />
      },
      {
        path: '/category/edit/:id',
        element: <Dashboard />
      },
      {
        path: '/discount',
        element: <Dashboard />
      },
      {
        path: '/discount/new',
        element: <Dashboard />
      },
      {
        path: '/transaction',
        element: <Dashboard />
      },
      {
        path: '/analysis',
        element: <Dashboard />
      },
      {
        path: '/suppliers',
        element: <Dashboard />
      },
      {
        path: '/suppliers/new',
        element: <Dashboard />
      },
      {
        path: '/suppliers/edit/:id',
        element: <Dashboard />
      },
      {
        path: '/users',
        element: <Dashboard />
      },
      {
        path: '/users/new',
        element: <Dashboard />
      }
    ]
  }
])

export default router
