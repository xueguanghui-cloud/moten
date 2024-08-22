import { type Component, defineAsyncComponent, markRaw } from 'vue'
import { customAlphabet } from 'nanoid'
import CryptoJS from 'crypto-js'

/**
 * 随机id生成
 * @param length 长度
 * @returns
 */
export const nanoid = (length = 8) => {
  const nanoid = customAlphabet('123456789abcdefghijklmnopqrstuvwxyz', length)
  return nanoid()
}

/**
 * 延迟函数
 * @param delay 延迟时间
 * @returns
 */
export const sleep = (delay: number) => {
  return new Promise((resolve) => setTimeout(resolve, delay))
}

/**
 * 动态引入组件
 * @param name 组件名
 * @param importUrl 引入所有的组件 import.meta.glob('@/components/config/**')
 * @returns
 */
export const batchDynamicComponents = (name: string, importUrl: Record<string, Component>) => {
  const components = importUrl
  const componentMap = Object.assign(
    {},
    ...Object.keys(components).map((item) => {
      const name = item?.split('/')?.pop()?.replace('.vue', '') || ''
      return {
        [name]: components[item],
      }
    }),
  )
  const importComponent = componentMap[name]

  if (!importComponent) return ''

  return markRaw(defineAsyncComponent(importComponent))
}

/**
 * md5加密
 * @param str 待加密的字符串
 * @returns md5加密后的字符串
 */
export const md5 = (str: string) => {
  if (!str) return ''
  const hash = CryptoJS.MD5(str)
  return hash.toString(CryptoJS.enc.Hex)
}
