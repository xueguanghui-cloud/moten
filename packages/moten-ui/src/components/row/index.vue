<template>
  <div :class="classes" :style="[displayStyle, styles]">
    <div class="item">
      <slot :item="itemComputed"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { createNameSpace } from '@/utils/components'
import { computed, defineComponent, toRefs, inject } from 'vue-demi'
import { props } from './props'

const { name, n } = createNameSpace('row')

export default defineComponent({
  name,
  props,
  setup(props) {
    const platform = inject('platform')
    const { data, viewport, children } = toRefs(props)

    const classes = computed(() => [n()])
    const itemComputed = computed(() => children.value[0] || [])
    const display = computed(() => {
      const display = data.value?.display?.[viewport.value]
      return typeof display === 'boolean' ? display : true
    })
    const background = computed(() => data.value?.background?.[viewport.value] || '')
    const styles = computed(() => ({ background: background.value }))
    const displayStyle = computed(() => {
      if(platform === 'editor') {
        return !display.value ? { opacity: 0.4, filter: 'brightness(0.7)' } : {}
      }else {
        return !display.value ? { display: 'none' } : {}
      }
    })

    return {
      classes,
      itemComputed,
      background,
      styles,
      displayStyle
    }
  },
})
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
