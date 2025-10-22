import { useEffect, useState } from 'react'
import { getDailyDashboard, Dashboard } from '../api/dashboardApi'
import { sendFeedback } from '../api/feedbackApi'

/**
 * Dashboard page - shows four sections and allows feedback per item.
 * In production, break each into a dedicated component with pagination.
 */
export default function DashboardPage() {
  const [data, setData] = useState<Dashboard | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    (async () => {
      try {
        setData(await getDailyDashboard())
      } catch (err: any) {
        setError(err.message)
      }
    })()
  }, [])

  if (error) return <div style={{ color: 'red' }}>{error}</div>
  if (!data) return <div>Loading dashboard...</div>

  return (
    <div style={{ display: 'grid', gap: 16 }}>
      <section>
        <h2>Market News</h2>
        <ul>
          {data.marketNews.map((n, i) => (
            <li key={i} style={{ marginBottom: 8 }}>
              <a href={n.url} target="_blank" rel="noreferrer">{n.title}</a> — {n.source}
              <div>
                <button onClick={() => sendFeedback('MARKET_NEWS', n.url, 1)}>👍</button>
                <button onClick={() => sendFeedback('MARKET_NEWS', n.url, -1)}>👎</button>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Coin Prices</h2>
        <table>
          <thead><tr><th>Symbol</th><th>Price (USD)</th><th>24h %</th><th>Like?</th></tr></thead>
          <tbody>
            {data.coinPrices.map((p, i) => (
              <tr key={i}>
                <td>{p.symbol}</td>
                <td>{p.priceUsd.toLocaleString()}</td>
                <td>{p.change24hPct}%</td>
                <td>
                  <button onClick={() => sendFeedback('COIN_PRICES', p.symbol, 1)}>👍</button>
                  <button onClick={() => sendFeedback('COIN_PRICES', p.symbol, -1)}>👎</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section>
        <h2>AI Insight of the Day</h2>
        <p>{data.aiInsight}</p>
        <div>
          <button onClick={() => sendFeedback('AI_INSIGHT', 'ai-insight', 1)}>👍</button>
          <button onClick={() => sendFeedback('AI_INSIGHT', 'ai-insight', -1)}>👎</button>
        </div>
      </section>

      <section>
        <h2>Fun Crypto Meme</h2>
        {data.memeUrl ? <img src={data.memeUrl} alt="Meme" style={{ maxWidth: '100%' }} /> : <em>No meme today</em>}
        <div>
          <button onClick={() => sendFeedback('MEME', data.memeUrl || 'meme', 1)}>👍</button>
          <button onClick={() => sendFeedback('MEME', data.memeUrl || 'meme', -1)}>👎</button>
        </div>
      </section>
    </div>
  )
}
