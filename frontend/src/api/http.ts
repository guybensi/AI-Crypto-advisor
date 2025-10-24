/**
 * HTTP wrapper — תומך ב־?email= לרוב הקריאות (לפי ה-backend הקיים)
 */
import { getAuth } from '../utils/jwtStorage'

export const BASE =
  (import.meta.env.VITE_API_BASE_URL as string) || 'https://ai-crypto-backend.onrender.com'

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

async function request<T>(path: string, opts: RequestInit = {}, attachEmail = false): Promise<T> {
  const auth = getAuth?.()
  const headers: Record<string, string> = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    ...(auth?.token ? { Authorization: `Bearer ${auth.token}` } : {}),
    ...(opts.headers as Record<string, string> | undefined),
  }
  const url = BASE + (attachEmail ? withEmail(path) : path)

  const res = await fetch(url, { ...opts, headers })
  if (!res.ok) {
    let msg = ''
    try { msg = await res.text() } catch {}
    throw new Error(`HTTP ${res.status}: ${msg || res.statusText}`)
  }
  const text = await res.text().catch(() => '')
  return (text ? JSON.parse(text) : undefined) as T
}

/** תאימות לאיפה שקראת http(path, opts) בעבר */
export function http<T>(path: string, opts: RequestInit = {}): Promise<T> {
  return request<T>(path, opts, false)
}

export const httpGet = <T>(path: string, attachEmail = false) =>
  request<T>(path, { method: 'GET' }, attachEmail)

export const httpPost = <T>(path: string, body?: any, attachEmail = false) =>
  request<T>(path, { method: 'POST', body: body ? JSON.stringify(body) : undefined }, attachEmail)

export const httpPut = <T>(path: string, body?: any, attachEmail = false) =>
  request<T>(path, { method: 'PUT', body: body ? JSON.stringify(body) : undefined }, attachEmail)
