import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowsAlt,
  faCompressAlt,
  faMoon,
  faSun,
  faLock
} from '@fortawesome/free-solid-svg-icons'
import '../styles/Header.css'

const DARK_THEME_KEY = 'arultex-dark-theme'

/**
 * @param {{
 *   openShift?: { id: number; openedAt?: string } | null
 *   shiftLoading?: boolean
 *   onCloseShift?: () => void | Promise<void>
 *   closingShift?: boolean
 * }} props
 */
function POSHeader({ openShift = null, shiftLoading = false, onCloseShift, closingShift = false }) {
  const [isFullscreen, setIsFullscreen] = useState(false)
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

  const canCloseShift = Boolean(openShift?.id) && !shiftLoading
  const closeDisabled = !canCloseShift || closingShift || typeof onCloseShift !== 'function'

  return (
    <header className="header">
      <div className="header-left" />

      <div className="header-right">
        <button
          type="button"
          className="header-icon-btn"
          aria-label={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
          onClick={handleFullscreen}
        >
          <FontAwesomeIcon icon={isFullscreen ? faCompressAlt : faArrowsAlt} />
        </button>
        <button
          type="button"
          className="header-icon-btn"
          aria-label={isDarkMode ? 'Light mode' : 'Dark mode'}
          onClick={handleDarkModeToggle}
        >
          <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} />
        </button>
        <button
          type="button"
          className="pos-header-close-shift-btn"
          onClick={() => onCloseShift?.()}
          disabled={closeDisabled}
          title={
            shiftLoading
              ? 'Checking shift…'
              : !openShift?.id
                ? 'Open a shift first'
                : 'Save Z report and close register shift'
          }
        >
          <FontAwesomeIcon icon={faLock} className="pos-header-close-shift-icon" />
          <span className="pos-header-close-shift-label">{closingShift ? 'Closing…' : 'Close shift'}</span>
        </button>
      </div>
    </header>
  )
}

export default POSHeader
