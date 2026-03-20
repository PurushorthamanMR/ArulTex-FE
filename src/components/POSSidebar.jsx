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
  const canAccessExtraModules = canAccessDashboard && !isStaff
  const currentPath = location.pathname || ''

  const handleDashboard = () => {
    if (!canAccessDashboard) return
    navigate('/dashboard')
  }

  const handlePOS = () => navigate('/pos')
  const handleCustomer = () => canAccessCustomerManagement && navigate('/pos/customer')
  const handleTransaction = () => canAccessExtraModules && navigate('/pos/transaction')
  const handleZReport = () => canAccessExtraModules && navigate('/pos/z-report')
  const handleBarcodes = () => canAccessExtraModules && navigate('/pos/barcode')
  const handleStock = () => canAccessExtraModules && navigate('/pos/stock')

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
          <img src="/ATF.png" alt="Arultex & Fancy Palace" className="pos-sidebar-logo-img" />
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
          className={`pos-sidebar-item ${currentPath === '/pos' ? 'pos-sidebar-item--active' : ''}`}
          onClick={handlePOS}
          title="POS"
        >
          <FontAwesomeIcon icon={faShoppingCart} className="pos-sidebar-icon" />
          <span>POS</span>
        </button>

        <button
          type="button"
          className={`pos-sidebar-item ${!canAccessCustomerManagement ? 'pos-sidebar-item--disabled' : ''} ${currentPath.startsWith('/pos/customer') ? 'pos-sidebar-item--active' : ''}`}
          onClick={handleCustomer}
          disabled={!canAccessCustomerManagement}
          title="Customer"
        >
          <FontAwesomeIcon icon={faUser} className="pos-sidebar-icon" />
          <span>Customer</span>
        </button>

        {canAccessExtraModules && (
          <>
            <button
              type="button"
              className={`pos-sidebar-item ${currentPath === '/pos/transaction' ? 'pos-sidebar-item--active' : ''}`}
              onClick={handleTransaction}
              title="Transaction"
            >
              <FontAwesomeIcon icon={faFileInvoice} className="pos-sidebar-icon" />
              <span>Transaction</span>
            </button>

            <button
              type="button"
              className={`pos-sidebar-item ${currentPath === '/pos/z-report' ? 'pos-sidebar-item--active' : ''}`}
              onClick={handleZReport}
              title="Z Report"
            >
              <FontAwesomeIcon icon={faChartBar} className="pos-sidebar-icon" />
              <span>Z Report</span>
            </button>

            <button
              type="button"
              className={`pos-sidebar-item ${currentPath === '/pos/barcode' ? 'pos-sidebar-item--active' : ''}`}
              onClick={handleBarcodes}
              title="Barcodes"
            >
              <FontAwesomeIcon icon={faBarcode} className="pos-sidebar-icon" />
              <span>Barcodes</span>
            </button>

            <button
              type="button"
              className={`pos-sidebar-item ${currentPath === '/pos/stock' ? 'pos-sidebar-item--active' : ''}`}
              onClick={handleStock}
              title="Stock"
            >
              <FontAwesomeIcon icon={faWarehouse} className="pos-sidebar-icon" />
              <span>Stock</span>
            </button>
          </>
        )}

        <div className="pos-sidebar-shift-wrap">
          {shiftLoading ? (
            <div className="pos-sidebar-shift-status" title="Checking shift…">
              <span className="pos-sidebar-shift-dots" aria-hidden>…</span>
              <span>Shift</span>
            </div>
          ) : shift?.id ? (
            <div
              className="pos-sidebar-shift-status pos-sidebar-shift-status--open"
              title={`Shift #${shift.id} open — close with Z Report in Sales Analysis`}
            >
              <FontAwesomeIcon icon={faCheckCircle} className="pos-sidebar-shift-icon-open" />
              <span>Open</span>
              <span className="pos-sidebar-shift-num">#{shift.id}</span>
            </div>
          ) : (
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
