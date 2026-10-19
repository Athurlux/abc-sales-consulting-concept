import { useCallback, useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router'
import { useFocusTrap, useScrollLock } from '../lib/useFocusTrap'
import { Icon } from './Icon'
import { Logo } from './Logo'

export const NAV = [
  { to: '/programmes', label: 'Programmes' },
  { to: '/sales-ladder', label: 'Sales Ladder' },
  { to: '/organisations', label: 'For organisations' },
  { to: '/launch-lab', label: 'Launch Lab' },
  { to: '/careers', label: 'Careers' },
  { to: '/insights', label: 'Insights' },
]

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const headerRef = useRef<HTMLElement>(null)
  const { pathname } = useLocation()
  const closeMenu = useCallback(() => setMenuOpen(false), [])

  // The whole header is the trap, so the close button stays reachable.
  useFocusTrap(headerRef, menuOpen, closeMenu)
  useScrollLock(menuOpen)
  useEffect(() => { setMenuOpen(false) }, [pathname])

  return (
    <header ref={headerRef} className={`site-header ${menuOpen ? 'is-menu' : ''}`}>
      <p className="concept-bar">
        <span>Independent website concept. Forms are demonstrations and send nothing.</span>{' '}
        <Link to="/about#concept">About this concept</Link>
      </p>
      <div className="container site-header__inner">
        <Link to="/" className="site-header__logo" aria-label="ABC Sales Consulting concept, home"><Logo /></Link>

        <nav className="site-nav" aria-label="Main">
          <ul>
            {NAV.map(link => <li key={link.to}><NavLink to={link.to}>{link.label}</NavLink></li>)}
          </ul>
        </nav>

        <div className="site-header__actions">
          <Link to="/discovery-call" className="button button--primary button--small site-header__cta">Book a discovery call</Link>
          <button
            type="button"
            className="menu-button"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen(open => !open)}
          >
            <Icon name={menuOpen ? 'close' : 'menu'} size={22} />
          </button>
        </div>
      </div>

      <div id="mobile-menu" className="mobile-menu" hidden={!menuOpen}>
        <nav aria-label="Mobile">
          <ul className="mobile-menu__primary">
            <li><NavLink to="/" end data-autofocus>Home</NavLink></li>
            {NAV.map(link => <li key={link.to}><NavLink to={link.to}>{link.label}</NavLink></li>)}
          </ul>
          <ul className="mobile-menu__secondary">
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/organisations/audit">Sales audit enquiry</Link></li>
          </ul>
        </nav>
        <Link to="/discovery-call" className="button button--primary button--block">Book a discovery call</Link>
      </div>
    </header>
  )
}
