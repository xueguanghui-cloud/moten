<template>
  <div id="app">
    <MoImage :data="data" />
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      data: {
        src: {
          desktop: "https://vitejs.dev/logo-with-shadow.png",
          mobile: "https://vitejs.dev/logo-with-shadow.png",
        },
      },
    };
  },
};
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
