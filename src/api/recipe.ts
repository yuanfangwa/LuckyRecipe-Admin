import api from './request'

export interface Recipe {
  id: number
  name: string
  description?: string
  coverImage?: string
  difficulty?: string
  cookingTime?: number
  servings?: number
  category?: string
  prepTimeMinutes?: number
  viewCount: number
  likeCount: number
  commentCount: number
  status: number
  createTime: string
  updateTime?: string
  sourceId?: number
  sourceType?: string
  nutritionInfo?: string
  imagePath?: string
  sourcePath?: string
  ingredients?: RecipeIngredient[]
  steps?: RecipeStep[]
}

export interface RecipeIngredient {
  name: string
  amount: string
}

export interface RecipeStep {
  order: number
  description: string
}

export interface RecipeListParams {
  pageNum: number
  pageSize: number
  keyword?: string
  status?: number
}

export interface PageResult<T> {
  records: T[]
  total: number
  size: number
  current: number
  pages: number
}

export function getRecipeList(params: RecipeListParams) {
  return api.get<any, PageResult<Recipe>>('/recipes', { params })
}

export function getRecipeDetail(id: number) {
  return api.get<any, Recipe>(`/recipes/${id}`)
}

export function createRecipe(data: Partial<Recipe>) {
  return api.post<any, Recipe>('/recipes/full', data)
}

export function updateRecipe(id: number, data: Partial<Recipe>) {
  return api.put<any, Recipe>(`/recipes/${id}/full`, data)
}

export function deleteRecipe(id: number) {
  return api.delete(`/recipes/${id}`)
}

export function updateRecipeStatus(id: number, status: number) {
  return api.put(`/recipes/${id}/status`, { status })
}
