import api from './request'

export interface ABVariant {
  name: string
  weight: number
  config: string
}

export interface ABExperiment {
  id: number
  name: string
  description: string
  status: string
  trafficPercent: number
  variants: ABVariant[]
  createdAt: string
}

export function getExperiments() {
  return api.get<any, ABExperiment[]>('/admin/ab/experiments')
}

export function createExperiment(data: Omit<ABExperiment, 'id' | 'createdAt'>) {
  return api.post<any, ABExperiment>('/admin/ab/experiments', data)
}

export function updateExperiment(id: number, data: Partial<ABExperiment>) {
  return api.put<any, ABExperiment>(`/admin/ab/experiments/${id}`, data)
}

export function deleteExperiment(id: number) {
  return api.delete(`/admin/ab/experiments/${id}`)
}
