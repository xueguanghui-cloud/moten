import { get, post } from '@/composable/use-request'

export const getPageListAsync = (params: { id?: number; page?: number; size?: number }) => {
  return get('/rest/v1/page', params)
}

export const getPageByIdAsync = (id: number) => {
  return get('/rest/v1/page' + id)
}

export const createPageAsync = (params: { name?: string; content?: string }) => {
  return post('/rest/v1/page/create', params)
}

export const updatePageAsync = (params: { id: number; name?: string; content?: string }) => {
  return post('/rest/v1/page/update', params)
}

export const deletePageAsync = (id: number) => {
  return post('/rest/v1/page/delete', { id })
}
