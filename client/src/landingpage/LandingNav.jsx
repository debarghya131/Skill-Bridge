import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function LandingNav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Features', href: '#features' },
    { label: 'How it Works', href: '#how-it-works' },
  ]

  return (
    <nav style={{
      position: 'fixed',
      top: 0, left: 0, right: 0,
      zIndex: 1000,
      background: scrolled ? 'rgba(255,255,255,0.95)' : 'transparent',
      backdropFilter: scrolled ? 'blur(12px)' : 'none',
      borderBottom: scrolled ? '1px solid var(--border)' : 'none',
      transition: 'all 0.3s ease',
      padding: '0',
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '68px',
      }}>
        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: 36, height: 36,
            background: 'linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)',
            borderRadius: '10px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'white', fontWeight: 800, fontSize: 16,
          }}>S</div>
          <span style={{ fontSize: 20, fontWeight: 800, color: 'var(--dark)', letterSpacing: '-0.03em' }}>
            Skill<span style={{ color: 'var(--primary)' }}>Bridge</span>
          </span>
        </Link>

        {/* Desktop nav links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }} className="desktop-nav">
          {navLinks.map(link => (
            <a key={link.label} href={link.href} style={{
              padding: '8px 16px',
              borderRadius: 'var(--radius-sm)',
              fontSize: 15,
              fontWeight: 500,
              color: scrolled ? 'var(--text)' : 'var(--dark)',
              transition: 'all var(--transition)',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'var(--primary-light)'; e.currentTarget.style.color = 'var(--primary)' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = scrolled ? 'var(--text)' : 'var(--dark)' }}>
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button className="btn-secondary" style={{ padding: '9px 20px', fontSize: 14 }}
            onClick={() => navigate('/student')}>
            Get Started
          </button>
          <button className="btn-primary" style={{ padding: '9px 20px', fontSize: 14 }}
            onClick={() => navigate('/company')}>
            For Company
          </button>
        </div>
      </div>
    </nav>
  )
}
