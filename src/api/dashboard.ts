import api from './request'

export interface Overview {
  totalRecipes: number
  totalUsers: number
  totalComments: number
  todayVisits: number
}

export interface ContentAnalytics {
  totalRecipes: number
  [key: string]: any
}

export function getOverview() {
  return api.get<any, ContentAnalytics>('/admin/analytics/content/recipes')
}

export function getHealthStatus() {
  return api.get<any, any>('/admin/analytics/health/status')
}
