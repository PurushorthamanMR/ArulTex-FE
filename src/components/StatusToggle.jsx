import React from 'react'
import '../styles/StatusToggle.css'

function StatusToggle({ value, onChange, disabled = false }) {
  const handleClick = () => {
    if (disabled) return
    onChange(!value)
  }

  return (
    <button
      type="button"
      className={`status-toggle-switch ${value ? 'on' : 'off'}${disabled ? ' disabled' : ''}`}
      onClick={handleClick}
      aria-pressed={value}
      aria-label={value ? 'Set inactive' : 'Set active'}
      disabled={disabled}
    >
      <span className="status-toggle-thumb" />
    </button>
  )
}

export default StatusToggle

