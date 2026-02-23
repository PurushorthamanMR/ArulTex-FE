import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faArrowsAlt, 
  faMoon, 
  faChevronDown,
  faChevronLeft,
  faChevronRight,
  faSignOutAlt
} from '@fortawesome/free-solid-svg-icons'
import '../styles/Header.css'

function Header({ onToggleSidebar, isSidebarCollapsed }) {
  const navigate = useNavigate()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false)
      }
    }

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isDropdownOpen])

  const handleUserMenuClick = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated')
    localStorage.removeItem('userRole')
    localStorage.removeItem('userFirstName')
    localStorage.removeItem('userLastName')
    localStorage.removeItem('accessToken')
    navigate('/signin', { replace: true })
  }

  const displayName = [localStorage.getItem('userFirstName'), localStorage.getItem('userLastName')].filter(Boolean).join(' ') || 'User'
  const displayRole = (localStorage.getItem('userRole') || '').toUpperCase() || '—'

  return (
    <header className="header">
      <div className="header-left">
        <div className="logo">
          <img src="/logo.jpg" alt="Aruntex & Fancy Palace" className="logo-img" />
        </div>
        <button 
          className="sidebar-toggle"
          onClick={onToggleSidebar}
          aria-label="Toggle sidebar"
        >
          <FontAwesomeIcon 
            icon={isSidebarCollapsed ? faChevronRight : faChevronLeft} 
            className="toggle-icon" 
          />
        </button>
      </div>
      
      <div className="header-right">
        <button className="header-icon-btn" aria-label="Fullscreen">
          <FontAwesomeIcon icon={faArrowsAlt} />
        </button>
        <button className="header-icon-btn" aria-label="Dark mode">
          <FontAwesomeIcon icon={faMoon} />
        </button>
        <div className="user-menu-wrapper" ref={dropdownRef}>
          <button 
            className="user-menu-trigger" 
            onClick={handleUserMenuClick}
            aria-label="User menu"
          >
            <div className="user-info">
              <div className="user-name">{displayName}</div>
              <div className="user-role">{displayRole}</div>
            </div>
            <FontAwesomeIcon 
              icon={faChevronDown} 
              className={`chevron-icon ${isDropdownOpen ? 'open' : ''}`}
            />
          </button>
          
          {isDropdownOpen && (
            <div className="user-dropdown">
              <div className="dropdown-user-info">
                <div className="user-name">{displayName}</div>
                <div className="user-role">{displayRole}</div>
              </div>
              <div className="dropdown-separator"></div>
              <button className="logout-btn" onClick={handleLogout}>
                <FontAwesomeIcon icon={faSignOutAlt} />
                <span>Log Out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
