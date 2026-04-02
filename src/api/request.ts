import axios from 'axios'
import { message } from 'antd'

const api = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
})

api.interceptors.request.use(config => {
  const token = localStorage.getItem('admin_token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

api.interceptors.response.use(
  res => {
    const body = res.data
    // 如果是标准 Result 包装 { code, data, success, message }，直接返回 data
    if (body && typeof body === 'object' && 'code' in body && 'data' in body) {
      if (body.code === 200 || body.success) {
        return body.data
      }
      message.error(body.message || '请求失败')
      return Promise.reject(new Error(body.message))
    }
    return body
  },
  err => {
    if (err.response?.status === 401) {
      localStorage.removeItem('admin_token')
      window.location.href = '/admin/login'
    }
    message.error(err.response?.data?.message || '请求失败')
    return Promise.reject(err)
  }
)

export default api
