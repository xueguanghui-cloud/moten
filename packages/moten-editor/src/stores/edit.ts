import type { BaseBlock, Viewport } from '@/types/edit'
import { defineStore } from 'pinia'

export const useEditStore = defineStore('edit', {
  state: () => ({
    currentSelect: {} as BaseBlock,
    viewport: 'desktop' as Viewport,
  }),
  getters: {
    isMobileViewport: (state) => state.viewport === 'mobile',
  },
  actions: {
    setCurrentSelect(value: BaseBlock) {
      this.currentSelect = value
    },
    setViewport(value: Viewport) {
      this.viewport = value
    },
  },
})
