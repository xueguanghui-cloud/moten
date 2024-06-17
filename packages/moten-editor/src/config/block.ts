// import icon from '@/config/icon'

// const { row, column, image, text, swiper, blank, canvas } = icon

export interface BaseBlock {
  id: string
  code: string
  name: string
  icon: string
  nested?: boolean
  children?: BaseBlock[][]
  formData: any
}
