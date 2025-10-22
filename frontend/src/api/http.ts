/**
 * Minimal HTTP client wrapper using fetch.
 * Adds JSON headers and handles errors in a consistent way.
 */
import { getAuth } from '../utils/jwtStorage'

const BASE = 'http://localhost:8080'

export async function http<T>(path: string, opts: RequestInit = {}): Promise<T> {
  const auth = getAuth()
  const headers = {
    'Content-Type': 'application/json',
    ...(auth?.token ? { 'Authorization': `Bearer ${auth.token}` } : {}),
    ...(opts.headers || {}),
  }
  const res = await fetch(BASE + path, { ...opts, headers })
  if (!res.ok) {
    const msg = await res.text()
    throw new Error(`HTTP ${res.status}: ${msg}`)
  }
  return res.status === 204 ? (undefined as unknown as T) : await res.json()
}
