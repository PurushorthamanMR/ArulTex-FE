import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faSyncAlt,
  faClock,
  faCashRegister,
  faPrint,
  faArrowRight,
  faCheckCircle,
  faCircle
} from '@fortawesome/free-solid-svg-icons'
import Swal from 'sweetalert2'
import * as shiftApi from '../api/shiftApi'
import '../styles/TransactionReport.css'
import '../styles/ShiftPage.css'

const CAN_OPEN_SHIFT_ROLES = ['ADMIN', 'MANAGER', 'STAFF', 'DUMMY MANAGER']

function userCanOpenShift() {
  const r = (localStorage.getItem('userRole') || '').toUpperCase().replace(/\s+/g, ' ')
  return CAN_OPEN_SHIFT_ROLES.includes(r)
}

function formatUser(u) {
  if (!u) return '—'
  const name = [u.firstName, u.lastName].filter(Boolean).join(' ').trim()
  return name || u.emailAddress || '—'
}

function ShiftPage() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [current, setCurrent] = useState(null)
  const [history, setHistory] = useState([])
  const [opening, setOpening] = useState(false)

  const canOpen = userCanOpenShift()

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const [c, list] = await Promise.all([
        shiftApi.getCurrent(),
        shiftApi.getShiftHistory(100)
      ])
      setCurrent(c && c.id ? c : null)
      setHistory(Array.isArray(list) ? list : [])
    } catch (e) {
      console.error(e)
      setCurrent(null)
      setHistory([])
      await Swal.fire({
        icon: 'error',
        title: 'Could not load shifts',
        text: e.message || 'Try again or check your connection.'
      })
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    load()
  }, [load])

  const handleOpenShift = async () => {
    if (!canOpen) return
    setOpening(true)
    try {
      const row = await shiftApi.openShift()
      setCurrent(row && row.id ? row : null)
      await load()
      await Swal.fire({
        icon: 'success',
        title: 'Shift opened',
        text: `Register shift #${row?.id} is now open.`,
        confirmButtonColor: '#0d9488'
      })
    } catch (e) {
      await Swal.fire({
        icon: 'error',
        title: 'Cannot open shift',
        text: e.message || 'A shift may already be open — close it with Z Report first.'
      })
    } finally {
      setOpening(false)
    }
  }

  return (
    <div className="transaction-report-container shift-page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Register shifts</h1>
          <p className="page-subtitle">
            Open shifts on <strong>POS</strong> or here (same rules). Close only with <strong>Z Report</strong> in Sales
            Analysis — archives live under <strong>Z Report</strong>.
          </p>
        </div>
        <div className="header-actions">
          <button type="button" className="action-btn refresh-btn" onClick={load} disabled={loading}>
            <FontAwesomeIcon icon={faSyncAlt} className={loading ? 'fa-spin' : ''} /> Refresh
          </button>
        </div>
      </div>

      <div className="shift-page-actions">
        <button type="button" className="shift-link-btn" onClick={() => navigate('/pos')}>
          <FontAwesomeIcon icon={faCashRegister} /> Open POS
          <FontAwesomeIcon icon={faArrowRight} className="shift-link-btn__arrow" />
        </button>
        <button type="button" className="shift-link-btn shift-link-btn--secondary" onClick={() => navigate('/analysis')}>
          <FontAwesomeIcon icon={faPrint} /> Sales Analysis (X / Z)
          <FontAwesomeIcon icon={faArrowRight} className="shift-link-btn__arrow" />
        </button>
        <button type="button" className="shift-link-btn shift-link-btn--secondary" onClick={() => navigate('/z-report')}>
          <FontAwesomeIcon icon={faClock} /> Z Report archives
          <FontAwesomeIcon icon={faArrowRight} className="shift-link-btn__arrow" />
        </button>
      </div>

      <div className={`shift-status-card ${current ? 'shift-status-card--open' : 'shift-status-card--closed'}`}>
        <FontAwesomeIcon icon={faClock} className="shift-status-card__icon" />
        <div className="shift-status-card__body">
          {loading ? (
            <p className="shift-status-card__title">Checking register…</p>
          ) : current ? (
            <>
              <p className="shift-status-card__title">
                <FontAwesomeIcon icon={faCheckCircle} /> Shift <strong>#{current.id}</strong> is open
              </p>
              <p className="shift-status-card__meta">
                Opened {current.openedAt ? new Date(current.openedAt).toLocaleString() : '—'}
                {current.openedBy && <> · {formatUser(current.openedBy)}</>}
              </p>
              <p className="shift-status-card__hint">Close this shift with Z Report in Sales Analysis when reconciling.</p>
            </>
          ) : (
            <>
              <p className="shift-status-card__title">
                <FontAwesomeIcon icon={faCircle} /> No open shift
              </p>
              <p className="shift-status-card__meta">Sales on POS are blocked until a shift is opened.</p>
              {canOpen && (
                <button
                  type="button"
                  className="shift-open-main-btn"
                  onClick={handleOpenShift}
                  disabled={opening}
                >
                  {opening ? 'Opening…' : 'Open shift (here)'}
                </button>
              )}
              {!canOpen && (
                <p className="shift-status-card__hint">Ask a cashier or manager to open a shift on POS.</p>
              )}
            </>
          )}
        </div>
      </div>

      <div className="table-container shift-history-table">
        <h2 className="shift-section-title">Recent shifts</h2>
        <table className="transaction-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Status</th>
              <th>Opened</th>
              <th>Opened by</th>
              <th>Closed</th>
              <th>Closed by</th>
              <th>Z report</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="7" className="loading-data">Loading…</td>
              </tr>
            ) : history.length === 0 ? (
              <tr>
                <td colSpan="7" className="no-data">No shifts recorded yet. After migration, new shifts appear here.</td>
              </tr>
            ) : (
              history.map((row, idx) => {
                const open = !row.closedAt
                return (
                  <tr key={row.id} className={open ? 'shift-row-open' : ''}>
                    <td>{row.id}</td>
                    <td>
                      <span className={`shift-pill ${open ? 'shift-pill--open' : 'shift-pill--closed'}`}>
                        {open ? 'Open' : 'Closed'}
                      </span>
                    </td>
                    <td className="date-cell">{row.openedAt ? new Date(row.openedAt).toLocaleString() : '—'}</td>
                    <td>{formatUser(row.openedBy)}</td>
                    <td className="date-cell">{row.closedAt ? new Date(row.closedAt).toLocaleString() : '—'}</td>
                    <td>{formatUser(row.closedBy)}</td>
                    <td>{row.zReportId != null ? `#${row.zReportId}` : '—'}</td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ShiftPage
