<script setup lang="ts">
import { ref, watch, computed } from 'vue'
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

const update = (params: any) => {
  const list = Object.entries(params || {})
  list.forEach(([key, value]) => {
    form.value[key] = value
  })
}

const inCanvas = computed(() => edit.currentSelect?.parent === 'canvas')
const itemCanvas = (item) => item?.properties?.[edit.viewport]?.inCanvas
const transfer = (b, key = 'default'): void => {
  return Object.fromEntries(
    Object.entries(b.properties).map((item: any) => {
      const [keyP, valueP] = item
      if (valueP.properties) return [keyP, transfer(valueP, key)]
      return [keyP, valueP[key]]
    }),
  )
}
const rules = ref(transfer(props.schema, 'rules'))

const submitForm = () => {
  setTimeout(() => {
    if (!ruleFormRef.value) return
    ruleFormRef.value.validate((valid: any, fields: any) => {
      // if (valid) {
      //   console.warn('form submit!')
      //   return
      // }
      // console.warn('form error !', fields)
    })
  }, 100)
}

submitForm()
watch(
  () => props.list,
  () => {
    submitForm()
  },
)

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
    <el-form label-width="auto" ref="ruleFormRef" :model="form" :rules="rules">
      <transition-group name="fade">
        <div v-for="(item, index) in list" :key="index">
          <component
            v-if="
              (!itemCanvas(item) && getComponent(item)) ||
              (itemCanvas(item) && inCanvas && getComponent(item))
            "
            :is="getComponent(item)"
            :data="item"
            :viewport="edit.viewport"
            @callback="callback"
            @update="update"
          />
        </div>
      </transition-group>
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
