import api from './request'

export interface Overview {
  totalRecipes: number
  totalUsers: number
  totalComments: number
  todayVisits: number
  activeExperiments: number
}

export function getOverview() {
  return api.get<any, Overview>('/admin/analytics/overview')
}
