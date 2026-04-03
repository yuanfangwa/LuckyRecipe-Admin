import api from './request'

export interface UserProfile {
  id: number
  username: string
  nickname: string
  avatar: string
  dietType: string
  tastePreference: string
  allergens: string[]
  cookingCount: number
  checkInCount: number
  createdAt: string
}

export function getUserProfile(userId?: number) {
  const params = userId ? { userId } : {}
  return api.get<any, UserProfile>('/user/profile', { params })
}

export function updateUserProfile(data: Partial<UserProfile>) {
  return api.put('/user/profile', data)
}
