import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faTh, 
  faShoppingCart, 
  faBox, 
  faWrench, 
  faChartBar, 
  faChartLine, 
  faHexagon, 
  faFileAlt, 
  faTag,
  faFileInvoice,
  faCreditCard,
  faMoneyBillWave,
  faTimesCircle,
  faShoppingBag,
  faUsers,
  faUserFriends,
  faBuilding,
  faExchangeAlt,
  faCalendarPlus,
  faChartColumn,
  faClock,
  faCog,
  faUserCheck,
  faUser,
  faBook,
  faCalendarDay,
  faCalendarAlt
} from '@fortawesome/free-solid-svg-icons'
import '../styles/Sidebar.css'

function Sidebar({ onNavigate, currentPage, isCollapsed }) {
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
    if (path === '/tax') return 'Tax'
    if (path === '/discount' || path === '/discount/new') return 'Discount'
    if (path === '/transaction') return 'Transaction'
    if (path === '/reports/daily') return 'Daily Report'
    if (path === '/reports/monthly') return 'Monthly Report'
    if (path === '/customers') return 'Customers'
    if (path === '/suppliers') return 'Suppliers'
    if (path === '/users') return 'Users'
    return ''
  }

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
        {!isCollapsed && <h3 className="sidebar-section-title">Product Pricing & Stocks</h3>}
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
            title="Low Stocks"
          >
            <FontAwesomeIcon icon={faChartLine} className="menu-icon" />
            {!isCollapsed && <span>Low Stocks</span>}
          </li>
          <li 
            className={`sidebar-menu-item ${currentPage === 'Category' ? 'active' : ''}`}
            onClick={() => handleMenuClick('/category')}
            title="Category"
          >
            <FontAwesomeIcon icon={faHexagon} className="menu-icon" />
            {!isCollapsed && <span>Category</span>}
          </li>
          <li 
            className={`sidebar-menu-item ${currentPage === 'Tax' ? 'active' : ''}`}
            onClick={() => handleMenuClick('/tax')}
            title="Tax"
          >
            <FontAwesomeIcon icon={faFileAlt} className="menu-icon" />
            {!isCollapsed && <span>Tax</span>}
          </li>
          <li 
            className={`sidebar-menu-item ${currentPage === 'Discount' ? 'active' : ''}`}
            onClick={() => handleMenuClick('/discount')}
            title="Discount"
          >
            <FontAwesomeIcon icon={faTag} className="menu-icon" />
            {!isCollapsed && <span>Discount</span>}
          </li>
        </ul>
      </div>

      {/* Sales Section */}
      <div className="sidebar-section">
        {!isCollapsed && <h3 className="sidebar-section-title">Sales</h3>}
        <ul className="sidebar-menu">
          <li 
            className={`sidebar-menu-item ${currentPage === 'Transaction' ? 'active' : ''}`}
            onClick={() => handleMenuClick('/transaction')}
            title="Transaction"
          >
            <FontAwesomeIcon icon={faFileInvoice} className="menu-icon" />
            {!isCollapsed && <span>Transaction</span>}
          </li>
        </ul>
      </div>

      {/* People Section */}
      <div className="sidebar-section">
        {!isCollapsed && <h3 className="sidebar-section-title">People</h3>}
        <ul className="sidebar-menu">
          <li 
            className={`sidebar-menu-item ${currentPage === 'Customers' ? 'active' : ''}`}
            onClick={() => handleMenuClick('/customers')}
            title="Customers"
          >
            <FontAwesomeIcon icon={faUser} className="menu-icon" />
            {!isCollapsed && <span>Customers</span>}
          </li>
          <li 
            className={`sidebar-menu-item ${currentPage === 'Suppliers' ? 'active' : ''}`}
            onClick={() => handleMenuClick('/suppliers')}
            title="Suppliers"
          >
            <FontAwesomeIcon icon={faUserFriends} className="menu-icon" />
            {!isCollapsed && <span>Suppliers</span>}
          </li>
        </ul>
      </div>

      {/* Reports Section */}
      <div className="sidebar-section">
        {!isCollapsed && <h3 className="sidebar-section-title">Reports</h3>}
        <ul className="sidebar-menu">
          <li 
            className={`sidebar-menu-item ${currentPage === 'Daily Report' ? 'active' : ''}`}
            onClick={() => handleMenuClick('/reports/daily')}
            title="Daily Report"
          >
            <FontAwesomeIcon icon={faCalendarDay} className="menu-icon" />
            {!isCollapsed && <span>Daily Report</span>}
          </li>
          <li 
            className={`sidebar-menu-item ${currentPage === 'Monthly Report' ? 'active' : ''}`}
            onClick={() => handleMenuClick('/reports/monthly')}
            title="Monthly Report"
          >
            <FontAwesomeIcon icon={faCalendarAlt} className="menu-icon" />
            {!isCollapsed && <span>Monthly Report</span>}
          </li>
        </ul>
      </div>

      {/* Settings Section */}
      <div className="sidebar-section">
        {!isCollapsed && <h3 className="sidebar-section-title">Settings</h3>}
        <ul className="sidebar-menu">
          <li className="sidebar-menu-item" title="Manager Settings">
            <FontAwesomeIcon icon={faCog} className="menu-icon" />
            {!isCollapsed && <span>Manager Settings</span>}
          </li>
          <li className="sidebar-menu-item" title="Admin Settings">
            <FontAwesomeIcon icon={faUserCheck} className="menu-icon" />
            {!isCollapsed && <span>Admin Settings</span>}
          </li>
        </ul>
      </div>

      {/* User Management Section */}
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
          <li className="sidebar-menu-item" title="Admin Details">
            <FontAwesomeIcon icon={faUserCheck} className="menu-icon" />
            {!isCollapsed && <span>Admin Details</span>}
          </li>
        </ul>
      </div>

      {/* Documentation Section */}
      <div className="sidebar-section">
        {!isCollapsed && <h3 className="sidebar-section-title">Documentation</h3>}
        <ul className="sidebar-menu">
          <li className="sidebar-menu-item" title="User Manual">
            <FontAwesomeIcon icon={faBook} className="menu-icon" />
            {!isCollapsed && <span>User Manual</span>}
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Sidebar
