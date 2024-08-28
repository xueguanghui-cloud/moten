<script lang="ts">
import { props } from "./props";
import { createNameSpace } from "@/utils/components";
import noDataIcon from "@/assets/images/no-data.png";

const { name, n } = createNameSpace("empty");

export default {
  name,
  props,
  data() {
    return {
      classes: [n()],
    };
  },
  computed: {
    src() {
      return this.image || noDataIcon;
    },
  },
};
</script>

<template>
  <div :class="classes">
    <img :src="src" class="image" />
    <div class="description" v-html="description" />
  </div>
</template>

<style lang="scss" scoped>
@import "./index.scss";
</style>
