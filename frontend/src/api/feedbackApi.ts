// frontend/src/api/feedbackApi.ts
import { httpPost } from './http'

export type Section = 'MARKET_NEWS' | 'COIN_PRICES' | 'AI_INSIGHT' | 'MEME'

export async function sendFeedback(section: Section, contentId: string, vote: 1 | -1) {
  try {
    return await httpPost<{ ok: boolean }>('/feedback', { section, contentId, vote }, true) // true => מוסיף ?email=
  } catch (e) {
    console.warn('sendFeedback failed', e)
    return { ok: false } as any
  }
}
