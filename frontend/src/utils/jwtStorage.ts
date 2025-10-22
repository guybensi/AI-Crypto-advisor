/**
 * Very small auth storage helper.
 * Stores token + email for demos. Replace with HttpOnly cookies in production.
 */
type AuthPayload = { token: string, email: string, name: string }
const KEY = 'auth'

export function setAuth(payload: AuthPayload | null) {
  if (!payload) localStorage.removeItem(KEY)
  else localStorage.setItem(KEY, JSON.stringify(payload))
}

export function getAuth(): AuthPayload | null {
  const s = localStorage.getItem(KEY)
  return s ? JSON.parse(s) : null
}

export function getEmail(): string | null {
  return getAuth()?.email ?? null
}
