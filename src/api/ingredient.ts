import api from './request'
import type { PageResult } from './recipe'

export interface Ingredient {
  id: number
  name: string
  category?: string
  unit?: string
  imageUrl?: string
  description?: string
  sourceId?: number
  sourceType?: string
  createTime: string
  updateTime?: string
  deleted?: number
}

export interface IngredientListParams {
  pageNum: number
  pageSize: number
  keyword?: string
  category?: string
}

export function getIngredientList(params: IngredientListParams) {
  return api.get<any, PageResult<Ingredient>>('/ingredients', { params })
}

export function createIngredient(data: Partial<Ingredient>) {
  return api.post<any, Ingredient>('/ingredients', data)
}

export function updateIngredient(id: number, data: Partial<Ingredient>) {
  return api.put<any, Ingredient>(`/ingredients/${id}`, data)
}

export function deleteIngredient(id: number) {
  return api.delete(`/ingredients/${id}`)
}
