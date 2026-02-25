import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faTh,
  faShoppingCart,
  faBox,
  faChartLine,
  faHexagon,
  faFileInvoice,
  faShoppingBag,
  faUserFriends,
  faUserCheck,
  faBook,
  faCalendarDay,
  faCalendarAlt,
  faChartBar
} from '@fortawesome/free-solid-svg-icons'
import '../styles/Sidebar.css'

function Sidebar({ onNavigate, currentPage, isCollapsed, lowStockCount = 0 }) {
  const handleMenuClick = (path) => {
    if (onNavigate) {
      onNavigate(path)
    }
  }

  // Map paths to page names for active state
  const getPageName = (path) => {
    if (path === '/dashboard') return 'Dashboard'
    if (path === '/products' || path === '/products/new') return 'Products'
    if (path === '/low-stocks') return 'Low Stocks'
    if (path === '/category') return 'Category'
    if (path === '/discount' || path === '/discount/new') return 'Discount'
    if (path === '/purchase') return 'Purchase'
    if (path === '/inventory-ledger') return 'Inventory Ledger'
    if (path === '/transaction') return 'Transaction Report'
    if (path === '/analysis') return 'Sales Analysis'
    if (path === '/suppliers') return 'Suppliers'
    if (path === '/users') return 'Users'
    return ''
  }

  const currentUserRole = (localStorage.getItem('userRole') || '').toUpperCase()

  return (
    <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      {/* Main Section */}
      <div className="sidebar-section">
        {!isCollapsed && <h3 className="sidebar-section-title">Main</h3>}
        <ul className="sidebar-menu">
          <li
            className={`sidebar-menu-item ${currentPage === 'Dashboard' ? 'active' : ''}`}
            onClick={() => handleMenuClick('/dashboard')}
            title="Dashboard"
          >
            <FontAwesomeIcon icon={faTh} className="menu-icon" />
            {!isCollapsed && <span>Dashboard</span>}
          </li>
          <li
            className={`sidebar-menu-item ${currentPage === 'POS' ? 'active' : ''}`}
            onClick={() => handleMenuClick('/pos')}
            title="POS"
          >
            <FontAwesomeIcon icon={faShoppingCart} className="menu-icon" />
            {!isCollapsed && <span>POS</span>}
          </li>
        </ul>
      </div>

      {/* Inventory Section */}
      <div className="sidebar-section">
        {!isCollapsed && <h3 className="sidebar-section-title">Inventory</h3>}
        <ul className="sidebar-menu">
          <li
            className={`sidebar-menu-item ${currentPage === 'Products' ? 'active' : ''}`}
            onClick={() => handleMenuClick('/products')}
            title="Products"
          >
            <FontAwesomeIcon icon={faBox} className="menu-icon" />
            {!isCollapsed && <span>Products</span>}
          </li>
          <li
            className={`sidebar-menu-item ${currentPage === 'Low Stocks' ? 'active' : ''}`}
            onClick={() => handleMenuClick('/low-stocks')}
            title={lowStockCount > 0 ? `Low Stocks (${lowStockCount})` : 'Low Stocks'}
          >
            <FontAwesomeIcon icon={faChartLine} className="menu-icon" />
            {!isCollapsed && (
              <span className="sidebar-label-wrap">
                <span>Low Stocks</span>
                {lowStockCount > 0 && (
                  <span className="sidebar-badge notification-badge" aria-label={`${lowStockCount} low stock`}>
                    {lowStockCount > 99 ? '99+' : lowStockCount}
                  </span>
                )}
              </span>
            )}
            {isCollapsed && lowStockCount > 0 && (
              <span className="sidebar-badge notification-badge collapsed-badge" aria-label={`${lowStockCount} low stock`}>
                {lowStockCount > 99 ? '99+' : lowStockCount}
              </span>
            )}
          </li>
          <li
            className={`sidebar-menu-item ${currentPage === 'Category' ? 'active' : ''}`}
            onClick={() => handleMenuClick('/category')}
            title="Category"
          >
            <FontAwesomeIcon icon={faHexagon} className="menu-icon" />
            {!isCollapsed && <span>Category</span>}
          </li>
        </ul>
      </div>

      {/* Purchase Section */}
      <div className="sidebar-section">
        {!isCollapsed && <h3 className="sidebar-section-title">Purchase</h3>}
        <ul className="sidebar-menu">
          <li
            className={`sidebar-menu-item ${currentPage === 'Suppliers' ? 'active' : ''}`}
            onClick={() => handleMenuClick('/suppliers')}
            title="Suppliers"
          >
            <FontAwesomeIcon icon={faUserFriends} className="menu-icon" />
            {!isCollapsed && <span>Suppliers</span>}
          </li>
          <li
            className={`sidebar-menu-item ${(currentPage === 'Purchases' || currentPage === 'Purchase') ? 'active' : ''}`}
            onClick={() => handleMenuClick('/purchases')}
            title="Purchase"
          >
            <FontAwesomeIcon icon={faShoppingBag} className="menu-icon" />
            {!isCollapsed && <span>Purchase</span>}
          </li>
        </ul>
      </div>

      {/* Reports & History Section */}
      <div className="sidebar-section">
        {!isCollapsed && <h3 className="sidebar-section-title">Reports & History</h3>}
        <ul className="sidebar-menu">
          <li
            className={`sidebar-menu-item ${currentPage === 'Transaction Report' ? 'active' : ''}`}
            onClick={() => handleMenuClick('/transaction')}
            title="Transaction Report"
          >
            <FontAwesomeIcon icon={faFileInvoice} className="menu-icon" />
            {!isCollapsed && <span>Transaction Report</span>}
          </li>
          <li
            className={`sidebar-menu-item ${currentPage === 'Inventory Ledger' ? 'active' : ''}`}
            onClick={() => handleMenuClick('/inventory-ledger')}
            title="Inventory Ledger"
          >
            <FontAwesomeIcon icon={faBook} className="menu-icon" />
            {!isCollapsed && <span>Inventory Ledger</span>}
          </li>
          <li
            className={`sidebar-menu-item ${currentPage === 'Sales Analysis' ? 'active' : ''}`}
            onClick={() => handleMenuClick('/analysis')}
            title="Sales Analysis"
          >
            <FontAwesomeIcon icon={faChartBar} className="menu-icon" />
            {!isCollapsed && <span>Sales Analysis</span>}
          </li>
        </ul>
      </div>

      {/* User Management Section */}
      {(currentUserRole === 'ADMIN' || currentUserRole === 'MANAGER') && (
        <div className="sidebar-section">
          {!isCollapsed && <h3 className="sidebar-section-title">User Management</h3>}
          <ul className="sidebar-menu">
            <li
              className={`sidebar-menu-item ${currentPage === 'Users' ? 'active' : ''}`}
              onClick={() => handleMenuClick('/users')}
              title="Users"
            >
              <FontAwesomeIcon icon={faUserCheck} className="menu-icon" />
              {!isCollapsed && <span>Users</span>}
            </li>
          </ul>
        </div>
      )}
    </div>
  )
}

export default Sidebar
