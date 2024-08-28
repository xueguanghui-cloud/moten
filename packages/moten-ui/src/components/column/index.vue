<template>
  <div :class="classes" :style="styles">
    <div class="item" v-for="(item, index) in cols" :key="index" :style="itemStyle(item)">
      <slot :item="itemComputed(index)"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { createNameSpace } from "@/utils/components";
import { props } from "./props";

const { name, n } = createNameSpace("column");

export default {
  name,
  props,
  data() {
    return {
      // 如果需要的话，可以在这里添加响应式数据
    };
  },
  computed: {
    classes() {
      return [n()];
    },
    itemComputed() {
      return (index: number) => this.children?.[index] || [];
    },
    cols() {
      return this.data?.cols?.[this.viewport] || [0.5, 0.5];
    },
    background() {
      return this.data?.background?.[this.viewport] || "";
    },
    styles() {
      return { background: this.background };
    },
  },
  methods: {
    itemStyle(item: string | number) {
      return {
        width: Number(item) * 100 + "%",
      };
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
