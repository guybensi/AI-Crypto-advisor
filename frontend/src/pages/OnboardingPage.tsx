import { useState } from 'react'
import { saveOnboarding } from '../api/onboardingApi'

/** Onboarding page - collects basic preferences for initial personalization. */
export default function OnboardingPage() {
  const [assets, setAssets] = useState('BTC,ETH')
  const [investorType, setInvestorType] = useState('HODLER')
  const [contentTypes, setContentTypes] = useState('MARKET_NEWS,COIN_PRICES,AI_INSIGHT,MEME')
  const [msg, setMsg] = useState<string | null>(null)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMsg(null)
    await saveOnboarding(assets, investorType, 'MARKET_NEWS,CHARTS,SOCIAL,FUN')
    setMsg('Saved! You can go to the Dashboard now.')
  }

  return (
    <form onSubmit={submit} style={{ display: 'grid', gap: 8, maxWidth: 560 }}>
      <h2>Onboarding</h2>
      <label>Crypto assets (comma-separated):
        <input value={assets} onChange={e => setAssets(e.target.value)} />
      </label>
      <label>Investor type:
        <select value={investorType} onChange={e => setInvestorType(e.target.value)}>
          <option>HODLER</option>
          <option>DAY_TRADER</option>
          <option>NFT_COLLECTOR</option>
        </select>
      </label>
      <label>Content types (comma-separated):
        <input value={contentTypes} onChange={e => setContentTypes(e.target.value)} />
      </label>
      <button type="submit">Save</button>
      {msg && <div>{msg}</div>}
    </form>
  )
}
