import { useState, useEffect } from 'react'
import '../styles/POSHeader.css'

function POSHeader() {
  const [dateTime, setDateTime] = useState({ date: '', time: '' })

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date()
      setDateTime({
        date: now.toLocaleDateString('en-IN', {
          weekday: 'short',
          day: '2-digit',
          month: 'short',
          year: 'numeric'
        }),
        time: now.toLocaleTimeString('en-IN', {
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
      <div className="pos-header-spacer" />
      <div className="pos-header-right">
        <div className="pos-date-time">
          <span className="pos-date">{dateTime.date}</span>
          <span className="pos-time">{dateTime.time}</span>
        </div>
      </div>
    </header>
  )
}

export default POSHeader
