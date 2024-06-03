<script  lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: "MoImage",
  props: {
    src: {
      type: String,
      default: ''
    }
  },
  setup() {
    return {
      value: 1111
    }
  },
  mounted() {
    console.warn(this.value)
  }
})
</script>

<template>
  <img :src="src" alt="" class="image">
</template>

<style scoped>
.image{
  width: 300px;
  height: 300px;
}
</style>