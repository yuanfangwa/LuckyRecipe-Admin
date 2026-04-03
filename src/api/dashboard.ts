import api from './request'

export interface Overview {
  totalRecipes: number
  totalUsers: number
  totalComments: number
  todayVisits: number
  activeExperiments: number
}

export interface TrendItem {
  date: string
  recipes: number
  users: number
  visits: number
}

export interface CategoryItem {
  category: string
  count: number
  percentage?: number
}

export interface HealthComponent {
  name: string
  status: string
  responseTime?: number
  details?: string
}

export interface HealthStatus {
  status: string
  components: HealthComponent[]
  uptime?: number
  timestamp?: string
}

export interface HourlyActivity {
  hour: number
  activity: number
}

export interface UserBehaviorAnalysis {
  hourlyActivityPattern: HourlyActivity[]
  // other fields ignored
}

export function getOverview() {
  return api.get<any, Overview>('/admin/analytics/overview')
}

export function getTrend() {
  return api.get<any, TrendItem[]>('/admin/analytics/trend')
}

export function getContentRecipes() {
  return api.get<any, { categoryAnalysis: CategoryItem[] }>('/admin/analytics/content/recipes')
}

export function getHealthStatus() {
  return api.get<any, HealthStatus>('/admin/analytics/health/status')
}

export function getUserBehavior() {
  return api.get<any, UserBehaviorAnalysis>('/admin/analytics/user-behavior/analysis')
}
