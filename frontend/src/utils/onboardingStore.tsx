// src/utils/onboardingStore.tsx
import { createContext, useContext, useState } from 'react'
import type { PreferencesVM } from '../api/types'

const defaultState: PreferencesVM = { assets: [], investorType: 'HODLER', contentTypes: [] }

const Ctx = createContext<{
  state: PreferencesVM
  setState: React.Dispatch<React.SetStateAction<PreferencesVM>>
}>({ state: defaultState, setState: () => {} })

export function OnboardingProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<PreferencesVM>(() => {
    const cached = localStorage.getItem('onboarding')
    return cached ? JSON.parse(cached) : defaultState
  })
  // persist
  localStorage.setItem('onboarding', JSON.stringify(state))
  return <Ctx.Provider value={{ state, setState }}>{children}</Ctx.Provider>
}

export function useOnboarding() {
  return useContext(Ctx)
}
