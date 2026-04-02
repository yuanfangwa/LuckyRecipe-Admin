import api from './request'

export interface Strategy {
  id: number
  name: string
  type: string
  description: string
  enabled: boolean
  config: string
  createdAt: string
}

export function getStrategies() {
  return api.get<any, Strategy[]>('/admin/recommendation/strategies')
}

export function createStrategy(data: Omit<Strategy, 'id' | 'createdAt'>) {
  return api.post<any, Strategy>('/admin/recommendation/strategies', data)
}

export function updateStrategy(id: number, data: Partial<Strategy>) {
  return api.put<any, Strategy>(`/admin/recommendation/strategies/${id}`, data)
}
