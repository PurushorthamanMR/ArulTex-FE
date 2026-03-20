import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTh, faSignOutAlt, faClock, faCheckCircle } from '@fortawesome/free-solid-svg-icons'
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
  const userRole = (localStorage.getItem('userRole') || '').toUpperCase()
  const canAccessDashboard = DASHBOARD_ROLES.includes(userRole)

  const handleDashboard = () => {
    if (!canAccessDashboard) return
    navigate('/dashboard')
  }

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
