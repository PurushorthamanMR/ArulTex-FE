import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { resetPassword } from '../api/authApi'
import '../styles/forgotPasswordPage.css'

function ResetPasswordPage() {
  const navigate = useNavigate()
  const [token, setToken] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await resetPassword({ token: token.trim(), newPassword })
      setSuccess(true)
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-content">
        <div className="forgot-password-form">
          <h1 className="forgot-password-heading">Reset password</h1>
          <p className="forgot-password-description">
            Enter the code from your email and your new password.
          </p>

          {success ? (
            <div className="forgot-password-success">
              <p className="success-message">Your password has been reset successfully.</p>
              <Link to="/signin" className="continue-button" style={{ display: 'block', textAlign: 'center', textDecoration: 'none' }}>
                Sign in
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <label htmlFor="reset-token">Reset code</label>
                <div className="input-wrapper">
                  <input
                    type="text"
                    id="reset-token"
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                    className="input-field"
                    placeholder="Paste the code from your email"
                    required
                  />
                </div>
              </div>

              <div className="input-group">
                <label htmlFor="reset-password">New password</label>
                <div className="input-wrapper">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="reset-password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="input-field"
                    required
                  />
                  <button
                    type="button"
                    className="password-icon-wrapper"
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      setShowPassword(!showPassword)
                    }}
                    onMouseDown={(e) => e.preventDefault()}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} className="input-icon" style={{ color: '#CED4DA' }} />
                  </button>
                </div>
              </div>

              {error && <div className="error-message">{error}</div>}

              <button type="submit" className="continue-button" disabled={loading}>
                {loading ? 'Resetting...' : 'Reset password'}
              </button>
            </form>
          )}

          <a
            href="#"
            className="return-to-login"
            onClick={(e) => {
              e.preventDefault()
              navigate('/signin')
            }}
          >
            Return to login
          </a>
        </div>

        <div className="copyright">
          Copyright © 2026 yarltech AruntexPOS. All rights reserved
        </div>
      </div>

      <div className="accent-line"></div>
    </div>
  )
}

export default ResetPasswordPage
