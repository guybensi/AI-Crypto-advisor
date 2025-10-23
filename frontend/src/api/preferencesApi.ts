import { httpPost } from './http'
import type { PreferencesVM } from './types'

function toBackend(vm: PreferencesVM) {
  return {
    cryptoAssets: vm.assets.join(','),      // "BTC,ETH,SOL"
    investorType: vm.investorType,          // HODLER | DAY_TRADER | NFT_COLLECTOR
    contentTypes: vm.contentTypes.join(','),// "MARKET_NEWS,CHARTS"
  }
}

export const savePreferences = (vm: PreferencesVM) =>
  httpPost<{ ok: boolean }>('/onboarding', toBackend(vm), true) // ?email=
