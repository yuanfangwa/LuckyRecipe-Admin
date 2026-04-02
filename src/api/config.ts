import api from './request'

export interface ConfigItem {
  id: number
  configKey: string
  configValue: string
  description: string
  category: string
  dataType: 'STRING' | 'INTEGER' | 'BOOLEAN' | 'TEXT'
  defaultValue: string | null
  isSensitive: boolean
  isEnabled: boolean
  requireRestart: boolean
  validationRule: string | null
  minValue: number | null
  maxValue: number | null
  allowedValues: string | null
  environment: string
  configLevel: string
}

export interface PageResult<T> {
  records: T[]
  total: number
  current: number
  size: number
  pages: number
}

export function getConfigList(params?: { current?: number; size?: number; category?: string }) {
  return api.get<any, PageResult<ConfigItem>>('/admin/system/config', { params })
}

export function updateConfig(id: number, data: Partial<ConfigItem>) {
  return api.put(`/admin/system/config/${id}`, data)
}
