import api from './request'

export interface CheckIn {
  id: number
  userId: number
  username: string
  avatar: string
  recipeId: number
  recipeName: string
  image: string
  content: string
  createdAt: string
}

export interface CheckInStats {
  totalCheckIns: number
  todayCheckIns: number
  activeUsers: number
}

export function getCheckInFeed(params: { pageNum: number; pageSize: number; recipeId?: number }) {
  return api.get<any, { total: number; pages: number; records: CheckIn[] }>('/checkin/feed', { params })
}

export function getCheckInByRecipe(recipeId: number, params: { pageNum: number; pageSize: number }) {
  return api.get<any, { total: number; pages: number; records: CheckIn[] }>(`/checkin/recipe/${recipeId}`, { params })
}

export function getCheckInStats() {
  return api.get<any, CheckInStats>('/checkin/stats')
}
