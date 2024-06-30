<template>
  <div class="edit-config-page">
    <edit-config-render :list="list" @callback="callback"> </edit-config-render>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useEditStore } from '@/stores/edit'
import { pageSchema } from '@/config/schema'
import deepmerge from 'deepmerge'

const edit = useEditStore()
const list = ref<(typeof properties)[keyof typeof properties][]>([])

const properties = pageSchema.properties

const listResult = Object.fromEntries(
  Object.entries(properties).map((itemChild) => {
    const [key, value] = itemChild as any
    return [key, { ...value, key, formData: edit.pageConfig || {} }]
  }),
)
list.value = [...Object.values(listResult)]

const callback = (params: { data: any }) => {
  const { data } = params
  const key = Object.keys(data)[0]
  const formData = edit.pageConfig || {}
  edit.setPageConfig(deepmerge.all([formData, data]))

  list.value.forEach((item) => {
    if (item.key === key) {
      const itemFormData = deepmerge.all([item?.formData || {}, data[key]])
      item.formData = itemFormData
      return
    }
  })
}
</script>

<style lang="scss" scoped>
.edit-config-page {
  width: 100%;
}
</style>
