// frontend/src/pages/Dashboard.tsx
import { useEffect, useState } from 'react'
import { getDailyDashboard, DashboardDTO } from '../api/dashboardApi'
import { sendFeedback } from '../api/feedbackApi'

type VoteMap = Record<string, 1 | -1 | 0>

export default function Dashboard() {
  const [data, setData] = useState<DashboardDTO | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [votes, setVotes] = useState<VoteMap>({}) // contentId -> 1|-1|0

  async function load() {
    setLoading(true); setError(null)
    try { setData(await getDailyDashboard()) }
    catch (e: any) { setError(e.message || 'Failed to load dashboard') }
    finally { setLoading(false) }
  }
  useEffect(() => { load() }, [])

  function markVoted(id: string, v: 1 | -1) {
    setVotes(prev => ({ ...prev, [id]: v }))
  }

  async function onVote(section: 'MARKET_NEWS' | 'COIN_PRICES' | 'AI_INSIGHT' | 'MEME', contentId: string, v: 1 | -1) {
    // חיווי מיידי (אופטימי)
    markVoted(contentId, v)
    const res = await sendFeedback(section, contentId, v)
    if (!res?.ok) {
      // אם נכשל – נסמן כלא מצביע, או תשאיר מסומן (לבחירתך)
      // setVotes(prev => ({ ...prev, [contentId]: 0 }))
      console.warn('vote not saved on server')
    }
  }

  if (error) return <div style={{ color: 'salmon' }}>{error}</div>
  if (!data) return <div className="container">Loading dashboard...</div>

  return (
    <div className="container">
      <div className="header-row">
        <div>
          <h2 style={{ margin: 0, fontSize: 28, fontWeight: 800 }}>Welcome back!</h2>
          <div style={{ color: 'var(--muted)', marginTop: 4 }}>Your personalized crypto insights for today</div>
        </div>
        <button className="refresh" onClick={load} disabled={loading}>⟳ Refresh Feed</button>
      </div>

      <div className="grid-dashboard">
        {/* NEWS */}
        <div className="card">
          <div className="card-title">🗞 Market News</div>
          <div className="card-sub">Latest updates for you</div>
          <div className="list" style={{ marginTop: 14 }}>
            {data.marketNews.map((n, i) => {
              const v = votes[n.url] ?? 0
              return (
                <div key={i} className="article">
                  <h4>
                    <a href={n.url} target="_blank" rel="noreferrer" style={{ color: '#fff', textDecoration: 'none' }}>
                      {n.title}
                    </a>
                  </h4>
                  <div className="meta">{n.source}</div>
                  <div className="vote">
                    <button
                      className={v === 1 ? 'active' : ''}
                      onClick={() => onVote('MARKET_NEWS', n.url, 1)}
                      disabled={v !== 0}
                      title="Like"
                    >👍</button>
                    <button
                      className={v === -1 ? 'active' : ''}
                      onClick={() => onVote('MARKET_NEWS', n.url, -1)}
                      disabled={v !== 0}
                      title="Dislike"
                    >👎</button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* PRICES */}
        <div className="card">
          <div className="card-title">💲 Coin Prices</div>
          <div className="card-sub">Live market data</div>
          <div className="list" style={{ marginTop: 14 }}>
            {data.coinPrices.map((p, i) => {
              const id = `PRICE_${p.symbol}`
              const v = votes[id] ?? 0
              return (
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
                    <button
                      className={v === 1 ? 'active' : ''}
                      onClick={() => onVote('COIN_PRICES', id, 1)}
                      disabled={v !== 0}
                      title="Like"
                    >👍</button>
                    <button
                      className={v === -1 ? 'active' : ''}
                      onClick={() => onVote('COIN_PRICES', id, -1)}
                      disabled={v !== 0}
                      title="Dislike"
                    >👎</button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* AI + MEME */}
      <div className="grid-bottom" style={{ marginTop: 18 }}>
        <div className="card">
          <div className="card-title">💡 AI Insight of the Day</div>
          <div className="card-sub">Personalized wisdom</div>
          <div className="inner-panel" style={{ marginTop: 14 }}>{data.aiInsight}</div>
          <div className="footer-bar">
            <div>Was this helpful?</div>
            {(() => {
              const id = 'ai-insight'
              const v = votes[id] ?? 0
              return (
                <div className="vote">
                  <button className={v === 1 ? 'active' : ''} onClick={() => onVote('AI_INSIGHT', id, 1)} disabled={v !== 0}>Helpful</button>
                  <button className={v === -1 ? 'active' : ''} onClick={() => onVote('AI_INSIGHT', id, -1)} disabled={v !== 0}>Not useful</button>
                </div>
              )
            })()}
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
            {(() => {
              const id = `meme_${data.memeUrl || 'none'}`
              const v = votes[id] ?? 0
              return (
                <div className="vote">
                  <button className={v === 1 ? 'active' : ''} onClick={() => onVote('MEME', id, 1)} disabled={v !== 0}>😄 Funny</button>
                  <button className={v === -1 ? 'active' : ''} onClick={() => onVote('MEME', id, -1)} disabled={v !== 0}>😐 Meh</button>
                </div>
              )
            })()}
          </div>
        </div>
      </div>
    </div>
  )
}
