import api from './request'

export interface CookingTimer {
  id: number
  userId: number
  username: string
  recipeId: number
  recipeName: string
  step: string
  duration: number
  remaining: number
  status: 'running' | 'paused' | 'completed'
  createdAt: string
}

export function getTimerList(params?: { status?: string }) {
  return api.get<any, CookingTimer[]>('/cooking-timer', { params })
}

export function createTimer(data: { recipeId: number; step: string; duration: number }) {
  return api.post<any, CookingTimer>('/cooking-timer', data)
}

export function updateTimer(id: number, data: Partial<CookingTimer>) {
  return api.put(`/cooking-timer/${id}`, data)
}

export function deleteTimer(id: number) {
  return api.delete(`/cooking-timer/${id}`)
}
