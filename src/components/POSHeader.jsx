import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons'
import '../styles/POSHeader.css'

const DARK_THEME_KEY = 'arultex-dark-theme'

function POSHeader() {
  const [dateTime, setDateTime] = useState({ date: '', time: '' })
  const [isDarkMode, setIsDarkMode] = useState(() => {
    try {
      return localStorage.getItem(DARK_THEME_KEY) === 'true'
    } catch {
      return false
    }
  })

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

  const handleDarkModeToggle = () => {
    setIsDarkMode((prev) => !prev)
  }

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date()
      setDateTime({
        date: now.toLocaleDateString('en-LK', {
          weekday: 'short',
          day: '2-digit',
          month: 'short',
          year: 'numeric'
        }),
        time: now.toLocaleTimeString('en-LK', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true
        })
      })
    }
    updateDateTime()
    const interval = setInterval(updateDateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <header className="pos-header">
      <img src="/ATF.png" alt="Aruntex & Fancy Palace" className="pos-header-logo" />
      <div className="pos-header-title">Point of Sale</div>
      <div className="pos-header-spacer" />
      <div className="pos-header-right">
        <button
          type="button"
          className="pos-header-theme-btn"
          aria-label={isDarkMode ? 'Light mode' : 'Dark mode'}
          onClick={handleDarkModeToggle}
          title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} />
        </button>
        <div className="pos-date-time">
          <span className="pos-date">{dateTime.date}</span>
          <span className="pos-time">{dateTime.time}</span>
        </div>
      </div>
    </header>
  )
}

export default POSHeader
