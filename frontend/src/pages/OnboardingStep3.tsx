import Header from './_Header'

const options = ['Market News','Price Charts','Social Sentiment','Fun Memes','Technical Analysis'] as const

export default function OnboardingStep3() {
  return (
    <div className="container">
      <Header />
      <div className="wizard card" style={{ ['--progress' as any]:'100%' }}>
        <div className="progress-wrap">
          <div className="progress-track"><div className="progress-bar" /></div>
          <div className="progress-labels"><span>Step 3 of 3</span><span>100% Complete</span></div>
        </div>

        <h2 className="card-title">What content interests you?</h2>
        <p className="card-sub">Select all that apply</p>

        <div className="grid cols-2" style={{marginTop:14}}>
          {options.map((o)=>(
            <div key={o} className="tile" data-toggle="multi" tabIndex={0} aria-checked="false">
              <div className="badge">★</div>
              <div className="title">{o}</div>
            </div>
          ))}
        </div>

        <div className="actions">
          <a className="btn btn-ghost" href="/onboarding/2">Back</a>
          <a className="btn btn-primary" href="/dashboard">Get Started →</a>
        </div>
      </div>
    </div>
  )
}
