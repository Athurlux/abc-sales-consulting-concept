import { createBrowserRouter } from 'react-router'
import { Layout } from './components/Layout'
import { RouteError } from './pages/RouteError'

// Each page is its own chunk; GSAP is pulled in only by the pages that animate.
const page = (load: () => Promise<{ default: React.ComponentType }>) => async () => ({ Component: (await load()).default })

export const router = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <RouteError />,
    hydrateFallbackElement: <div className="route-loading" aria-busy="true" />,
    children: [
      { index: true, lazy: page(() => import('./pages/Home')) },
      { path: 'programmes', lazy: page(() => import('./pages/Programmes')) },
      { path: 'programmes/:slug', lazy: page(() => import('./pages/ProgrammeDetail')) },
      { path: 'register', lazy: page(() => import('./pages/Register')) },
      { path: 'register/confirmation/:reference', lazy: page(() => import('./pages/RegisterConfirmation')) },
      { path: 'sales-ladder', lazy: page(() => import('./pages/SalesLadder')) },
      { path: 'organisations', lazy: page(() => import('./pages/Organisations')) },
      { path: 'organisations/brief', lazy: page(() => import('./pages/CorporateBrief')) },
      { path: 'organisations/audit', lazy: page(() => import('./pages/AuditEnquiry')) },
      { path: 'launch-lab', lazy: page(() => import('./pages/LaunchLab')) },
      { path: 'careers', lazy: page(() => import('./pages/Careers')) },
      { path: 'careers/:slug', lazy: page(() => import('./pages/RoleDetail')) },
      { path: 'careers/:slug/apply', lazy: page(() => import('./pages/Apply')) },
      { path: 'insights', lazy: page(() => import('./pages/Insights')) },
      { path: 'insights/:slug', lazy: page(() => import('./pages/Article')) },
      { path: 'about', lazy: page(() => import('./pages/About')) },
      { path: 'contact', lazy: page(() => import('./pages/Contact')) },
      { path: 'discovery-call', lazy: page(() => import('./pages/DiscoveryCall')) },
      { path: '*', lazy: page(() => import('./pages/NotFound')) },
    ],
  },
])
