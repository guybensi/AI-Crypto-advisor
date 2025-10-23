import { useEffect, useState } from 'react'
import { getDailyDashboard } from '../api/dashboardApi'
import { sendFeedback } from '../api/feedbackApi'
import type { DashboardDTO } from '../api/types'

export default function Dashboard() {
  const [data, setData] = useState<DashboardDTO | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    (async () => {
      try { setData(await getDailyDashboard()) }
      catch (e:any) { setError(e.message) }
    })()
  }, [])

  if (error) return <div style={{ color: 'salmon' }}>{error}</div>
  if (!data) return <div className="container">Loading dashboard...</div>

  return (
    <div className="container">
      <div className="header-row">
        <div>
          <h2 style={{ margin: 0, fontSize: 28, fontWeight: 800 }}>Welcome back!</h2>
          <div style={{ color: 'var(--muted)', marginTop: 4 }}>Your personalized crypto insights for today</div>
        </div>
        <button className="refresh" onClick={() => window.location.reload()}>⟳ Refresh Feed</button>
      </div>

      <div className="grid-dashboard">
        <div className="card">
          <div className="card-title">🗞 Market News</div>
          <div className="card-sub">Latest updates for you</div>
          <div className="list" style={{ marginTop: 14 }}>
            {data.marketNews.map((n, i) => (
              <div key={i} className="article">
                <h4><a href={n.url} target="_blank" rel="noreferrer">{n.title}</a></h4>
                <div className="meta">{n.source}</div>
                <div className="vote">
                  <button onClick={() => sendFeedback('MARKET_NEWS', n.url, 1)}>👍</button>
                  <button onClick={() => sendFeedback('MARKET_NEWS', n.url, -1)}>👎</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="card-title">💲 Coin Prices</div>
          <div className="card-sub">Live market data</div>
          <div className="list" style={{ marginTop: 14 }}>
            {data.coinPrices.map((p, i) => (
              <div key={i} className="price-row">
                <div className="price-left">
                  <div className="badge-circle">{p.symbol.slice(0, 2)}</div>
                  <div>
                    <div className="price-name">{p.symbol}</div>
                    <div className="meta">USD</div>
                  </div>
                </div>
                <div className="price-right">
                  <div>${p.priceUsd.toLocaleString()}</div>
                  <div className={`price-change ${p.change24hPct >= 0 ? 'pos' : 'neg'}`}>
                    {p.change24hPct.toFixed(2)}%
                  </div>
                </div>
                <div className="vote">
                  <button onClick={() => sendFeedback('COIN_PRICES', p.symbol, 1)}>👍</button>
                  <button onClick={() => sendFeedback('COIN_PRICES', p.symbol, -1)}>👎</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid-bottom" style={{ marginTop: 18 }}>
        <div className="card">
          <div className="card-title">💡 AI Insight of the Day</div>
          <div className="card-sub">Personalized wisdom</div>
          <div className="inner-panel" style={{ marginTop: 14 }}>
            {data.aiInsight}
          </div>
          <div className="footer-bar">
            <div>Was this helpful?</div>
            <div className="vote">
              <button onClick={() => sendFeedback('AI_INSIGHT', 'ai-insight', 1)}>Helpful</button>
              <button onClick={() => sendFeedback('AI_INSIGHT', 'ai-insight', -1)}>Not useful</button>
            </div>
          </div>
          <div className="disclaimer">Disclaimer: This is educational content, not financial advice.</div>
        </div>

        <div className="card">
          <div className="card-title">🎉 Crypto Fun</div>
          <div className="card-sub">Daily dose of humor</div>
          <div className="inner-panel" style={{ marginTop: 14, textAlign: 'center', fontWeight: 700 }}>
            {data.memeUrl
              ? <img src={data.memeUrl} alt="Meme" style={{ maxWidth: '100%', borderRadius: 8 }} />
              : 'No meme today 😅'}
          </div>
          <div className="footer-bar">
            <div>Did this make you smile?</div>
            <div className="vote">
              <button onClick={() => sendFeedback('MEME', data.memeUrl || 'meme', 1)}>😄 Funny</button>
              <button onClick={() => sendFeedback('MEME', data.memeUrl || 'meme', -1)}>😐 Meh</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
