import { http } from './http'
import { getEmail } from '../utils/jwtStorage'

export type NewsItem = { title: string, url: string, source: string, publishedAt: string }
export type PriceItem = { symbol: string, priceUsd: number, change24hPct: number }
export type Dashboard = { marketNews: NewsItem[], coinPrices: PriceItem[], aiInsight: string, memeUrl: string }

export async function getDailyDashboard() {
  const email = getEmail()
  if (!email) throw new Error('Not logged in')
  return http<Dashboard>(`/dashboard/daily?email=${encodeURIComponent(email)}`)
}
