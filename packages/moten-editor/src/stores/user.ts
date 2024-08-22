import { setToken } from '@/utils/storage'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    token: '',
    role: 10,
  }),
  getters: {
    isAdminRole: (state) => state.role === 10,
  },
  actions: {
    setToken(token: string) {
      this.token = token
      setToken(token)
    },
    setRole(role: number) {
      this.role = role
    },
  },
})
