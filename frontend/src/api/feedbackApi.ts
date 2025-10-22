import { http } from './http'
import { getEmail } from '../utils/jwtStorage'

export async function sendFeedback(section: string, contentId: string, vote: number) {
  const email = getEmail()
  if (!email) throw new Error('Not logged in')
  return http<void>(`/feedback?email=${encodeURIComponent(email)}`, {
    method: 'POST',
    body: JSON.stringify({ section, contentId, vote })
  })
}
