<script setup lang="ts">
import { ref, toRefs, watch } from 'vue'

const props = defineProps({
  data: {
    type: Object,
    default: () => {},
  },
  viewport: {
    type: String,
    default: 'desktop',
  },
})

const emit = defineEmits(['callback', 'update'])

const { data } = toRefs(props)
const { formData, key, id } = data.value
const { title, default: defaultValue } = data.value.properties[props.viewport]
const input = ref('')
const dialogVisible = ref(false)
const richRefs = ref<any>(null)

const textChange = () => {
  input.value = richRefs.value?.getHTML()
}

watch(
  () => formData,
  (value) => {
    input.value = value?.[props.viewport] || defaultValue
    richRefs.value?.setHTML(input.value)
  },
  {
    immediate: true,
  },
)

watch(
  input,
  (value) => {
    let data = {}
    const _value = value || ''
    if (Object.values(formData || {}).length < 2) {
      data = { desktop: _value, mobile: _value }
    } else {
      data = { [props.viewport]: _value }
    }

    emit('callback', {
      data: {
        [key]: data,
      },
      id,
    })
    emit('update', {
      [key]: data,
    })
  },
  { immediate: true },
)
</script>

<template>
  <div class="config-color">
    <el-form-item :label="title" :prop="key + '.' + viewport">
      <!-- <el-color-picker v-model="input"  /> -->
      
      <el-button plain @click="dialogVisible = true">
        设置
      </el-button>
      <el-dialog
        v-model="dialogVisible"
        title="富文本"
        width="1000"
        style="min-height: 600px;"
      >
        <QuillEditor ref="richRefs" theme="snow" toolbar="essential" @textChange="textChange" @bulr="textChange" style="height: 550px; width: 100%;" />
        <template #footer>
          <div class="dialog-footer">
            <el-button @click="dialogVisible = false">取消</el-button>
            <el-button type="primary" @click="dialogVisible = false">
              确认
            </el-button>
          </div>
        </template>
      </el-dialog>
    </el-form-item>
  </div>
</template>

<style lang="scss" scoped>
.config-color {
  position: relative;
}
</style>
