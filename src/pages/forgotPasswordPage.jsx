import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { forgotPassword } from '../api/authApi'
import '../styles/forgotPasswordPage.css'

function ForgotPasswordPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await forgotPassword({ emailAddress: email.trim() })
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
        {/* Forgot Password Form */}
        <div className="forgot-password-form">
          <h1 className="forgot-password-heading">Forgot password?</h1>
          <p className="forgot-password-description">
            If you forgot your password, we will email you the code to reset your password.
          </p>

          {success ? (
            <div className="forgot-password-success">
              <p className="success-message">Check your email for the reset code.</p>
              <Link to="/reset-password" className="continue-button" style={{ display: 'block', textAlign: 'center', textDecoration: 'none' }}>
                Go to Reset Password
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {/* Email Field */}
              <div className="input-group">
                <label htmlFor="forgot-email">Email</label>
                <div className="input-wrapper">
                  <input
                    type="email"
                    id="forgot-email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input-field"
                    required
                  />
                  <svg className="input-icon email-icon" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.25 4.5L9 9.75L15.75 4.5M2.25 4.5H15.75M2.25 4.5V13.5C2.25 14.325 2.925 15 3.75 15H14.25C15.075 15 15.75 14.325 15.75 13.5V4.5" stroke="#CED4DA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>

              {error && <div className="error-message">{error}</div>}

              {/* Continue Button */}
              <button type="submit" className="continue-button" disabled={loading}>
                {loading ? 'Sending...' : 'Continue'}
              </button>
            </form>
          )}

          {/* Return to Login Link */}
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

        {/* Copyright */}
        <div className="copyright">
          Copyright © 2026 yarltech AruntexPOS. All rights reserved
        </div>
      </div>

      {/* Purple Accent Line */}
      <div className="accent-line"></div>
    </div>
  )
}

export default ForgotPasswordPage
