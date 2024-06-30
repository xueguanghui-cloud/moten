import type { PageSchemaFormData } from '@/config/schema'
import type { BaseBlock, Viewport } from '@/types/edit'
import { defineStore } from 'pinia'

export const useEditStore = defineStore('edit', {
  state: () => ({
    currentSelect: {} as BaseBlock,
    viewport: 'desktop' as Viewport,
    configPanelShow: false,
    pageConfig: {} as PageSchemaFormData,
    blockConfig: [] as BaseBlock[],
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
    setPageConfig(value: PageSchemaFormData) {
      this.pageConfig = value
    },
    setConfigPanelShow(value: boolean) {
      this.configPanelShow = value
    },
    setBlockConfig(value: BaseBlock[]) {
      this.blockConfig = value
    },
  },
})
