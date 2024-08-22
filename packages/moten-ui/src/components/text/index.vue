<script lang="ts">
import { props } from './props'
import { defineComponent, computed, toRefs, inject } from "vue";
import { createNameSpace } from "@/utils/components"
const { name, n } = createNameSpace('text')

export default defineComponent({
  name,
  props,
  setup(props) {
    const platform = inject('platform')
    const { data, viewport } = toRefs(props)
    const classes = computed(() => [n()])
    const display = computed(() => {
      const display = data.value?.display?.[viewport.value]
      return typeof display === 'boolean' ? display : true
    })
    const text = computed(() => data.value?.text?.[viewport.value] || '')
    const displayStyle = computed(()=>{
      if (platform === 'editor') {
        return !display.value ? { opacity: 0.4, filter: 'brightness(0.7)' } : {}
      } else {
        return !display.value ? { display: 'none' } : {}
      }
    })

    return {
      classes,
      text,
      display,
      displayStyle
    }
  },
});
</script>

<template>
  <div :class="classes" :style="displayStyle">
    <div v-html="text" class="text ql-editor" :class="{'no-value': !text}"></div>
  </div>
</template>

<style lang="scss" scoped>
@import './index.scss';
</style>

