import Header from './_Header'
import { useOnboarding } from '../utils/onboardingStore'
import { useNavigate } from 'react-router-dom'
import { savePreferences } from '../api/preferencesApi'

const opts = [
  ['📰','Market News','MARKET_NEWS'],
  ['📊','Price Charts','CHARTS'],
  ['💬','Social Sentiment','SOCIAL'],
  ['😄','Fun Memes','FUN'],
] as const

export default function OnboardingStep3(){
  const { state, setState } = useOnboarding()
  const nav = useNavigate()

  const toggle = (value:string)=> setState(s=>({
    ...s, contentTypes: s.contentTypes.includes(value as any)
      ? s.contentTypes.filter(x=>x!==value)
      : [...s.contentTypes, value as any]
  }))

  async function finish() {
    await savePreferences(state)
    nav('/dashboard')
  }

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
          {opts.map(([icon,label,value])=>(
            <div key={value}
                 className={`tile ${state.contentTypes.includes(value as any)?'active':''}`}
                 data-toggle="multi" tabIndex={0}
                 aria-checked={state.contentTypes.includes(value as any)}
                 onClick={()=>toggle(value)}>
              <div className="badge">{icon}</div><div className="title">{label}</div>
            </div>
          ))}
        </div>

        <div className="actions">
          <a className="btn btn-ghost" href="/onboarding/2">Back</a>
          <button className="btn btn-primary" onClick={finish}>Get Started →</button>
        </div>
      </div>
    </div>
  )
}
