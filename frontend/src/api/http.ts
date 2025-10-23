/**
 * Minimal HTTP client wrapper using fetch — backend expects some routes with ?email=
 */
import { getAuth } from '../utils/jwtStorage'

export const BASE =
  (import.meta.env.VITE_API_BASE_URL as string) || 'http://localhost:8080'

const EMAIL_KEY = 'email'
export function currentEmail() {
  return localStorage.getItem(EMAIL_KEY) || ''
}

function withEmail(path: string) {
  const email = currentEmail()
  if (!email) return path
  const sep = path.includes('?') ? '&' : '?'
  return `${path}${sep}email=${encodeURIComponent(email)}`
}

async function request<T>(
  path: string,
  opts: RequestInit = {},
  attachEmail = false
): Promise<T> {
  const auth = getAuth()
  const headers: Record<string, string> = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    ...(auth?.token ? { Authorization: `Bearer ${auth.token}` } : {}),
    ...(opts.headers as Record<string, string> | undefined),
  }

  const url = BASE + (attachEmail ? withEmail(path) : path)
  const res = await fetch(url, { ...opts, headers })

  if (!res.ok) {
    let msg: string
    try {
      msg = await res.text()
    } catch {
      msg = res.statusText
    }
    throw new Error(`HTTP ${res.status}: ${msg}`)
  }

  // בטיפול בגוף ריק/204
  const text = await res.text().catch(() => '')
  return (text ? JSON.parse(text) : undefined) as T
}

/** Convenience wrappers */
export const httpGet = <T>(path: string, attachEmail = false) =>
  request<T>(path, { method: 'GET' }, attachEmail)

export const http
