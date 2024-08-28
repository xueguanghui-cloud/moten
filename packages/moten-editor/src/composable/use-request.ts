import router from '@/router'
import axios, { type AxiosRequestConfig } from 'axios'
import { useUserStore } from '@/stores/user'
import { ElMessage } from 'element-plus'

const userStore = useUserStore()

const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8081',
  timeout: 30000,
})

// 请求拦截器
axiosInstance.interceptors.request.use(
  (config) => {
    if (userStore.token) config.headers['Authorization'] = 'Bearer ' + userStore.token

    return config
  },
  (error) => {
    // 错误处理
    return Promise.reject(error)
  },
)

// 响应拦截器
axiosInstance.interceptors.response.use(
  (response) => {
    if (response.data?.code === 401) {
      router.replace('/login')
      userStore.setToken('')
    }
    if (response.data?.code === 200) {
      response.data['status'] = true
    }
    if (!response.data['status']) {
      ElMessage.error(response.data.message)
    }
    // 响应处理
    return response
  },
  (error) => {
    // 错误处理
    return Promise.reject(error)
  },
)

export async function get(url: string, data?: any, config?: AxiosRequestConfig) {
  const response = await axiosInstance.get(url, { ...config, params: data })
  return response.data
}

export async function post(url: string, data?: any, config?: AxiosRequestConfig) {
  const response = await axiosInstance.post(url, data, config)
  return response.data
}
