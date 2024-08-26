import { post } from '@/composable/use-request'

// 图片上传
export const mediaUploadApi = (data: FormData) =>
  post('/rest/v1/media/upload', data, { headers: { 'Content-Type': 'application/form-data' } })
