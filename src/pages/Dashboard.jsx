import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell } from '@fortawesome/free-solid-svg-icons'
import * as dashboardApi from '../api/dashboardApi'
import * as salesApi from '../api/salesApi'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import ProductList from './ProductList'
import NewProduct from './NewProduct'
import LowStocks from './LowStocks'
import Category from './Category'
import NewCategory from './NewCategory'
import TransactionReport from './TransactionReport'
import SupplierList from './SupplierList'
import NewSupplier from './NewSupplier'
import UserList from './UserList'
import NewUser from './NewUser'
import Discount from './Discount'
import NewDiscount from './NewDiscount'
import DailyReport from './DailyReport'
import MonthlyReport from './MonthlyReport'
import Purchase from './Purchase'
import PurchaseList from './PurchaseList'
import InventoryLedger from './InventoryLedger'
import '../styles/Dashboard.css'

function Dashboard() {
  const location = useLocation()
  const navigate = useNavigate()
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [summary, setSummary] = useState({ totalSales: 0, totalPurchases: 0, lowStockCount: 0, todaySales: 0, monthSales: 0 })
  const [recentSales, setRecentSales] = useState([])
  const [summaryError, setSummaryError] = useState(null)

  useEffect(() => {
    dashboardApi.getSummary().then((data) => {
      setSummary(data || {})
      setSummaryError(null)
    }).catch((err) => {
      setSummaryError(err.message || 'Failed to load summary')
    })
    salesApi.getAll().then((list) => {
      setRecentSales(Array.isArray(list) ? list.slice(0, 10) : [])
    }).catch(() => setRecentSales([]))
  }, [])

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
    if (path.startsWith('/products/edit')) return 'NewProduct'
    if (path === '/products/new') return 'NewProduct'
    if (path === '/products') return 'Products'
    if (path === '/low-stocks') return 'Low Stocks'
    if (path.startsWith('/category/edit')) return 'NewCategory'
    if (path === '/category/new') return 'NewCategory'
    if (path === '/category') return 'Category'
    if (path === '/discount/new') return 'NewDiscount'
    if (path === '/discount') return 'Discount'
    if (path === '/purchases') return 'Purchases'
    if (path === '/purchase') return 'Purchase'
    if (path === '/inventory-ledger') return 'Inventory Ledger'
    if (path === '/transaction') return 'Transaction'
    if (path.startsWith('/suppliers/edit')) return 'NewSupplier'
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
          lowStockCount={summary.lowStockCount ?? 0}
        />
        <main className="dashboard-main">
          {currentPage === 'Dashboard' && (
            <div className="dashboard-content-wrapper">
          {/* Summary Cards - data from backend */}
          <section className="dashboard-section">
            <h2 className="section-title">Summary</h2>
            {summaryError && <div className="dashboard-error">{summaryError}</div>}
            <div className="cards-grid dashboard-summary-grid">
              <div className="stat-card cyan">
                <div className="card-icon">📈</div>
                <div className="card-content">
                  <div className="card-value">{(summary.totalSales ?? 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</div>
                  <div className="card-label">Total Sales</div>
                </div>
              </div>
              <div className="stat-card dark-blue">
                <div className="card-icon">🛒</div>
                <div className="card-content">
                  <div className="card-value">{(summary.totalPurchases ?? 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</div>
                  <div className="card-label">Total Purchases</div>
                </div>
              </div>
              <div className="stat-card purple">
                <div className="card-icon">📦</div>
                <div className="card-content">
                  <div className="card-value">{summary.lowStockCount ?? 0}</div>
                  <div className="card-label">Low Stock Count</div>
                </div>
              </div>
              <div className={`stat-card ${(summary.totalSales ?? 0) - (summary.totalPurchases ?? 0) >= 0 ? 'green' : 'red'}`}>
                <div className="card-icon">{(summary.totalSales ?? 0) - (summary.totalPurchases ?? 0) >= 0 ? '💰' : '📉'}</div>
                <div className="card-content">
                  <div className="card-value">{((summary.totalSales ?? 0) - (summary.totalPurchases ?? 0)) >= 0 ? '' : '-'}{Math.abs((summary.totalSales ?? 0) - (summary.totalPurchases ?? 0)).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</div>
                  <div className="card-label">Profit / Loss Summary</div>
                </div>
              </div>
            </div>
          </section>

          {/* Analysis - Today vs Month from backend */}
          <section className="dashboard-section dashboard-analysis">
            <h2 className="section-title">Analysis</h2>
            <div className="dashboard-charts-grid">
              <div className="dashboard-chart-card">
                <h3 className="chart-title">Sales vs Purchases</h3>
                <div className="chart-bars-comparison">
                  <div className="chart-comparison-row">
                    <span className="chart-bar-label">Total Sales</span>
                    <div className="chart-bar-track">
                      <div className="chart-bar-fill fill-sales" style={{ width: `${(summary.totalSales ?? 0) + (summary.totalPurchases ?? 0) > 0 ? ((summary.totalSales ?? 0) / ((summary.totalSales ?? 0) + (summary.totalPurchases ?? 0))) * 100 : 50}%` }} />
                      <span className="chart-bar-value">₹{(summary.totalSales ?? 0).toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
                    </div>
                  </div>
                  <div className="chart-comparison-row">
                    <span className="chart-bar-label">Total Purchases</span>
                    <div className="chart-bar-track">
                      <div className="chart-bar-fill fill-purchases" style={{ width: `${(summary.totalSales ?? 0) + (summary.totalPurchases ?? 0) > 0 ? ((summary.totalPurchases ?? 0) / ((summary.totalSales ?? 0) + (summary.totalPurchases ?? 0))) * 100 : 50}%` }} />
                      <span className="chart-bar-value">₹{(summary.totalPurchases ?? 0).toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="dashboard-chart-card">
                <h3 className="chart-title">Today vs This Month</h3>
                <div className="chart-bars-comparison">
                  <div className="chart-comparison-row">
                    <span className="chart-bar-label">Today Sales</span>
                    <div className="chart-bar-track">
                      <div className="chart-bar-fill fill-sales" style={{ width: `${(summary.monthSales ?? 0) > 0 ? ((summary.todaySales ?? 0) / (summary.monthSales ?? 1)) * 100 : 0}%` }} />
                      <span className="chart-bar-value">₹{(summary.todaySales ?? 0).toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
                    </div>
                  </div>
                  <div className="chart-comparison-row">
                    <span className="chart-bar-label">Month Sales</span>
                    <div className="chart-bar-track">
                      <div className="chart-bar-fill fill-sales" style={{ width: '100%' }} />
                      <span className="chart-bar-value">₹{(summary.monthSales ?? 0).toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Recent Sales Table - data from backend */}
          <section className="dashboard-section">
            <div className="section-header">
              <h2 className="section-title">Recent Sales</h2>
              <button type="button" className="view-all-btn" onClick={() => handleNavigation('/transaction')}>View All →</button>
            </div>
            <div className="dashboard-table-wrap">
              <table className="dashboard-table">
                <thead>
                  <tr>
                    <th>Invoice No</th>
                    <th>Date</th>
                    <th>User</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {recentSales.length === 0 ? (
                    <tr><td colSpan="4" className="no-data">No recent sales</td></tr>
                  ) : (
                    recentSales.map((s) => (
                      <tr key={s.id}>
                        <td>{s.invoiceNo}</td>
                        <td>{s.saleDate ? new Date(s.saleDate).toLocaleDateString() : '-'}</td>
                        <td>{s.user ? `${s.user.firstName || ''} ${s.user.lastName || ''}`.trim() || '-' : '-'}</td>
                        <td>₹{(s.totalAmount ?? 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </section>

          {/* Stock Alerts Section - from backend */}
          <section className="dashboard-section">
            <div className="stock-alerts-header">
              <div className="alerts-badge">
                <FontAwesomeIcon icon={faBell} />
                <span className="badge-count">{summary.lowStockCount ?? 0}</span>
              </div>
              <button type="button" className="view-all-link" onClick={() => handleNavigation('/low-stocks')}>View All →</button>
            </div>
            <div className="stock-alerts-content">
              <div className="alert-message">
                <span className="check-icon">✓</span>
                <span>{(summary.lowStockCount ?? 0) > 0 ? `${summary.lowStockCount} product(s) below low stock threshold.` : 'No stock alerts at this time.'}</span>
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
          {currentPage === 'Purchases' && <PurchaseList />}
          {currentPage === 'Purchase' && <Purchase />}
          {currentPage === 'Category' && <Category />}
          {currentPage === 'NewCategory' && <NewCategory />}
          {currentPage === 'Discount' && <Discount />}
          {currentPage === 'NewDiscount' && <NewDiscount />}
          {currentPage === 'Inventory Ledger' && <InventoryLedger />}
          {currentPage === 'Transaction' && <TransactionReport />}
          {currentPage === 'Daily Report' && <DailyReport />}
          {currentPage === 'Monthly Report' && <MonthlyReport />}
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
