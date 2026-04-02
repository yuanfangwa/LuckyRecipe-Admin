import api from './request'

export interface LoginParams {
  username: string
  password: string
}

export interface LoginResult {
  token: string
  userId: number
  username: string
  nickname: string
  avatar: string
  role: string
}

export function login(params: LoginParams) {
  return api.post<any, LoginResult>('/auth/login', params)
}
