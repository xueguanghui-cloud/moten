import { post } from '@/composable/use-request'

// 创建账户
export const registerUserApi = (data: { username: string; password: string }) =>
  post('/rest/v1/user/register', data)

// 登录账户
export const loginUserApi = (data: { username: string; password: string }) =>
  post('/rest/v1/user/login', data)
