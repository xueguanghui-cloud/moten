<template>
  <div :class="classes" :style="styles">
    <mo-container-child :block="block" :viewport="viewport" />
  </div>
</template>

<script lang="ts">
import { createNameSpace } from "@/utils/components";
import { props } from "./props";

const { name, n } = createNameSpace("row");

export default {
  name,
  props,
  data() {
    return {};
  },
  computed: {
    classes() {
      return [n()];
    },
    block() {
      return this.content?.block || [];
    },
    page() {
      return this.content?.page || {};
    },
    styles() {        
      return { background: this.content?.page?.background?.[this.viewport] };
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
