import api from './request'

export interface User {
  id: number
  username: string
  nickname: string
  avatar: string
  role: string
  createdAt: string
}

export function getUserList() {
  return api.get<any, User[]>('/admin/users')
}

export function updateUserRole(userId: number, role: string) {
  return api.put(`/admin/users/${userId}/role`, { role })
}
