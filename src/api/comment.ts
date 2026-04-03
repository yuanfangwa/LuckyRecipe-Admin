import api from './request'

export interface Comment {
  id: number
  userId: number
  username: string
  recipeId: number
  recipeName: string
  content: string
  rating: number
  parentId: number | null
  children?: Comment[]
  createdAt: string
}

export interface RatingSummary {
  average: number
  distribution: Record<number, number>
  total: number
}

export function getCommentList(params: { pageNum: number; pageSize: number; keyword?: string; recipeId?: number }) {
  return api.get<any, { total: number; pages: number; records: Comment[] }>('/comments', { params })
}

export function getCommentTree(params?: { recipeId?: number }) {
  return api.get<any, Comment[]>('/comments/tree', { params })
}

export function deleteComment(id: number) {
  return api.delete(`/comments/${id}`)
}

export function getRatingSummary(params?: { recipeId?: number }) {
  return api.get<any, RatingSummary>('/comments/rating-summary', { params })
}
