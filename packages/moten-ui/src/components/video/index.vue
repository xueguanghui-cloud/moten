<script lang="ts">
import { props } from './props'
import { defineComponent, computed, toRefs, inject } from "vue";
import { createNameSpace } from "@/utils/components"
import MoEmpty from '../empty'

const { name, n } = createNameSpace('video')

export default defineComponent({
  name,
  props,
  components: {
    MoEmpty
  },
  setup(props) {
    const platform = inject('platform')
    const { data, viewport } = toRefs(props)
    const classes = computed(() => [n()])
    const display = computed(() => {
      const display = data.value?.display?.[viewport.value]
      return typeof display === 'boolean' ? display : true
    })
    const src = computed(() => data.value?.src?.[viewport.value] || '')
    const autoPlay = computed(() => data.value?.autoPlay?.[viewport.value] || false)
    const muted = computed(() => data.value?.muted?.[viewport.value] || false)
    const width = computed(() => data.value?.width?.[viewport.value] || '')
    const height = computed(() => data.value?.height?.[viewport.value] || '')
    const styles = computed(() => ({ width: width.value, height: height.value }))
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
      autoPlay,
      muted,
      width,
      height,
      displayStyle
    }
  },
});
</script>

<template>
  <div :class="classes" :style="displayStyle">
    <template v-if="src">
      <video v-bind="$attrs" :src="src" :autoplay="autoPlay" :muted="muted" :controls="false" playsinline class="video" :style="styles" />
    </template>
    <div v-else class="no-video">
      <MoEmpty description="暂无视频，请上传" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './index.scss';
</style>

