import { useLocation, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faTh,
  faSignOutAlt,
  faClock,
  faCheckCircle,
  faShoppingCart,
  faUser,
  faFileInvoice,
  faBarcode,
  faWarehouse,
  faChartBar
} from '@fortawesome/free-solid-svg-icons'
import '../styles/POSSidebar.css'

const DASHBOARD_ROLES = ['ADMIN', 'MANAGER', 'DUMMY MANAGER']

const LOGO_FALLBACK_DATA_URI =
  'data:image/svg+xml;charset=utf-8,' +
  encodeURIComponent(
    "<svg xmlns='http://www.w3.org/2000/svg' width='160' height='56' viewBox='0 0 160 56'>" +
      "<rect width='160' height='56' rx='10' fill='#0d9488'/>" +
      "<text x='80' y='35' text-anchor='middle' font-size='18' font-family='Inter, Arial, sans-serif' fill='#ffffff'>ATF</text>" +
    '</svg>'
  )

/**
 * @param {{
 *   shift?: { id: number } | null
 *   shiftLoading?: boolean
 *   openingShift?: boolean
 *   onOpenShift?: () => void | Promise<void>
 * }} props
 */
function POSSidebar({ shift = null, shiftLoading = false, openingShift = false, onOpenShift }) {
  const navigate = useNavigate()
  const location = useLocation()
  const userRole = (localStorage.getItem('userRole') || '').toUpperCase()
  const canAccessDashboard = DASHBOARD_ROLES.includes(userRole)
  const isStaff = userRole === 'STAFF'
  const canAccessCustomerManagement = isStaff || canAccessDashboard
  // Staff should also see the Transactions button.
  const canAccessTransactions = isStaff || canAccessDashboard
  const canAccessZReport = isStaff || canAccessDashboard
  const canAccessBarcodes = isStaff || canAccessDashboard
  const canAccessStock = isStaff || canAccessDashboard
  const currentPath = location.pathname || ''
  const normalizedPath = currentPath.replace(/\/$/, '')

  const isPosActive = normalizedPath === '/pos'
  const isCustomerActive = normalizedPath.startsWith('/pos/customer')
  const isTransactionActive = normalizedPath.startsWith('/pos/transaction')
  const isZReportActive = normalizedPath.startsWith('/pos/z-report')
  const isBarcodesActive = normalizedPath.startsWith('/pos/barcode')
  const isStockActive = normalizedPath.startsWith('/pos/stock')

  const handleDashboard = () => {
    if (!canAccessDashboard) return
    navigate('/dashboard')
  }

  const handlePOS = () => navigate('/pos')
  const handleCustomer = () => canAccessCustomerManagement && navigate('/pos/customer')
  const handleTransaction = () => canAccessTransactions && navigate('/pos/transaction')
  const handleZReport = () => canAccessZReport && navigate('/pos/z-report')
  const handleBarcodes = () => canAccessBarcodes && navigate('/pos/barcode')
  const handleStock = () => canAccessStock && navigate('/pos/stock')

  const clearAuthAndRedirect = () => {
    localStorage.removeItem('isAuthenticated')
    localStorage.removeItem('userRole')
    localStorage.removeItem('userFirstName')
    localStorage.removeItem('userLastName')
    localStorage.removeItem('accessToken')
    navigate('/signin', { replace: true })
  }

  return (
    <aside className="pos-sidebar">
      <div className="pos-sidebar-top">
        <div className="pos-sidebar-logo">
          <img
            src="/ATF.png"
            alt="Arultex & Fancy Palace"
            className="pos-sidebar-logo-img"
            onError={(e) => {
              // If /ATF.png is missing, show a fallback instead of a broken image icon.
              e.currentTarget.onerror = null
              e.currentTarget.src = LOGO_FALLBACK_DATA_URI
            }}
          />
        </div>
        {!isStaff && (
          <button
            type="button"
            className={`pos-sidebar-item ${!canAccessDashboard ? 'pos-sidebar-item--disabled' : ''}`}
            onClick={handleDashboard}
            disabled={!canAccessDashboard}
            title={canAccessDashboard ? 'Dashboard' : 'Dashboard (not available for your role)'}
          >
            <FontAwesomeIcon icon={faTh} className="pos-sidebar-icon" />
            <span>Dashboard</span>
          </button>
        )}

        <button
          type="button"
          className={`pos-sidebar-item ${isPosActive ? 'pos-sidebar-item--active' : ''}`}
          onClick={handlePOS}
          title="POS"
        >
          <FontAwesomeIcon icon={faShoppingCart} className="pos-sidebar-icon" />
          <span>POS</span>
        </button>

        <button
          type="button"
          className={`pos-sidebar-item ${!canAccessCustomerManagement ? 'pos-sidebar-item--disabled' : ''} ${isCustomerActive ? 'pos-sidebar-item--active' : ''}`}
          onClick={handleCustomer}
          disabled={!canAccessCustomerManagement}
          title="Customer"
        >
          <FontAwesomeIcon icon={faUser} className="pos-sidebar-icon" />
          <span>Customer</span>
        </button>

        {canAccessTransactions && (
          <button
            type="button"
            className={`pos-sidebar-item ${isTransactionActive ? 'pos-sidebar-item--active' : ''}`}
            onClick={handleTransaction}
            title="Transaction"
          >
            <FontAwesomeIcon icon={faFileInvoice} className="pos-sidebar-icon" />
            <span>Transaction</span>
          </button>
        )}

        {canAccessZReport && (
          <button
            type="button"
            className={`pos-sidebar-item ${isZReportActive ? 'pos-sidebar-item--active' : ''}`}
            onClick={handleZReport}
            title="Z Report"
          >
            <FontAwesomeIcon icon={faChartBar} className="pos-sidebar-icon" />
            <span>Z Report</span>
          </button>
        )}

        {canAccessBarcodes && (
          <button
            type="button"
            className={`pos-sidebar-item ${isBarcodesActive ? 'pos-sidebar-item--active' : ''}`}
            onClick={handleBarcodes}
            title="Barcodes"
          >
            <FontAwesomeIcon icon={faBarcode} className="pos-sidebar-icon" />
            <span>Barcodes</span>
          </button>
        )}

        {canAccessStock && (
          <button
            type="button"
            className={`pos-sidebar-item ${isStockActive ? 'pos-sidebar-item--active' : ''}`}
            onClick={handleStock}
            title="Stock"
          >
            <FontAwesomeIcon icon={faWarehouse} className="pos-sidebar-icon" />
            <span>Stock</span>
          </button>
        )}

        {/* Shift info:
            - When shift is open (shift?.id), do not show status in the sidebar (header-only).
            - When shift is closed, show only the "Open shift" button. */}
        {shiftLoading ? (
          <div className="pos-sidebar-shift-status" title="Checking shift…">
            <span className="pos-sidebar-shift-dots" aria-hidden>…</span>
            <span>Shift</span>
          </div>
        ) : shift?.id ? null : (
          <button
            type="button"
            className="pos-sidebar-item pos-sidebar-item--open-shift"
            onClick={() => onOpenShift?.()}
            disabled={openingShift || typeof onOpenShift !== 'function'}
            title="Open register shift before taking sales"
          >
            <FontAwesomeIcon icon={faClock} className="pos-sidebar-icon" />
            <span>{openingShift ? '…' : 'Open shift'}</span>
          </button>
        )}
      </div>
      <div className="pos-sidebar-bottom">
        <button
          type="button"
          className="pos-sidebar-item logout-item"
          onClick={clearAuthAndRedirect}
          title="Logout"
        >
          <FontAwesomeIcon icon={faSignOutAlt} className="pos-sidebar-icon" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  )
}

export default POSSidebar
