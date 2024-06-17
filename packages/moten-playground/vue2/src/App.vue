<template>
  <div id="app">
    <MoImage src="https://vitejs.dev/logo-with-shadow.png" />
  </div>
</template>

<script>
import moten from '@moten/ui/vue2'
const {MoImage} = moten

export default {
  name: 'App',
  components: {
    MoImage
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
