import { httpSend, currentEmail } from './http'
import type { Section } from './types'

export function sendFeedback(section: Section, contentId: string, value: 1|-1) {
  const email = encodeURIComponent(currentEmail())
  return httpSend(`/feedback?email=${email}`, 'POST', { section, contentId, vote: value })
}
