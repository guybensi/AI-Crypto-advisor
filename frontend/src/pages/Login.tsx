import Header from './_Header'
import { useState } from 'react'
import { login } from '../api/authApi'
import { useNavigate, Link } from 'react-router-dom'

export default function Login() {
  const nav = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setErr(null); setLoading(true)
    try { await login(email, password); nav('/dashboard') }
    catch (e:any) { setErr(e.message || 'Login failed') }
    finally { setLoading(false) }
  }

  return (
    <div className="container">
      <Header />
      <div className="auth-wrap card">
        <h2 style={{ marginTop: 0 }}>Sign in</h2>
        {err && <div style={{ color: 'salmon', marginBottom: 10 }}>{err}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <label>Email</label>
            <input className="input" type="email" value={email}
                   onChange={e => setEmail(e.target.value)} required />
          </div>
          <div className="form-row">
            <label>Password</label>
            <input className="input" type="password" value={password}
                   onChange={e => setPassword(e.target.value)} required />
            <div className="helper">
              Don’t have an account? <Link className="link" to="/signup">Create one</Link>.
            </div>
          </div>
          <div className="actions">
            <span />
            <button className="btn btn-primary" type="submit" disabled={loading}>
              {loading ? 'Signing in…' : 'Continue →'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
