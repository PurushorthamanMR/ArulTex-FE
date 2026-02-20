import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell } from '@fortawesome/free-solid-svg-icons'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import ProductList from './ProductList'
import NewProduct from './NewProduct'
import LowStocks from './LowStocks'
import Category from './Category'
import NewCategory from './NewCategory'
import Tax from './Tax'
import NewTax from './NewTax'
import TransactionReport from './TransactionReport'
import CustomerList from './CustomerList'
import NewCustomer from './NewCustomer'
import SupplierList from './SupplierList'
import NewSupplier from './NewSupplier'
import UserList from './UserList'
import NewUser from './NewUser'
import Discount from './Discount'
import NewDiscount from './NewDiscount'
import DailyReport from './DailyReport'
import MonthlyReport from './MonthlyReport'
import '../styles/Dashboard.css'

function Dashboard() {
  const location = useLocation()
  const navigate = useNavigate()
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)

  const handleToggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed)
  }

  const handleNavigation = (path) => {
    navigate(path)
  }

  // Determine current page based on route
  const getCurrentPage = () => {
    const path = location.pathname
    if (path === '/dashboard') return 'Dashboard'
    if (path === '/products/new') return 'NewProduct'
    if (path === '/products') return 'Products'
    if (path === '/low-stocks') return 'Low Stocks'
    if (path === '/category/new') return 'NewCategory'
    if (path === '/category') return 'Category'
    if (path === '/tax/new') return 'NewTax'
    if (path === '/tax') return 'Tax'
    if (path === '/discount/new') return 'NewDiscount'
    if (path === '/discount') return 'Discount'
    if (path === '/transaction') return 'Transaction'
    if (path === '/customers/new') return 'NewCustomer'
    if (path === '/customers') return 'Customers'
    if (path === '/suppliers/new') return 'NewSupplier'
    if (path === '/suppliers') return 'Suppliers'
    if (path === '/users/new') return 'NewUser'
    if (path === '/users') return 'Users'
    return 'Dashboard'
  }

  const currentPage = getCurrentPage()

  return (
    <div className={`dashboard-container ${isSidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
      <Header 
        onToggleSidebar={handleToggleSidebar}
        isSidebarCollapsed={isSidebarCollapsed}
      />
      <div className="dashboard-content">
        <Sidebar 
          onNavigate={handleNavigation} 
          currentPage={currentPage}
          isCollapsed={isSidebarCollapsed}
        />
        <main className="dashboard-main">
          {currentPage === 'Dashboard' && (
            <div className="dashboard-content-wrapper">
          {/* View from Z Report Section */}
          <section className="dashboard-section">
            <h2 className="section-title">View from Z Report</h2>
            <div className="cards-grid">
              <div className="stat-card purple">
                <div className="card-icon">🛍️</div>
                <div className="card-content">
                  <div className="card-value">0</div>
                  <div className="card-label">Total Transactions</div>
                </div>
              </div>
              <div className="stat-card cyan">
                <div className="card-icon">📈</div>
                <div className="card-content">
                  <div className="card-value">0.00</div>
                  <div className="card-label">Total Sales</div>
                </div>
              </div>
              <div className="stat-card dark-blue">
                <div className="card-icon">💳</div>
                <div className="card-content">
                  <div className="card-value">0.00</div>
                  <div className="card-label">Banking</div>
                </div>
              </div>
              <div className="stat-card green">
                <div className="card-icon">✈️</div>
                <div className="card-content">
                  <div className="card-value">0.00</div>
                  <div className="card-label">Payouts</div>
                </div>
              </div>
              <div className="stat-card bright-purple">
                <div className="card-icon">$</div>
                <div className="card-content">
                  <div className="card-value">0.00</div>
                  <div className="card-label">Difference</div>
                </div>
              </div>
            </div>
          </section>

          {/* View from X Report Section */}
          <section className="dashboard-section">
            <h2 className="section-title">View from X Report</h2>
            <div className="cards-grid">
              <div className="stat-card light-orange">
                <div className="card-icon">🛍️</div>
                <div className="card-content">
                  <div className="card-value">0</div>
                  <div className="card-label">Total Transactions</div>
                </div>
              </div>
              <div className="stat-card light-green">
                <div className="card-icon">📷</div>
                <div className="card-content">
                  <div className="card-value">0.00</div>
                  <div className="card-label">Total Sales</div>
                </div>
              </div>
              <div className="stat-card light-blue">
                <div className="card-icon">⬇️</div>
                <div className="card-content">
                  <div className="card-value">0.00</div>
                  <div className="card-label">Banking</div>
                </div>
              </div>
              <div className="stat-card light-pink">
                <div className="card-icon">⬆️</div>
                <div className="card-content">
                  <div className="card-value">0.00</div>
                  <div className="card-label">Payouts</div>
                </div>
              </div>
              <div className="stat-card light-gray">
                <div className="card-icon">🏷️</div>
                <div className="card-content">
                  <div className="card-value">0.00</div>
                  <div className="card-label">Difference</div>
                </div>
              </div>
            </div>
          </section>

          {/* Top 10 Products Section */}
          <section className="dashboard-section">
            <div className="section-header">
              <h2 className="section-title">Top 10 Products</h2>
              <div className="section-controls">
                <div className="control-item">
                  <span className="control-dot green"></span>
                  <span>Quantity</span>
                </div>
                <select className="control-select">
                  <option>Year</option>
                </select>
              </div>
            </div>
            <div className="chart-container">
              <div className="chart-placeholder">
                <div className="chart-y-axis">
                  <span>3</span>
                  <span>2</span>
                  <span>1</span>
                  <span>0</span>
                </div>
                <div className="chart-area">
                  {/* Chart will be rendered here */}
                </div>
              </div>
            </div>
          </section>

          {/* Stock Alerts Section */}
          <section className="dashboard-section">
            <div className="stock-alerts-header">
              <div className="alerts-badge">
                <FontAwesomeIcon icon={faBell} />
                <span className="badge-count">0</span>
              </div>
              <a href="#" className="view-all-link">View All →</a>
            </div>
            <div className="stock-alerts-content">
              <div className="alert-message">
                <span className="check-icon">✓</span>
                <span>No stock alerts at this time.</span>
              </div>
            </div>
          </section>
            </div>
          )}
          {currentPage === 'Products' && (
            <ProductList onAddNew={() => handleNavigation('/products/new')} />
          )}
          {currentPage === 'NewProduct' && (
            <NewProduct 
              onBack={() => handleNavigation('/products')}
              onSave={() => handleNavigation('/products')}
            />
          )}
          {currentPage === 'Low Stocks' && <LowStocks />}
          {currentPage === 'Category' && <Category />}
          {currentPage === 'NewCategory' && <NewCategory />}
          {currentPage === 'Tax' && <Tax />}
          {currentPage === 'NewTax' && <NewTax />}
          {currentPage === 'Discount' && <Discount />}
          {currentPage === 'NewDiscount' && <NewDiscount />}
          {currentPage === 'Transaction' && <TransactionReport />}
          {currentPage === 'Daily Report' && <DailyReport />}
          {currentPage === 'Monthly Report' && <MonthlyReport />}
          {currentPage === 'Customers' && <CustomerList />}
          {currentPage === 'NewCustomer' && <NewCustomer />}
          {currentPage === 'Suppliers' && <SupplierList />}
          {currentPage === 'NewSupplier' && <NewSupplier />}
          {currentPage === 'Users' && <UserList />}
          {currentPage === 'NewUser' && <NewUser />}
        </main>
      </div>
    </div>
  )
}

export default Dashboard
