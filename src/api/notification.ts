import api from './request'

export interface Notification {
  id: number
  userId: number
  username: string
  title: string
  content: string
  type: string
  read: boolean
  createdAt: string
}

export function getNotificationList(params: { pageNum: number; pageSize: number; type?: string }) {
  return api.get<any, { total: number; pages: number; records: Notification[] }>('/notifications', { params })
}

export function markNotificationRead(id: number) {
  return api.put(`/notifications/${id}/read`)
}

export function deleteNotification(id: number) {
  return api.delete(`/notifications/${id}`)
}

export function batchMarkRead(ids: number[]) {
  return Promise.all(ids.map(id => markNotificationRead(id)))
}

// Admin broadcast
export function broadcastNotification(data: { title: string; content: string; userIds?: number[] }) {
  return api.post('/admin/notifications/broadcast', data)
}
