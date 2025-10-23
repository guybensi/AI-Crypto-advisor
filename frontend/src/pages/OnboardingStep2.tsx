import Header from './_Header'

export default function OnboardingStep2() {
  return (
    <div className="container">
      <Header />
      <div className="wizard card" style={{ ['--progress' as any]:'66%' }}>
        <div className="progress-wrap">
          <div className="progress-track"><div className="progress-bar" /></div>
          <div className="progress-labels"><span>Step 2 of 3</span><span>67% Complete</span></div>
        </div>

        <h2 className="card-title">What type of investor are you?</h2>
        <p className="card-sub">Choose the one that fits you best</p>

        <div className="list" style={{marginTop:14}}>
          {[
            ['💎','HODLer',"Long-term believer in crypto's future"],
            ['📈','Day Trader','Active trading and technical analysis'],
            ['🎨','NFT Collector','Digital art and collectibles'],
            ['🌾','DeFi Farmer','Yield farming and staking'],
            ['🔎','Casual Explorer','Learning and exploring crypto'],
          ].map(([icon,title,sub])=>(
            <div key={String(title)} className="row-option" data-group="investor" tabIndex={0} aria-checked="false">
              <div className="icon">{icon}</div>
              <div><div className="opt-title">{title}</div><div className="opt-sub">{sub as string}</div></div>
            </div>
          ))}
        </div>

        <div className="actions">
          <a className="btn btn-ghost" href="/onboarding/1">Back</a>
          <a className="btn btn-primary" href="/onboarding/3">Continue →</a>
        </div>
      </div>
    </div>
  )
}
