import { useState } from 'react'
import { signup } from '../api/authApi'
import { setAuth } from '../utils/jwtStorage'
import { useNavigate } from 'react-router-dom'

/** Signup page - minimal form with inline validation and comments. */
export default function SignupPage() {
  const nav = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    try {
      const res = await signup(name, email, password)
      setAuth({ token: res.token, email: res.email, name: res.name })
      nav('/onboarding')
    } catch (err: any) {
      setError(err.message)
    }
  }

  return (
    <form onSubmit={submit} style={{ display: 'grid', gap: 8, maxWidth: 420 }}>
      <h2>Signup</h2>
      <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} required />
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
      <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <button type="submit">Create Account</button>
    </form>
  )
}
