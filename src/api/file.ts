import api from './request'

export function uploadImage(file: File) {
  const formData = new FormData()
  formData.append('file', file)
  return api.post<any, string>('/upload/image', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
}

export function uploadAvatar(file: File) {
  const formData = new FormData()
  formData.append('file', file)
  return api.post<any, string>('/upload/avatar', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
}

export function deleteFile(url: string) {
  return api.delete('/upload', { params: { url } })
}
