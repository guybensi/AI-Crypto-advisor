import Header from './_Header'
import { useOnboarding } from '../utils/onboardingStore'
import { useNavigate } from 'react-router-dom'

const options = [
  ['💎','HODLER',"Long-term believer in crypto's future"],
  ['📈','DAY_TRADER','Active trading and technical analysis'],
  ['🎨','NFT_COLLECTOR','Digital art and collectibles'],
] as const

export default function OnboardingStep2(){
  const { state, setState } = useOnboarding()
  const nav = useNavigate()
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
          {options.map(([icon,value,sub])=>(
            <div key={value}
                 className="row-option" data-group="investor" tabIndex={0}
                 aria-checked={state.investorType === value}
                 onClick={()=>setState(s=>({...s, investorType: value as any}))}>
              <div className="icon">{icon}</div>
              <div><div className="opt-title">{value.replace('_',' ')}</div><div className="opt-sub">{sub}</div></div>
            </div>
          ))}
        </div>

        <div className="actions">
          <a className="btn btn-ghost" href="/onboarding/1">Back</a>
          <button className="btn btn-primary" onClick={()=>nav('/onboarding/3')}>Continue →</button>
        </div>
      </div>
    </div>
  )
}
