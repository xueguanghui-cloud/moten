<script lang="ts">
import { props } from './props'
import { defineComponent, computed, toRefs } from "vue";
import { createNameSpace } from "@/utils/components"

const { name, n } = createNameSpace('column')

export default defineComponent({
  name,
  props,
  setup(props) {
    const { data, viewport } = toRefs(props)
    const classes = computed(() => [n()])
    const src = computed(() => data.value?.src?.[viewport.value] || '')

    return {
      classes,
      src,
    }
  },
});
</script>

<template>
  <div :class="classes">
    
  </div>
</template>

<style lang="scss" scoped>
@import './index.scss';
</style>
