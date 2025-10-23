import { httpPost } from './http'
import type { Section } from './types'

export const sendFeedback = (section: Section, contentId: string, vote: 1|-1) =>
  httpPost<{ ok: boolean }>('/feedback', { section, contentId, vote }, true) // ?email=
