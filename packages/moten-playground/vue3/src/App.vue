<script setup lang="ts">
import moten from '@moten/ui'
import { ref } from 'vue'

const { MoImage } = moten

const width = ref('')
const changeWidth = () => {
  width.value = '500px'
}
</script>

<template>
  <div class="container" :style="{ width: width }">
    <MoImage src="https://vitejs.dev/logo-with-shadow.png" @click="changeWidth" />
  </div>
</template>

<style scoped>
.container {
  container-type: inline-size;
  width: 100vw;
}
</style>
