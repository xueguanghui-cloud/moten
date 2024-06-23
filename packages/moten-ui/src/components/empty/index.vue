<script lang="ts">
import { props } from './props'
import { defineComponent, computed, toRefs } from "vue";
import { createNameSpace } from "@/utils/components"
import noDataIcon from '@/assets/images/no-data.png'

const { name, n } = createNameSpace('empty')

export default defineComponent({
  name,
  props,
  setup(props) {
    const { image, description } = toRefs(props)
    const classes = computed(() => [n()])
    const src = computed(() => image.value || noDataIcon)
    return {
      classes,
      src,
      description
    }
  },
});
</script>

<template>
  <div :class="classes">
    <img :src="src" class="image" />
    <div class="description" v-html="description" />
  </div>
</template>

<style lang="scss" scoped>
@import './index.scss';
</style>