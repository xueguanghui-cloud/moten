<script setup lang="ts">
import { type UploadUserFile } from 'element-plus';
import { ref, toRefs, watch } from 'vue';

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
const fileList = ref<UploadUserFile[]>([])

watch(
  () => formData,
  (value) => {
    const val = value?.[props.viewport] || defaultValue
    if(val) fileList.value = [{ name: 'file', url: val }]
  },
  {
    immediate: true,
  },
)

watch(
  fileList,
  (value) => {
    let data = {}
    const _value = value?.[0]?.url || ''

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
  <div class="config-files">
    <el-form-item :label="title" :prop="key + '.' + viewport">
      <v-upload v-model="fileList"/>
    </el-form-item>
  </div>
</template>

<style lang="scss" scoped>
.config-files {
  .file,
  .image {
    width: 80px;
    height: 80px;
    box-shadow: 0 0 0 1px var(--color-border) inset;
    border-radius: var(--border-radius);
    background: var(--color-config-block-bg);
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
  .is-error {
    .file,
    .image {
      box-shadow: 0 0 0 1px var(--el-color-danger) inset;
    }
  }
  .image {
    border: 0;
    width: 82px;
    height: 82px;
    object-fit: cover;
  }
}
</style>
