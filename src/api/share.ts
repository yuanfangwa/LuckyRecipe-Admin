import api from './request'

export interface ShareLink {
  id: number
  code: string
  recipeId: number
  recipeName: string
  userId: number
  username: string
  createdAt: string
}

export function createShare(recipeId: number) {
  return api.post<any, ShareLink>('/share', { recipeId })
}

export function getShareByCode(code: string) {
  return api.get<any, ShareLink>(`/share/${code}`)
}

export function getShareByRecipe(recipeId: number) {
  return api.get<any, ShareLink[]>(`/share/recipe/${recipeId}`)
}
