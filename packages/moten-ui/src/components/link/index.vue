<script lang="ts">
import { props } from "./props";
import { createNameSpace } from "@/utils/components";

const { name, n } = createNameSpace("link");

export default {
  name,
  props,
  data() {
    return {
      classes: [n()],
    };
  },
  computed: {
    isExternalLink() {
      return this.to.match(/^(http:\/\/|https:\/\/|javascript:.*|tel:.*|mailto:.*)/);
    },
    tag() {
      if (!this.to) return "span";
      return this.isExternalLink ? "a" : "router-link";
    },
  },
};
</script>

<template>
  <component :is="tag" :class="classes" v-bind="$attrs" :href="to" :to="to" :target="target">
    <slot />
  </component>
</template>

<style lang="scss" scoped>
@import "./index.scss";
</style>
