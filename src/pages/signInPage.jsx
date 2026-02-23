import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { login as apiLogin, getByEmailAddress } from '../api/userApi'
import '../styles/signInPage.css'

function SignInPage() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  /* Lock body scroll so sign-in page never scrolls */
  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const { accessToken } = await apiLogin({
        username: email.trim(),
        password
      })

      localStorage.setItem('accessToken', accessToken)
      localStorage.setItem('isAuthenticated', 'true')

      const users = await getByEmailAddress(email.trim())
      const user = Array.isArray(users) && users.length > 0 ? users[0] : null
      const role = user?.userRoleDto?.userRole || 'USER'
      localStorage.setItem('userRole', role)
      localStorage.setItem('userFirstName', user?.firstName || 'User')
      localStorage.setItem('userLastName', user?.lastName || '')

      const roleUpper = (role || '').toUpperCase()
      // Dashboard for Admin and Manager only; POS for Staff and others
      if (roleUpper === 'ADMIN' || roleUpper === 'MANAGER') {
        navigate('/dashboard')
      } else {
        navigate('/pos')
      }
    } catch (err) {
      setError(err.message || 'Invalid email or password. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="signin-container">
      <div className="signin-card">
        <div className="signin-content">
          {/* Logo */}
          <div className="signin-logo-wrap">
            <img src="/logo.jpg" alt="Aruntex & Fancy Palace" className="signin-logo-img" />
          </div>
          {/* Sign In Form */}
          <div className="signin-form">
            <h1 className="signin-heading">Sign In</h1>

            <form onSubmit={handleSubmit}>
            {/* Email Field */}
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <div className="input-wrapper">
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field"
                  placeholder="Enter your email"
                  autoComplete="email"
                  required
                />
                <svg className="input-icon email-icon" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2.25 4.5L9 9.75L15.75 4.5M2.25 4.5H15.75M2.25 4.5V13.5C2.25 14.325 2.925 15 3.75 15H14.25C15.075 15 15.75 14.325 15.75 13.5V4.5" stroke="#CED4DA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>

            {/* Password Field */}
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <div className="input-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field"
                  placeholder="Enter your password"
                  autoComplete="current-password"
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
                  onMouseDown={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                  }}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  style={{ cursor: 'pointer' }}
                >
                  <FontAwesomeIcon 
                    icon={showPassword ? faEye : faEyeSlash}
                    className="input-icon password-icon"
                  />
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="error-message">
                {error}
              </div>
            )}

            {/* Forgot Password Link */}
            <Link to="/forgot-password" className="forgot-password">
              Forgot Password?
            </Link>

            {/* Sign In Button */}
            <button type="submit" className="signin-button" disabled={loading}>
              {loading ? (
                <>
                  <span className="signin-button-spinner" aria-hidden="true" />
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>
        </div>
      </div>
      </div>

      {/* Accent line */}
      <div className="signin-accent-line" aria-hidden="true" />
    </div>
  )
}

export default SignInPage
