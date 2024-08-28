<script setup lang="ts">
import { ref } from 'vue'
import {useRouter} from 'vue-router'
import moten from '@moten/ui'
const router = useRouter()

const { MoContainer } = moten

const data = ref({
  src: {
    desktop: 'https://vitejs.dev/logo-with-shadow.png',
    mobile: 'https://vitejs.dev/logo-with-shadow.png'
  }
})

const content = ref({
  page: {
    title: {
      moblie: '',
      desktop: ''
    },
    keywords: {
      moblie: '',
      desktop: ''
    },
    backgroound: {
      moblie: '#FBCBD7',
      desktop: '#FBCBD7'
    },
    description: {
      moblie: '',
      desktop: ''
    },
  },
  block: {}
})

const newContent: any = router.currentRoute.value.query.content
if(newContent) content.value = JSON.parse(newContent)
console.log(content.value);

</script>

<template>
  <div class="container">
    <mo-container v-if="content.block" :content="content"></mo-container>
  </div>
</template>


<style scoped>
.container{
  width: 100%;
}
</style>