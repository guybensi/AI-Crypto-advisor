import Header from './_Header'

const coins = [
  ['B','Bitcoin','BTC'], ['E','Ethereum','ETH'], ['A','Cardano','ADA'], ['S','Solana','SOL'],
  ['D','Polkadot','DOT'], ['X','Ripple','XRP'], ['D','Dogecoin','DOGE'], ['A','Avalanche','AVAX'],
]

export default function OnboardingStep1() {
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
          {coins.map(([l,n,s])=>(
            <div key={s} className="tile" data-toggle="multi" tabIndex={0} aria-checked="false">
              <div className="badge">{l}</div>
              <div className="title">{n}</div>
              <div className="sub">{s}</div>
            </div>
          ))}
        </div>

        <div className="actions">
          <a className="btn btn-ghost" href="/login">Back</a>
          <a className="btn btn-primary" href="/onboarding/2">Continue →</a>
        </div>
      </div>
    </div>
  )
}
