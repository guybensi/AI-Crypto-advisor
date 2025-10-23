import { httpGet } from './http'
import type { DashboardDTO } from './types'

export const getDailyDashboard = () =>
  httpGet<DashboardDTO>('/dashboard/daily', true) // ?email=
