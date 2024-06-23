<script lang="ts">
import { props } from './props'
import { defineComponent, computed, toRefs } from "vue-demi";
import { createNameSpace } from "@/utils/components"

const { name, n } = createNameSpace('link')

export default defineComponent({
  name,
  props,
  setup(props) {
    const { to, target } = toRefs(props)
    const classes = computed(() => [n()])
    const isExternalLink = computed(() => {
      return to.value.match(/^(http:\/\/|https:\/\/|javascript:.*|tel:.*|mailto:.*)/)
    })
    const tag = computed(() => {
      if (to.value) return 'span'
      return isExternalLink.value ? 'a' : 'router-link'
    })
    return {
      classes,
      tag,
      target,
      to,
    }
  },
});
</script>

<template>
  <component :is="tag" :class="classes" v-bind="$attrs" :href="to" :to="to" :target="target">
    <slot />
  </component>
</template>

<style lang="scss" scoped>
@import './index.scss';
</style>