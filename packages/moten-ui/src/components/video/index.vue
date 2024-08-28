<script lang="ts">
import { props } from "./props";
import { createNameSpace } from "@/utils/components";
import MoEmpty from "../empty";

const { name, n } = createNameSpace("video");

export default {
  name,
  props,
  components: {
    MoEmpty,
  },
  data() {
    return {
      platform: localStorage.getItem("$platform") || "user",
    };
  },
  computed: {
    classes() {
      return [n()];
    },
    display() {
      const display = this.data?.display?.[this.viewport];
      return typeof display === "boolean" ? display : true;
    },
    src() {
      return this.data?.src?.[this.viewport] || "";
    },
    autoPlay() {
      return this.data?.autoPlay?.[this.viewport] || false;
    },
    muted() {
      return this.data?.muted?.[this.viewport] || false;
    },
    width() {
      return this.data?.width?.[this.viewport] || "";
    },
    height() {
      return this.data?.height?.[this.viewport] || "";
    },
    styles() {
      return { width: this.width, height: this.height };
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

<template>
  <div :class="classes" :style="displayStyle">
    <template v-if="src">
      <video
        v-bind="$attrs"
        :src="src"
        :autoplay="autoPlay"
        :muted="muted"
        :controls="false"
        playsinline
        class="video"
        :style="styles"
      />
    </template>
    <div v-else class="no-video">
      <MoEmpty description="暂无视频，请上传" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "./index.scss";
</style>
