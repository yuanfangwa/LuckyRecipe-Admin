import api from './request'

export interface Role {
  id: number
  roleName: string
  roleKey: string
  description: string
}

export interface User {
  id: number
  username: string
  nickname: string
  phone: string
  avatar: string
  status: number
  roles: Role[]
  createdAt: string
}

export interface PageResult<T> {
  total: number
  pages: number
  records: T[]
}

export function getUserList(params: { pageNum: number; pageSize: number; keyword?: string }) {
  return api.get<any, PageResult<User>>('/admin/users', { params })
}

export function getRoles() {
  return api.get<any, { code: number; data: { records: Role[] } }>('/roles')
}

export function updateUserRole(userId: number, roleIds: number[]) {
  return api.put(`/admin/users/${userId}/role`, { roleIds })
}
