import { http } from './http'
import { getEmail } from '../utils/jwtStorage'

export async function saveOnboarding(cryptoAssets: string, investorType: string, contentTypes: string) {
  const email = getEmail()
  if (!email) throw new Error('Not logged in')
  return http<void>(`/onboarding?email=${encodeURIComponent(email)}`, {
    method: 'POST',
    body: JSON.stringify({ cryptoAssets, investorType, contentTypes })
  })
}
