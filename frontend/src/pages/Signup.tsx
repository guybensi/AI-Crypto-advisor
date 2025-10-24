// frontend/src/pages/SignupPage.tsx   ← שנה לשם הקובץ אצלך אם צריך
import Header from './_Header'
import { useState } from 'react'
import { signup } from '../api/authApi'
import { useNavigate, Link } from 'react-router-dom'

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/
const passwordHint = 'Password must be at least 8 characters, include upper & lower case letters, a number and a symbol. Example: Aabcde12!'

export default function Signup() {
  const nav = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setErr(null)
    if (!passwordRegex.test(password)) {
      setErr(passwordHint)
      return
    }
    setLoading(true)
    try {
      await signup(name, email, password)
      nav('/onboarding/1')
    } catch (e: any) {
      setErr(e.message || 'Signup failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container">
      <Header title="Create your account" subtitle="Let’s personalize your experience" />
      <div className="auth-wrap card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ marginTop: 0 }}>Create account</h2>
          <Link to="/login" className="btn btn-ghost">← Back to Home</Link>
        </div>

        {err && <div style={{ color: 'salmon', marginBottom: 10 }}>{err}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-row"><label>Name</label>
            <input className="input" value={name} onChange={e=>setName(e.target.value)} required /></div>
          <div className="form-row"><label>Email</label>
            <input className="input" type="email" value={email} onChange={e=>setEmail(e.target.value)} required /></div>
          <div className="form-row"><label>Password</label>
            <input className="input" type="password" value={password} onChange={e=>setPassword(e.target.value)} required />
            <div className="helper">{passwordHint}</div>
          </div>

          <div className="actions">
            <Link className="btn btn-ghost" to="/login">Back</Link>
            <button className="btn btn-primary" type="submit" disabled={loading}>
              {loading ? 'Creating…' : 'Continue →'}
            </button>
          </div>

          <div className="helper" style={{ marginTop: 10 }}>
            Already have an account? <Link className="link" to="/login">Sign in</Link>.
          </div>
        </form>
      </div>
    </div>
  )
}
