import api from './request'
import type { PageResult } from './recipe'

export interface Tag {
  id: number
  name: string
  category?: string
  description?: string
  color?: string
  createTime: string
  deleted?: number
}

export interface TagListParams {
  pageNum: number
  pageSize: number
  keyword?: string
  category?: string
}

export function getTagList(params: TagListParams) {
  return api.get<any, PageResult<Tag>>('/tags', { params })
}

export function createTag(data: Partial<Tag>) {
  return api.post<any, Tag>('/tags', data)
}

export function updateTag(id: number, data: Partial<Tag>) {
  return api.put<any, Tag>(`/tags/${id}`, data)
}

export function deleteTag(id: number) {
  return api.delete(`/tags/${id}`)
}
