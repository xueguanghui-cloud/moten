<script setup lang="ts">
import { mediaUploadApi } from '@/api/media';
import type { UploadProps, UploadRequestOptions } from 'element-plus';
import { ElMessage } from 'element-plus';
import { computed } from 'vue';

const props = defineProps({
  type: {
    type: String,
    default: 'image',
    validator(val: string) {
      return ['image', 'video'].includes(val)
    },
  },
})
const emit = defineEmits(['callback', 'update'])

const model = defineModel({type: Array, default: () => []})
const isVideo = computed(() => props.type === 'video')
const listType = computed(() => isVideo.value ? 'text' : 'picture-card')



const handleFileUpload = async (e: UploadRequestOptions ) => {
  const formData = new FormData()
  formData.append('file', e.file)
  const { status, data, messages } = await mediaUploadApi(formData)
  if(!status) {
    return ElMessage.error('上传失败' + messages)
  }
  
  if(data.url) model.value = [{
    name: e.file.name,
    url: data.url
  }]
}

const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles)  => {
  model.value = []
}

const handleChange: UploadProps['onRemove'] = (uploadFile, uploadFiles)  => {
}
</script>

<template>
  <el-upload :file-list="model" ref="upload" :limit="1" :list-type="listType" style="width: 100%;"
    :http-request="handleFileUpload" :on-remove="handleRemove" :on-change="handleChange" :class="{ 'is-hidden': model.length }" >
    <template #trigger>
      <el-button type="primary" size="small" class="upload-btn" v-if="isVideo">上传</el-button>
      <v-icon icon="upload" class="icon" v-else />
    </template>
  </el-upload>
</template>

<style lang="scss" scoped>
.is-error {
  :deep(.el-upload--picture-card) {
    border: 1px dashed var(--el-color-danger);
  }
}

.icon {
  width: 26px;
  height: 26px;
}

.is-hidden {
  :deep(.el-upload--picture-card) {
    display: none;
  }
}
</style>
