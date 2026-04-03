import api from './request'

export interface Achievement {
  id: number
  name: string
  description: string
  icon: string
  type: string
  condition: number
  createdAt: string
}

export function getAchievementList() {
  return api.get<any, Achievement[]>('/achievements')
}

export function checkAchievement(userId: number, achievementType: string) {
  return api.post<any, boolean>('/achievements/check', { userId, type: achievementType })
}

// Admin CRUD
export function getAdminAchievementList(params?: { type?: string }) {
  return api.get<any, Achievement[]>('/admin/achievements', { params })
}

export function createAchievement(data: Omit<Achievement, 'id' | 'createdAt'>) {
  return api.post<any, Achievement>('/admin/achievements', data)
}

export function updateAchievement(id: number, data: Partial<Omit<Achievement, 'id' | 'createdAt'>>) {
  return api.put<any, Achievement>(`/admin/achievements/${id}`, data)
}

export function deleteAchievement(id: number) {
  return api.delete(`/admin/achievements/${id}`)
}
