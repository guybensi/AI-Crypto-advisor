import { http } from './http'

export async function signup(name: string, email: string, password: string) {
  return http<{ token: string, name: string, email: string }>('/auth/signup', {
    method: 'POST',
    body: JSON.stringify({ name, email, password })
  })
}
export async function login(email: string, password: string) {
  return http<{ token: string, name: string, email: string }>('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password })
  })
}
