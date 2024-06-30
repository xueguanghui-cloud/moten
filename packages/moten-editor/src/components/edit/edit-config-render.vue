<script setup lang="ts">
import { ref } from 'vue'
import { useEditStore } from '@/stores/edit'
import { batchDynamicComponents } from '@/utils/index'
const edit = useEditStore()

const emit = defineEmits(['callback'])
const props = defineProps({
  list: {
    type: Array,
    default: () => [],
  },
  schema: {
    type: Object,
    default: () => {},
  },
})

const ruleFormRef = ref()
const form = ref<any>({})

const callback = (data: any) => {
  emit('callback', data)
}

const getComponent = (item: any) => {
  const code = item.properties[edit.viewport].code
  return batchDynamicComponents(code, import.meta.glob('@/components/config/**/*.vue'))
}
</script>

<template>
  <div class="edit-config-render">
    <el-form label-width="auto" ref="ruleFormRef">
      <div v-for="(item, index) in list" :key="index">
        <component
          v-if="getComponent(item)"
          :is="getComponent(item)"
          :data="item"
          :viewport="edit.viewport"
          @callback="callback"
        />
      </div>
    </el-form>
  </div>
</template>

<style lang="scss" scoped>
.edit-config-render {
  overflow-y: auto;
  width: 100%;

  :deep(.el-form) {
    padding-left: 14px;
    padding-right: 14px;
    padding-bottom: 14px;
  }
  :deep(.el-form-item__label) {
    justify-content: flex-start;
  }
}
</style>
