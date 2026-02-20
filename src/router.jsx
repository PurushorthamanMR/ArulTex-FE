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
import Tax from './pages/Tax'
import NewTax from './pages/NewTax'
import TransactionReport from './pages/TransactionReport'
import CustomerList from './pages/CustomerList'
import NewCustomer from './pages/NewCustomer'
import SupplierList from './pages/SupplierList'
import NewSupplier from './pages/NewSupplier'
import UserList from './pages/UserList'
import NewUser from './pages/NewUser'
import POSPage from './pages/POSPage'
import DailyReport from './pages/DailyReport'
import MonthlyReport from './pages/MonthlyReport'

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
        path: '/low-stocks',
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
        path: '/tax',
        element: <Dashboard />
      },
      {
        path: '/tax/new',
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
        path: '/reports/daily',
        element: <Dashboard />
      },
      {
        path: '/reports/monthly',
        element: <Dashboard />
      },
      {
        path: '/customers',
        element: <Dashboard />
      },
      {
        path: '/customers/new',
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
