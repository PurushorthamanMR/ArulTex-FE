import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import '../styles/signInPage.css'

function SignInPage() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    
    // Check credentials
    if (email === 'admin@gmail.com' && password === '123') {
      localStorage.setItem('isAuthenticated', 'true')
      localStorage.setItem('userRole', 'admin')
      navigate('/dashboard')
    } else if (email === 'staff@gmail.com' && password === '123') {
      localStorage.setItem('isAuthenticated', 'true')
      localStorage.setItem('userRole', 'staff')
      navigate('/pos')
    } else {
      setError('Invalid email or password. Please try again.')
    }
  }

  return (
    <div className="signin-container">
      <div className="signin-content">
        {/* Sign In Form */}
        <div className="signin-form">
          <h1 className="signin-heading">Sign In</h1>
          <p className="signin-description">
            Access the Yarltech AruntexPOS panel using your email and password.
          </p>

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
                />
                <button
                  type="button"
                  className="password-icon-wrapper"
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    console.log('Password toggle clicked, current state:', showPassword)
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
            <button type="submit" className="signin-button">
              Sign In
            </button>
          </form>
        </div>

        {/* Copyright */}
        <div className="copyright">
          Copyright © 2026 Yarltech AruntexPOS. All rights reserved
        </div>
      </div>

      {/* Purple Accent Line */}
      <div className="accent-line"></div>
    </div>
  )
}

export default SignInPage
