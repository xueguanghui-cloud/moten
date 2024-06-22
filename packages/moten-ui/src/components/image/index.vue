<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "MoImage",
  props: {
    src: {
      type: String,
      default: "",
    },
  },
  emits: ["click"],
  setup() {
    return {
      value: 1111,
    };
  },
  mounted() {
    console.warn(this.value);
  },
});
</script>

<template>
  <div class="" @click="$emit('click')">
    <h1 class="title">Hello world!</h1>
    <img :src="src" alt="" class="image" />
  </div>
</template>

<style scoped lang="scss">
.image {
  width: 300px;
  height: 300px;
}
.title {
  font-size: 50px;
  color: #f00;
}

@container (max-width: 600px) {
  .title {
    font-size: 20px;
    color: #00f;
  }
}
</style>
