import { Outlet, ScrollRestoration } from 'react-router'
import { Header } from './Header'
import { Footer } from './Footer'
import { Announcer } from './Announcer'
import { useRouteFocus } from '../lib/useRouteFocus'

export function Layout() {
  useRouteFocus()
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <Header />
      <main id="main" tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
      <Announcer />
      {/* Form steps and filters change only the search string, so they keep the page's
          scroll entry. First-loaded pages share the key "default", so key them by path. */}
      <ScrollRestoration getKey={loc => (loc.key === 'default' || loc.pathname === '/careers' || loc.search.includes('step=') ? loc.pathname : loc.key)} />
    </>
  )
}
