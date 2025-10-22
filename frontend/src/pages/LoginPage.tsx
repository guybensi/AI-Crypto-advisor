import { useState } from 'react'
import { login } from '../api/authApi'
import { setAuth } from '../utils/jwtStorage'
import { useNavigate } from 'react-router-dom'

/** Login page - stores JWT in local storage (demo-only). */
export default function LoginPage() {
  const nav = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    try {
      const res = await login(email, password)
      setAuth({ token: res.token, email: res.email, name: res.name })
      nav('/')
    } catch (err: any) {
      setError(err.message)
    }
  }

  return (
    <form onSubmit={submit} style={{ display: 'grid', gap: 8, maxWidth: 420 }}>
      <h2>Login</h2>
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
      <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <button type="submit">Login</button>
    </form>
  )
}
