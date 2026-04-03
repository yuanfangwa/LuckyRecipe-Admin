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
