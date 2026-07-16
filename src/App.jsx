import { useState, useEffect, useRef } from 'react'
import styles from './App.module.css'

function GlassCard({ children, className = '' }) {
  return (
    <div className={`${styles.glassCard} ${className}`}>
      {children}
    </div>
  )
}

function InputField({
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  hasToggle,
  showPassword,
  onToggle,
  icon
}) {
  return (
    <div className={styles.inputWrapper}>
      {icon && <span className={styles.inputIcon}>{icon}</span>}
      <input
        type={hasToggle ? (showPassword ? 'text' : 'password') : type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`${styles.input} ${error ? styles.inputError : ''} ${icon ? styles.inputWithIcon : ''}`}
      />
      {hasToggle && (
        <button
          type="button"
          onClick={onToggle}
          className={styles.togglePassword}
          aria-label={showPassword ? 'Hide password' : 'Show password'}
        >
          {showPassword ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" strokeLinecap="round" strokeLinejoin="round"/>
              <line x1="1" y1="1" x2="23" y2="23" strokeLinecap="round"/>
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="12" cy="12" r="3"/>
            </svg>
          )}
        </button>
      )}
      {error && <span className={styles.errorText}>{error}</span>}
    </div>
  )
}

function SocialButton({ children, label }) {
  return (
    <button type="button" className={styles.socialButton} aria-label={label}>
      {children}
    </button>
  )
}

export default function App() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({ email: '', password: '' })
  const [view, setView] = useState('login')
  const [resetEmail, setResetEmail] = useState('')
  const [resetError, setResetError] = useState('')
  const [resetSent, setResetSent] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const loginRef = useRef(null)
  const forgotRef = useRef(null)

  const handleSignIn = (e) => {
    e.preventDefault()
    const newErrors = { email: '', password: '' }

    if (!email.trim()) {
      newErrors.email = 'Oops — we need your email to continue'
    }
    if (!password.trim()) {
      newErrors.password = "Don't forget your password!"
    }

    setErrors(newErrors)

    if (!newErrors.email && !newErrors.password) {
      // Handle successful login
      console.log('Login submitted')
    }
  }

  const handleForgotPassword = () => {
    setIsTransitioning(true)
    setTimeout(() => {
      setView('forgot')
      setIsTransitioning(false)
    }, 150)
  }

  const handleBackToLogin = () => {
    setIsTransitioning(true)
    setTimeout(() => {
      setView('login')
      setResetSent(false)
      setResetEmail('')
      setResetError('')
      setIsTransitioning(false)
    }, 150)
  }

  const handleSendResetLink = (e) => {
    e.preventDefault()
    if (!resetEmail.trim()) {
      setResetError('Enter your email to reset your password')
      return
    }
    setResetError('')
    setResetSent(true)
  }

  return (
    <div className={styles.page}>
      {/* Left Side - Background with floating cards */}
      <div className={styles.leftSide}>
        <div className={styles.leftBackground}>
          <div className={styles.gradientBlob} />
        </div>

        <div className={styles.floatingCards}>
          <GlassCard className={styles.card1}>
            <img
              src="https://picsum.photos/seed/dashboard1/400/300"
              alt="Dashboard preview"
              className={styles.cardImage}
            />
          </GlassCard>

          <GlassCard className={styles.card2}>
            <img
              src="https://picsum.photos/seed/analytics2/350/250"
              alt="Analytics preview"
              className={styles.cardImage}
            />
          </GlassCard>

          <GlassCard className={styles.card3}>
            <img
              src="https://picsum.photos/seed/project3/300/200"
              alt="Project preview"
              className={styles.cardImage}
            />
          </GlassCard>
        </div>

        <div className={styles.leftOverlay}>
          <p className={styles.leftTagline}>
            Create without limits.<br />
            <span className={styles.leftTaglineAccent}>Collaborate in real-time.</span>
          </p>
        </div>
      </div>

      {/* Right Side - Login / Forgot Password panel */}
      <div className={styles.rightSide}>
        {/* Login Form */}
        <div
          ref={loginRef}
          className={`${styles.formPanel} ${view === 'login' ? styles.formPanelActive : ''} ${isTransitioning ? styles.formPanelTransitioning : ''}`}
        >
          <div className={styles.formContent}>
            {/* Logo */}
            <div className={styles.logo}>
              <span className={styles.logoText}>Lumina</span>
            </div>

            {/* Heading */}
            <div className={styles.header}>
              <h1 className={styles.heading}>Welcome back.</h1>
              <p className={styles.subtext}>Sign in to your creative studio</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSignIn} className={styles.form}>
              <div className={styles.fieldGroup}>
                <label className={styles.label}>Email</label>
                <InputField
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    if (errors.email) setErrors({ ...errors, email: '' })
                  }}
                  error={errors.email}
                  icon={
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <rect x="2" y="4" width="20" height="16" rx="3"/>
                      <path d="m22 7-10 6L2 7"/>
                    </svg>
                  }
                />
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.label}>Password</label>
                <div className={styles.passwordWrapper}>
                  <InputField
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value)
                      if (errors.password) setErrors({ ...errors, password: '' })
                    }}
                    error={errors.password}
                    hasToggle
                    showPassword={showPassword}
                    onToggle={() => setShowPassword(!showPassword)}
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={handleForgotPassword}
                className={styles.forgotLink}
              >
                Forgot password?
              </button>

              <button type="submit" className={styles.primaryButton}>
                Sign In
              </button>
            </form>

            {/* Divider */}
            <div className={styles.divider}>
              <div className={styles.dividerLine} />
              <span className={styles.dividerText}>or continue with</span>
              <div className={styles.dividerLine} />
            </div>

            {/* Social Buttons */}
            <div className={styles.socialButtons}>
              <SocialButton label="Continue with Google">
                <span className={styles.socialIcon}>G</span>
              </SocialButton>
              <SocialButton label="Continue with Apple">
                <span className={styles.socialIcon}>⌘</span>
              </SocialButton>
              <SocialButton label="Continue with Email">
                <span className={styles.socialIcon}>@</span>
              </SocialButton>
            </div>

            {/* Sign up link */}
            <p className={styles.bottomLink}>
              <span>New here? </span>
              <a href="#" className={styles.link}>
                Create an account
              </a>
              <span className={styles.arrow}>→</span>
            </p>
          </div>
        </div>

        {/* Forgot Password Form */}
        <div
          ref={forgotRef}
          className={`${styles.formPanel} ${view === 'forgot' ? styles.formPanelActive : ''} ${isTransitioning ? styles.formPanelTransitioning : ''}`}
        >
          <div className={styles.formContent}>
            {/* Back button */}
            <button onClick={handleBackToLogin} className={styles.backButton}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Back</span>
            </button>

            {/* Heading */}
            <div className={styles.header}>
              <h1 className={styles.heading}>Reset your password</h1>
              <p className={styles.subtext}>Enter your email and we'll send you a reset link</p>
            </div>

            {/* Reset Form */}
            {!resetSent ? (
              <form onSubmit={handleSendResetLink} className={styles.form}>
                <div className={styles.fieldGroup}>
                  <label className={styles.label}>Email</label>
                  <InputField
                    type="email"
                    placeholder="you@example.com"
                    value={resetEmail}
                    onChange={(e) => {
                      setResetEmail(e.target.value)
                      if (resetError) setResetError('')
                    }}
                    error={resetError}
                  />
                </div>

                <button type="submit" className={styles.primaryButton}>
                  Send reset link
                </button>
              </form>
            ) : (
              <div className={styles.successState}>
                <div className={styles.successIcon}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="11" stroke="currentColor" strokeWidth="2" fill="rgba(10,138,10,0.1)"/>
                    <path d="M8 12l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h2 className={styles.successHeading}>Check your inbox!</h2>
                <p className={styles.successText}>
                  We sent a password reset link to<br />
                  <strong>{resetEmail}</strong>
                </p>
                <button onClick={handleBackToLogin} className={styles.successButton}>
                  Back to sign in
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
