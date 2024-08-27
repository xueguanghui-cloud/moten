<script lang="ts">
import { props } from './props'
import { defineComponent, computed, toRefs, inject } from "vue";
import { createNameSpace } from "@/utils/components"
import MoLink from '../link'
import MoEmpty from '../empty'

const { name, n } = createNameSpace('image')

export default defineComponent({
  name,
  props,
  components: {
    MoLink,
    MoEmpty
  },
  setup(props) {
    const platform = inject('platform')
    const { data, viewport, parent } = toRefs(props)
    const inCanvas = computed(() => parent.value === 'canvas')
    const classes = computed(() => [n(), { 'in-canvas': inCanvas.value, 'platform-user': platform === 'user' }])
    const display = computed(() => {
      const display = data.value?.display?.[viewport.value]
      return typeof display === 'boolean' ? display : true
    })
    const src = computed(() => data.value?.src?.[viewport.value] || '')
    const link = computed(() => data.value?.link?.[viewport.value] || '')
    const width = computed(() => data.value?.width?.[viewport.value] || '')
    const height = computed(() => data.value?.height?.[viewport.value] || '')
    const top = computed(() => data.value?.top?.[viewport.value] || '')
    const left = computed(() => data.value?.left?.[viewport.value] || '')
    const styles = computed(() => ({ width: width.value, height: height.value }))
    const positionStyle = computed(() => {
      if(platform !== 'editor') {
        return { top: top.value, left: left.value }
      }
      return
    })
    const displayStyle = computed(()=>{
      if (platform === 'editor') {
        return !display.value ? { opacity: 0.4, filter: 'brightness(0.7)' } : {}
      } else {
        return !display.value ? { display: 'none' } : {}
      }
    })

    return {
      classes,
      styles,
      display,
      src,
      link,
      width,
      height,
      displayStyle,
      positionStyle
    }
  },
});
</script>

<template>
  <div :class="classes" :style="[displayStyle, positionStyle]">
    <MoLink v-if="src" :to="link" target="_blank">
      <img v-bind="$attrs" :src="src" class="image" :style="styles">
    </MoLink>
    <div v-else class="no-image">
      <MoEmpty description="暂无图片，请上传" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './index.scss';
</style>

