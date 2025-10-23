export type Section = 'MARKET_NEWS' | 'COIN_PRICES' | 'AI_INSIGHT' | 'MEME'

export interface MarketNewsItem { title: string; url: string; source: string; publishedAt?: string }
export interface CoinPriceItem { symbol: string; priceUsd: number; change24hPct: number }

export interface DashboardDTO {
  marketNews: MarketNewsItem[]
  coinPrices: CoinPriceItem[]
  aiInsight: string
  memeUrl?: string | null
}

// בשביל ה־backend נשלח מחרוזות comma-separated, אבל ננהל כ־arrays בפרונט:
export interface PreferencesVM {
  assets: string[]                 // ["BTC","ETH",...]
  investorType: 'HODLER' | 'DAY_TRADER' | 'NFT_COLLECTOR'
  contentTypes: Array<'MARKET_NEWS' | 'CHARTS' | 'SOCIAL' | 'FUN'>
}

export interface AuthResponse { token: string; name: string; email: string }
