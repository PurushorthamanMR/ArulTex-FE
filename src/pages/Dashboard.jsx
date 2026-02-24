import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell, faPlus, faChartLine, faShoppingBag, faBox, faHistory } from '@fortawesome/free-solid-svg-icons'
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
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as ReTooltip, ResponsiveContainer, AreaChart, Area
} from 'recharts'
import SupplierList from './SupplierList'
import NewSupplier from './NewSupplier'
import UserList from './UserList'
import NewUser from './NewUser'
import Discount from './Discount'
import NewDiscount from './NewDiscount'
import Purchase from './Purchase'
import PurchaseList from './PurchaseList'
import InventoryLedger from './InventoryLedger'
import SalesAnalysis from './SalesAnalysis'
import '../styles/Dashboard.css'

function Dashboard() {
  const location = useLocation()
  const navigate = useNavigate()
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [summary, setSummary] = useState({ totalSales: 0, totalPurchases: 0, lowStockCount: 0, todaySales: 0, monthSales: 0 })
  const [recentSales, setRecentSales] = useState([])
  const [categoryPerformance, setCategoryPerformance] = useState([])
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

    salesApi.getReportByCategory().then((data) => {
      setCategoryPerformance(Array.isArray(data) ? data.sort((a, b) => b.totalAmount - a.totalAmount).slice(0, 5) : [])
    }).catch(() => setCategoryPerformance([]))
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
    if (path === '/transaction') return 'Transaction Report'
    if (path === '/analysis') return 'Sales Analysis'
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
              {/* Hero Section */}
              <header className="dashboard-hero">
                <div className="hero-text">
                  <h1 className="hero-greeting">Welcome back, Admin!</h1>
                  <p className="hero-date">{new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                </div>
                <div className="quick-actions">
                  <button className="action-btn primary" onClick={() => handleNavigation('/pos')}>
                    <FontAwesomeIcon icon={faPlus} /> New Sale
                  </button>
                  <button className="action-btn secondary" onClick={() => handleNavigation('/products/new')}>
                    <FontAwesomeIcon icon={faBox} /> Add Product
                  </button>
                </div>
              </header>

              {/* Summary Cards */}
              <section className="dashboard-section">
                {summaryError && <div className="dashboard-error">{summaryError}</div>}
                <div className="cards-grid dashboard-summary-grid">
                  <div className="stat-card premium-teal">
                    <div className="card-icon-wrap">
                      <FontAwesomeIcon icon={faChartLine} />
                    </div>
                    <div className="card-content">
                      <div className="card-label">Total Revenue</div>
                      <div className="card-value">LKR {(summary.totalSales ?? 0).toLocaleString('en-LK', { maximumFractionDigits: 0 })}</div>
                      <div className="card-trend up">+12.5% vs last month</div>
                    </div>
                  </div>
                  <div className="stat-card premium-blue">
                    <div className="card-icon-wrap">
                      <FontAwesomeIcon icon={faShoppingBag} />
                    </div>
                    <div className="card-content">
                      <div className="card-label">Total Purchases</div>
                      <div className="card-value">LKR {(summary.totalPurchases ?? 0).toLocaleString('en-LK', { maximumFractionDigits: 0 })}</div>
                      <div className="card-trend text-blue">Active sourcing</div>
                    </div>
                  </div>
                  <div className="stat-card premium-orange">
                    <div className="card-icon-wrap">
                      <FontAwesomeIcon icon={faBox} />
                    </div>
                    <div className="card-content">
                      <div className="card-label">Check Inventory</div>
                      <div className="card-value">{summary.lowStockCount ?? 0} Items</div>
                      <div className="card-trend down">Low stock alerts</div>
                    </div>
                  </div>
                  <div className="stat-card premium-indigo">
                    <div className="card-icon-wrap">
                      <FontAwesomeIcon icon={faHistory} />
                    </div>
                    <div className="card-content">
                      <div className="card-label">Daily Sales</div>
                      <div className="card-value">LKR {(summary.todaySales ?? 0).toLocaleString('en-LK', { maximumFractionDigits: 0 })}</div>
                      <div className="card-trend text-indigo">Today's activity</div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Enhanced Analytics Section */}
              <section className="dashboard-section analytics-section">
                <div className="analytics-grid">
                  <div className="analytics-card chart-card">
                    <div className="card-header-minimal">
                      <h3>Quick Glance: Sales Trend</h3>
                      <button className="view-link" onClick={() => handleNavigation('/analysis')}>Details →</button>
                    </div>
                    <div className="chart-area-premium">
                      <ResponsiveContainer width="100%" height={260}>
                        <AreaChart data={recentSales.slice(0, 7).reverse().map(s => ({
                          name: new Date(s.saleDate).toLocaleDateString(undefined, { day: 'numeric', month: 'short' }),
                          amount: s.totalAmount
                        }))}>
                          <defs>
                            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#0d9488" stopOpacity={0.15} />
                              <stop offset="95%" stopColor="#0d9488" stopOpacity={0} />
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} />
                          <ReTooltip
                            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 8px 16px rgba(0,0,0,0.08)' }}
                            formatter={(v) => [`LKR ${v.toLocaleString('en-LK')}`, 'Revenue']}
                          />
                          <Area type="monotone" dataKey="amount" stroke="#0d9488" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  <div className="analytics-card performance-card">
                    <h3>Top Categories</h3>
                    <div className="category-performance-list">
                      {categoryPerformance.length === 0 ? (
                        <p className="no-data-text">No category trends recorded</p>
                      ) : (
                        categoryPerformance.map((cat, idx) => (
                          <div key={idx} className="performance-item">
                            <div className="item-info">
                              <span className="item-name">{cat.categoryName}</span>
                              <span className="item-value">LKR {cat.totalAmount.toLocaleString('en-LK')}</span>
                            </div>
                            <div className="item-progress">
                              <div
                                className="progress-fill"
                                style={{ width: `${(categoryPerformance[0]?.totalAmount > 0) ? (cat.totalAmount / categoryPerformance[0].totalAmount) * 100 : 0}%` }}
                              />
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              </section>

              {/* Bottom Section: Recent Sales & Stock Alerts side by side */}
              <div className="dashboard-bottom-grid">
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
                          <th>Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentSales.length === 0 ? (
                          <tr><td colSpan="3" className="no-data">No recent sales</td></tr>
                        ) : (
                          recentSales.slice(0, 5).map((s) => (
                            <tr key={s.id}>
                              <td>{s.invoiceNo}</td>
                              <td>{s.saleDate ? new Date(s.saleDate).toLocaleDateString(undefined, { day: 'numeric', month: 'short' }) : '-'}</td>
                              <td>LKR {(s.totalAmount ?? 0).toLocaleString('en-LK', { minimumFractionDigits: 0 })}</td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </section>

                {/* Stock Alerts Section - from backend */}
                <section className="dashboard-section">
                  <div className="section-header">
                    <h2 className="section-title">Stock Status</h2>
                  </div>
                  <div className="stock-alerts-premium">
                    <div className="stock-alerts-header">
                      <div className="alerts-badge">
                        <FontAwesomeIcon icon={faBell} />
                        <span>Low Stock Alerts</span>
                      </div>
                      <span className="badge-count-premium">{summary.lowStockCount ?? 0}</span>
                    </div>
                    <div className="stock-alerts-content">
                      <div className="alert-message">
                        <span className={`check-icon-large ${(summary.lowStockCount ?? 0) > 0 ? 'warning' : 'success'}`}>
                          {(summary.lowStockCount ?? 0) > 0 ? '!' : '✓'}
                        </span>
                        <div className="alert-text">
                          <p className="alert-main-text">{(summary.lowStockCount ?? 0) > 0 ? `${summary.lowStockCount} items need attention` : 'All stocks are healthy'}</p>
                          <button className="view-all-link-premium" onClick={() => handleNavigation('/low-stocks')}>Manage Inventory →</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
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
          {currentPage === 'Transaction Report' && <TransactionReport />}
          {currentPage === 'Sales Analysis' && <SalesAnalysis />}
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
