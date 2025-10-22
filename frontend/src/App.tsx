import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import OnboardingPage from './pages/OnboardingPage'
import DashboardPage from './pages/DashboardPage'
import { getEmail, setAuth } from './utils/jwtStorage'

/**
 * Root Application component.
 * Provides simple navigation and routes.
 */
export default function App() {
  const navigate = useNavigate()
  const email = getEmail()

  return (
    <div style={{ maxWidth: 960, margin: '0 auto', padding: 16 }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>AI Crypto Advisor</h1>
        <nav>
          <Link to="/" style={{ marginRight: 12 }}>Dashboard</Link>
          {!email && <Link to="/login" style={{ marginRight: 12 }}>Login</Link>}
          {!email && <Link to="/signup">Signup</Link>}
          {email && <button onClick={() => { setAuth(null); navigate('/login'); }}>Logout</button>}
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/onboarding" element={<OnboardingPage />} />
      </Routes>
    </div>
  )
}
