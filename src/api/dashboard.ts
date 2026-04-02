import api from './request'

export interface Overview {
  totalRecipes: number
  totalUsers: number
  totalComments: number
  todayVisits: number
}

export interface TrendItem {
  date: string
  recipes: number
  users: number
  visits: number
}

export function getOverview() {
  return api.get<any, Overview>('/admin/analytics/overview')
}

export function getTrend() {
  return api.get<any, TrendItem[]>('/admin/analytics/trend')
}
