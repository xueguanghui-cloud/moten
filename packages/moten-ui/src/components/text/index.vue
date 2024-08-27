<template>
  <div :class="classes" :style="[displayStyle, positionStyle]">
    <div v-html="text" class="text ql-editor" :style="styles" :class="{ 'no-value': !text }"></div>
  </div>
</template>

<script lang="ts">
import { createNameSpace } from '@/utils/components'
import { computed, defineComponent, toRefs, inject } from 'vue-demi'
import { props } from './props'

const { name, n } = createNameSpace('text')

export default defineComponent({
  name,
  props,
  setup(props) {
    const platform = inject('platform')

    const { data, viewport, parent } = toRefs(props)

    const inCanvas = computed(() => parent.value === 'canvas')
    const classes = computed(() => [
      n(),
      { 'in-canvas': inCanvas.value, 'platform-user': platform === 'user' },
    ])
    const display = computed(() => {
      const display = data.value?.display?.[viewport.value]
      return typeof display === 'boolean' ? display : true
    })
    const text = computed(() => data.value?.text?.[viewport.value] || '')
    const width = computed(() => data.value?.width?.[viewport.value] || '')
    const height = computed(() => data.value?.height?.[viewport.value] || '')
    const top = computed(() => data.value?.top?.[viewport.value] || '')
    const left = computed(() => data.value?.left?.[viewport.value] || '')
    const styles = computed(() => ({ width: width.value, height: height.value }))
    const positionStyle = computed(() => {
      if (platform !== 'editor') {
        return { top: top.value, left: left.value }
      }
      return
    })
    const displayStyle = computed(() => {
      if (platform === 'editor') {
        return !display.value ? { opacity: 0.4, filter: 'brightness(0.7)' } : {}
      } else {
        return !display.value ? { display: 'none' } : {}
      }
    })

    return {
      classes,
      styles,
      positionStyle,
      displayStyle,
      display,
      text,
    }
  },
})
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
