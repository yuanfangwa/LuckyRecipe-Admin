import api from './request'

export interface FavoriteFolder {
  id: number
  userId: number
  username: string
  name: string
  recipeCount: number
  createdAt: string
}

export function getFavoriteFolders() {
  return api.get<any, FavoriteFolder[]>('/favorites/folders')
}

export function getFolderRecipes(folderId: number, params: { pageNum: number; pageSize: number }) {
  return api.get<any, { total: number; pages: number; records: any[] }>(`/favorites/folders/${folderId}/recipes`, { params })
}
