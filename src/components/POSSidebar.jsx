import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTh, faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import '../styles/POSSidebar.css'

const DASHBOARD_ROLES = ['ADMIN', 'MANAGER']

function POSSidebar() {
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
      </div>
      <div className="pos-sidebar-bottom">
        <button type="button" className="pos-sidebar-item" title="Profile">
          <FontAwesomeIcon icon={faUser} className="pos-sidebar-icon" />
          <span>Profile</span>
        </button>
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
