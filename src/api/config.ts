import api from './request'

export interface ConfigItem {
  key: string
  value: string
  label: string
  type: 'text' | 'number' | 'boolean' | 'textarea'
}

export function getConfig() {
  return api.get<any, ConfigItem[]>('/admin/system/config')
}

export function saveConfig(data: Record<string, string>) {
  return api.post('/admin/system/config', data)
}
