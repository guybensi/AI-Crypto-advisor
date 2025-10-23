import { httpSend, currentEmail } from './http'
import type { PreferencesVM } from './types'

function toBackend(req: PreferencesVM) {
  return {
    cryptoAssets: req.assets.join(','),                // "BTC,ETH,SOL"
    investorType: req.investorType,                    // HODLER | DAY_TRADER | NFT_COLLECTOR
    contentTypes: req.contentTypes.join(','),          // "MARKET_NEWS,CHARTS"
  }
}

export function savePreferences(vm: PreferencesVM) {
  const email = encodeURIComponent(currentEmail())
  return httpSend(`/onboarding?email=${email}`, 'POST', toBackend(vm))
}
