import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faArrowsAlt, 
  faCompressAlt,
  faMoon, 
  faSun,
  faChevronDown,
  faChevronLeft,
  faChevronRight,
  faSignOutAlt
} from '@fortawesome/free-solid-svg-icons'
import '../styles/Header.css'

const DARK_THEME_KEY = 'arultex-dark-theme'

function Header({ onToggleSidebar, isSidebarCollapsed }) {
  const navigate = useNavigate()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(() => {
    try {
      return localStorage.getItem(DARK_THEME_KEY) === 'true'
    } catch {
      return false
    }
  })
  const dropdownRef = useRef(null)

  // Apply dark theme to document
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark-theme')
    } else {
      document.documentElement.classList.remove('dark-theme')
    }
    try {
      localStorage.setItem(DARK_THEME_KEY, isDarkMode ? 'true' : 'false')
    } catch (_) {}
  }, [isDarkMode])

  // Listen for fullscreen change (e.g. user presses Escape)
  useEffect(() => {
    const onFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }
    document.addEventListener('fullscreenchange', onFullscreenChange)
    return () => document.removeEventListener('fullscreenchange', onFullscreenChange)
  }, [])

  const handleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.().catch(() => {})
    } else {
      document.exitFullscreen?.()
    }
  }

  const handleDarkModeToggle = () => {
    setIsDarkMode((prev) => !prev)
  }

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
  const rawRole = (localStorage.getItem('userRole') || '').toUpperCase()
  const displayRole = (rawRole === 'DUMMY MANAGER' || rawRole === 'DUMMY_MANAGER') ? 'Manager' : (rawRole || '—')

  return (
    <header className="header">
      <div className="header-left">
        <div className="logo">
          <img src="/ATF.png" alt="Aruntex & Fancy Palace" className="logo-img" />
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
        <button type="button" className="header-icon-btn" aria-label={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'} onClick={handleFullscreen}>
          <FontAwesomeIcon icon={isFullscreen ? faCompressAlt : faArrowsAlt} />
        </button>
        <button type="button" className="header-icon-btn" aria-label={isDarkMode ? 'Light mode' : 'Dark mode'} onClick={handleDarkModeToggle}>
          <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} />
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
