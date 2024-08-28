<template>
  <div :class="classes" :style="[displayStyle, styles]">
    <div class="item">
      <slot :item="itemComputed"></slot>
    </div>
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
    return {
      platform: localStorage.getItem("$platform") || "user",
    };
  },
  computed: {
    classes() {
      return [n()];
    },
    itemComputed() {
      return this.children[0] || [];
    },
    display() {
      const display = this.data?.display?.[this.viewport];
      return typeof display === "boolean" ? display : true;
    },
    background() {
      return this.data?.background?.[this.viewport] || "";
    },
    styles() {
      return { background: this.background };
    },
    displayStyle() {
      if (this.platform === "editor") {
        return !this.display ? { opacity: 0.4, filter: "brightness(0.7)" } : {};
      } else {
        return !this.display ? { display: "none" } : {};
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
