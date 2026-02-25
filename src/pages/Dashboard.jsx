import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faPlus, faChartLine, faShoppingBag, faBox, faHistory,
  faCashRegister, faBoxOpen, faUsers, faTruck, faListAlt, faChartBar,
  faWarehouse, faTag, faArrowRight, faExclamationTriangle
} from '@fortawesome/free-solid-svg-icons'
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
  XAxis, YAxis, CartesianGrid, Tooltip as ReTooltip, ResponsiveContainer, AreaChart, Area
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

const SHORTCUTS = [
  { label: 'New Sale', icon: faCashRegister, path: '/pos', color: '#0d9488', bg: '#f0fdfa', desc: 'Open POS', roles: ['ADMIN', 'MANAGER', 'STAFF'] },
  { label: 'Add Product', icon: faBoxOpen, path: '/products/new', color: '#6366f1', bg: '#f5f3ff', desc: 'New inventory', roles: ['ADMIN', 'MANAGER'] },
  { label: 'New Purchase', icon: faTruck, path: '/purchase', color: '#f59e0b', bg: '#fffbeb', desc: 'Record purchase', roles: ['ADMIN', 'MANAGER'] },
  { label: 'Register User', icon: faUsers, path: '/users/new', color: '#ec4899', bg: '#fdf2f8', desc: 'Add staff/admin', roles: ['ADMIN'] },
  { label: 'Add Supplier', icon: faShoppingBag, path: '/suppliers/new', color: '#14b8a6', bg: '#f0fdfa', desc: 'New supplier', roles: ['ADMIN', 'MANAGER'] },
  { label: 'New Category', icon: faTag, path: '/category/new', color: '#8b5cf6', bg: '#f5f3ff', desc: 'Product group', roles: ['ADMIN', 'MANAGER'] },
  { label: 'Transactions', icon: faListAlt, path: '/transaction', color: '#2563eb', bg: '#eff6ff', desc: 'View all sales', roles: ['ADMIN', 'MANAGER', 'STAFF'] },
  { label: 'Sales Analysis', icon: faChartBar, path: '/analysis', color: '#f97316', bg: '#fff7ed', desc: 'Reports', roles: ['ADMIN', 'MANAGER'] },
  { label: 'Inventory', icon: faWarehouse, path: '/inventory-ledger', color: '#0891b2', bg: '#ecfeff', desc: 'Stock ledger', roles: ['ADMIN', 'MANAGER'] },
  { label: 'Low Stocks', icon: faExclamationTriangle, path: '/low-stocks', color: '#dc2626', bg: '#fef2f2', desc: 'Alerts', roles: ['ADMIN', 'MANAGER', 'STAFF'] },
]

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

  const handleToggleSidebar = () => setIsSidebarCollapsed(!isSidebarCollapsed)
  const handleNavigation = (path) => navigate(path)

  const userFirstName = localStorage.getItem('userFirstName') || 'User'
  const currentUserRole = (localStorage.getItem('userRole') || '').toUpperCase()

  // Filter shortcuts by role
  const visibleShortcuts = SHORTCUTS.filter(s => s.roles.includes(currentUserRole))

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
    if (path.startsWith('/purchases/edit')) return 'Purchase'
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

  // Sales chart data
  const chartData = recentSales.slice(0, 7).reverse().map(s => ({
    name: new Date(s.saleDate).toLocaleDateString(undefined, { day: 'numeric', month: 'short' }),
    amount: s.totalAmount
  }))

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

              {/* ── Hero Section ── */}
              <header className="dashboard-hero">
                <div className="hero-text">
                  <h1 className="hero-greeting">Welcome back, {userFirstName}! 👋</h1>
                  <p className="hero-date">
                    {new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                </div>
                <div className="quick-actions">
                  <button className="action-btn primary" onClick={() => handleNavigation('/pos')}>
                    <FontAwesomeIcon icon={faCashRegister} /> New Sale
                  </button>
                  <button className="action-btn secondary" onClick={() => handleNavigation('/products/new')}>
                    <FontAwesomeIcon icon={faBox} /> Add Product
                  </button>
                  {currentUserRole === 'ADMIN' && (
                    <button className="action-btn tertiary" onClick={() => handleNavigation('/users/new')}>
                      <FontAwesomeIcon icon={faPlus} /> New User
                    </button>
                  )}
                </div>
              </header>

              {/* ── KPI Summary Cards ── */}
              <section className="dashboard-section">
                {summaryError && <div className="dashboard-error">{summaryError}</div>}
                <div className="cards-grid dashboard-summary-grid">
                  <div className="stat-card premium-teal" onClick={() => handleNavigation('/transaction')} style={{ cursor: 'pointer' }}>
                    <div className="card-icon-wrap">
                      <FontAwesomeIcon icon={faChartLine} />
                    </div>
                    <div className="card-content">
                      <div className="card-label">Total Revenue</div>
                      <div className="card-value">LKR {(summary.totalSales ?? 0).toLocaleString('en-LK', { maximumFractionDigits: 0 })}</div>
                      <div className="card-trend up">↑ Cumulative sales</div>
                    </div>
                  </div>
                  <div className="stat-card premium-blue" onClick={() => handleNavigation('/purchases')} style={{ cursor: 'pointer' }}>
                    <div className="card-icon-wrap">
                      <FontAwesomeIcon icon={faShoppingBag} />
                    </div>
                    <div className="card-content">
                      <div className="card-label">Total Purchases</div>
                      <div className="card-value">LKR {(summary.totalPurchases ?? 0).toLocaleString('en-LK', { maximumFractionDigits: 0 })}</div>
                      <div className="card-trend text-blue">Active sourcing</div>
                    </div>
                  </div>
                  <div className="stat-card premium-orange" onClick={() => handleNavigation('/low-stocks')} style={{ cursor: 'pointer' }}>
                    <div className="card-icon-wrap">
                      <FontAwesomeIcon icon={faBox} />
                    </div>
                    <div className="card-content">
                      <div className="card-label">Low Stock Items</div>
                      <div className="card-value" style={{ color: (summary.lowStockCount ?? 0) > 0 ? '#dc2626' : '#1e293b' }}>
                        {summary.lowStockCount ?? 0} Items
                      </div>
                      <div className="card-trend down">
                        {(summary.lowStockCount ?? 0) > 0 ? '⚠ Need restocking' : '✓ All healthy'}
                      </div>
                    </div>
                  </div>
                  <div className="stat-card premium-indigo">
                    <div className="card-icon-wrap">
                      <FontAwesomeIcon icon={faHistory} />
                    </div>
                    <div className="card-content">
                      <div className="card-label">Today's Sales</div>
                      <div className="card-value">LKR {(summary.todaySales ?? 0).toLocaleString('en-LK', { maximumFractionDigits: 0 })}</div>
                      <div className="card-trend text-indigo">Today's activity</div>
                    </div>
                  </div>
                </div>
              </section>

              {/* ── Quick Shortcuts ── */}
              <section className="dashboard-section">
                <div className="section-header">
                  <h2 className="section-title">Quick Shortcuts</h2>
                  <span className="shortcuts-hint">Click any card to navigate</span>
                </div>
                <div className="shortcuts-grid">
                  {visibleShortcuts.map((s) => (
                    <button
                      key={s.path}
                      className="shortcut-card"
                      onClick={() => handleNavigation(s.path)}
                      style={{ '--sc-color': s.color, '--sc-bg': s.bg }}
                    >
                      <div className="shortcut-icon" style={{ backgroundColor: s.bg, color: s.color }}>
                        <FontAwesomeIcon icon={s.icon} />
                      </div>
                      <div className="shortcut-info">
                        <span className="shortcut-label">{s.label}</span>
                        <span className="shortcut-desc">{s.desc}</span>
                      </div>
                      <FontAwesomeIcon icon={faArrowRight} className="shortcut-arrow" />
                    </button>
                  ))}
                </div>
              </section>

              {/* ── Analytics Section ── */}
              <section className="dashboard-section analytics-section">
                <div className="analytics-grid">
                  <div className="analytics-card chart-card">
                    <div className="card-header-minimal">
                      <h3>Sales Trend (Recent)</h3>
                      <button className="view-link" onClick={() => handleNavigation('/analysis')}>Full Analysis →</button>
                    </div>
                    <div className="chart-area-premium">
                      <ResponsiveContainer width="100%" height={220}>
                        <AreaChart data={chartData}>
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
                            formatter={(v) => [`LKR ${Number(v).toLocaleString('en-LK')}`, 'Revenue']}
                          />
                          <Area type="monotone" dataKey="amount" stroke="#0d9488" strokeWidth={2.5} fillOpacity={1} fill="url(#colorRevenue)" />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  <div className="analytics-card performance-card">
                    <div className="card-header-minimal">
                      <h3>Top Categories</h3>
                      <button className="view-link" onClick={() => handleNavigation('/analysis')}>Details →</button>
                    </div>
                    <div className="category-performance-list">
                      {categoryPerformance.length === 0 ? (
                        <p className="no-data-text">No category data found</p>
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

              {/* ── Bottom: Recent Sales ── */}
              <div className="dashboard-bottom-full">
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
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentSales.length === 0 ? (
                          <tr><td colSpan="4" className="no-data">No recent sales data</td></tr>
                        ) : (
                          recentSales.slice(0, 6).map((s) => (
                            <tr key={s.id}>
                              <td style={{ fontWeight: 600, color: '#0d9488' }}>{s.invoiceNo}</td>
                              <td>{s.saleDate ? new Date(s.saleDate).toLocaleDateString(undefined, { day: 'numeric', month: 'short' }) : '-'}</td>
                              <td>LKR {(s.totalAmount ?? 0).toLocaleString('en-LK', { minimumFractionDigits: 0 })}</td>
                              <td><span className={`sale-status ${s.status?.toLowerCase()}`}>{s.status || 'Completed'}</span></td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </section>
              </div>

            </div>
          )}

          {currentPage === 'Products' && <ProductList onAddNew={() => handleNavigation('/products/new')} />}
          {currentPage === 'NewProduct' && <NewProduct onBack={() => handleNavigation('/products')} onSave={() => handleNavigation('/products')} />}
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
