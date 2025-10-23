import { httpSend } from './http'
import type { AuthResponse } from './types'

export async function login(email: string, password: string) {
  const res = await httpSend<AuthResponse>('/auth/login', 'POST', { email, password })
  localStorage.setItem('token', res.token)
  localStorage.setItem('email', res.email)      // 👈 נשתמש בזה לכל שאר הקריאות
  localStorage.setItem('name',  res.name)
  return res
}

export async function signup(name: string, email: string, password: string) {
  const res = await httpSend<AuthResponse>('/auth/signup', 'POST', { name, email, password })
  localStorage.setItem('token', res.token)
  localStorage.setItem('email', res.email)
  localStorage.setItem('name',  res.name)
  return res
}

export function logout() {
  localStorage.removeItem('token'); localStorage.removeItem('email'); localStorage.removeItem('name')
}
