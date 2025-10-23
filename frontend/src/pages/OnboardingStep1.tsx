import Header from './_Header'
import { useOnboarding } from '../utils/onboardingStore'
import { useNavigate } from 'react-router-dom'

const coins = [
  ['B','Bitcoin','BTC'], ['E','Ethereum','ETH'], ['A','Cardano','ADA'], ['S','Solana','SOL'],
  ['D','Polkadot','DOT'], ['X','Ripple','XRP'], ['D','Dogecoin','DOGE'], ['A','Avalanche','AVAX'],
] as const

export default function OnboardingStep1() {
  const { state, setState } = useOnboarding()
  const nav = useNavigate()
  const toggle = (sym:string)=> setState(s => ({...s, assets: s.assets.includes(sym) ? s.assets.filter(x=>x!==sym) : [...s.assets, sym]}))

  return (
    <div className="container">
      <Header />
      <div className="wizard card" style={{ ['--progress' as any]:'33%' }}>
        <div className="progress-wrap">
          <div className="progress-track"><div className="progress-bar" /></div>
          <div className="progress-labels"><span>Step 1 of 3</span><span>33% Complete</span></div>
        </div>

        <h2 className="card-title">Which crypto assets do you follow?</h2>
        <p className="card-sub">Select all that interest you</p>

        <div className="grid cols-4" style={{marginTop:14}}>
          {coins.map(([l,n,sym])=>(
            <div key={sym}
                 className={`tile ${state.assets.includes(sym)?'active':''}`}
                 data-toggle="multi" tabIndex={0} aria-checked={state.assets.includes(sym)}
                 onClick={()=>toggle(sym)}>
              <div className="badge">{l}</div><div className="title">{n}</div><div className="sub">{sym}</div>
            </div>
          ))}
        </div>

        <div className="actions">
          <a className="btn btn-ghost" href="/login">Back</a>
          <button className="btn btn-primary" onClick={()=>nav('/onboarding/2')}>Continue →</button>
        </div>
      </div>
    </div>
  )
}
