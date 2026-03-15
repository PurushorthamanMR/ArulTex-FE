import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import './index.css'
import './styles/DarkTheme.css'
import router from './router.jsx'

// Apply saved dark theme before first paint to avoid flash
try {
  if (localStorage.getItem('arultex-dark-theme') === 'true') {
    document.documentElement.classList.add('dark-theme')
  }
} catch (_) {}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
