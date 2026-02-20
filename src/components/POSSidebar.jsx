import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTh, faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import '../styles/POSSidebar.css'

function POSSidebar() {
  const navigate = useNavigate()

  const handleDashboard = () => {
    navigate('/dashboard')
  }

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated')
    localStorage.removeItem('userRole')
    navigate('/signin')
  }

  return (
    <aside className="pos-sidebar">
      <div className="pos-sidebar-top">
        <button
          type="button"
          className="pos-sidebar-item"
          onClick={handleDashboard}
          title="Dashboard"
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
          onClick={handleLogout}
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
