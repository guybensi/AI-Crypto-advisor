import { httpGet, currentEmail } from './http'
import { DashboardDTO } from './types'

export function getDailyDashboard(): Promise<DashboardDTO> {
  const email = encodeURIComponent(currentEmail())
  return httpGet<DashboardDTO>(`/dashboard/daily?email=${email}`)
}
