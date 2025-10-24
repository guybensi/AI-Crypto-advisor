// frontend/src/api/dashboardApi.ts
export interface MarketNewsItem { title: string; url: string; source: string }
export interface CoinPriceItem { symbol: string; priceUsd: number; change24hPct: number }
export interface DashboardDTO {
  marketNews: MarketNewsItem[]
  coinPrices: CoinPriceItem[]
  aiInsight: string
  memeUrl?: string | null
}

const CG_IDS = ['bitcoin', 'ethereum']

async function fetchJSON<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, init)
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`)
  return res.json() as Promise<T>
}

// --- CoinGecko (ישר מהדפדפן – אין CORS בעייתי) ---
async function getCoinPrices(): Promise<CoinPriceItem[]> {
  const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${CG_IDS.join(',')}`
  const data = await fetchJSON<any[]>(url)
  return data.map(d => ({
    symbol: (d.symbol || '').toUpperCase(),
    priceUsd: Number(d.current_price ?? 0),
    change24hPct: Number(d.price_change_percentage_24h ?? 0),
  }))
}

// --- חדשות דרך הבקאנד ---
async function getMarketNews(): Promise<MarketNewsItem[]> {
  const res = await fetch('http://localhost:8080/api/news')
  if (!res.ok) throw new Error('News fetch failed')
  return await res.json()
}

// --- AI insight דרך הבקאנד ---
async function getAiInsight(): Promise<string> {
  const res = await fetch('http://localhost:8080/api/ai-insight')
  if (!res.ok) return 'AI service unavailable.'
  const data = await res.json()
  return data.text || 'AI service unavailable.'
}

// --- Meme ישירות (תקין בדפדפן) ---
async function getMemeUrl(): Promise<string | null> {
  try {
    const data = await fetchJSON<{ url?: string }>('https://meme-api.com/gimme/cryptocurrency')
    return data.url || null
  } catch {
    return null
  }
}

export async function getDailyDashboard(): Promise<DashboardDTO> {
  const [prices, news, insight, meme] = await Promise.all([
    getCoinPrices().catch(() => []),
    getMarketNews().catch(() => []),
    getAiInsight().catch(() => 'AI service unavailable.'),
    getMemeUrl().catch(() => null),
  ])
  return { marketNews: news, coinPrices: prices, aiInsight: insight, memeUrl: meme }
}
