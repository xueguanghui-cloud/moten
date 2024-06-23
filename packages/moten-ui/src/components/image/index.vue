<script lang="ts">
import { props } from './props'
import { defineComponent, computed, toRefs } from "vue";
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
    const { data, viewport } = toRefs(props)
    const classes = computed(() => [n()])
    const display = computed(() => {
      const display = data.value?.display?.[viewport.value]
      return typeof display === 'boolean' ? display : true
    })
    const src = computed(() => data.value?.src?.[viewport.value] || '')
    const link = computed(() => data.value?.link?.[viewport.value] || '')
    const width = computed(() => data.value?.width?.[viewport.value] || '')
    const height = computed(() => data.value?.height?.[viewport.value] || '')
    const styles = computed(() => ({ width: width.value, height: height.value }))

    return {
      classes,
      styles,
      display,
      src,
      link,
      width,
      height
    }
  },
});
</script>

<template>
  <div :class="classes">
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
