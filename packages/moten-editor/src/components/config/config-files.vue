<script setup lang="ts">
import { ref, toRefs, watch } from 'vue'
import { ElMessage, type UploadUserFile } from 'element-plus'
import { mediaUploadApi } from '@/api/media'
import type { UploadProps, UploadRequestOptions } from 'element-plus'

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
    // formItem?.validate('change').catch((err) => console.log(err))
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

// const fileClick = () => {
//   const list = [
//     'https://gips2.baidu.com/it/u=600796006,4247107674&fm=3042&app=3042&f=JPEG&wm=1,huayi,0,0,13,9&wmo=0,0',
//     'https://gips2.baidu.com/it/u=195724436,3554684702&fm=3028&app=3028&f=JPEG&fmt=auto?w=1280&h=960',
//     'https://gips0.baidu.com/it/u=3554802836,624793446&fm=3042&app=3042&f=JPEG&wm=1,huayi,0,0,13,9&wmo=0,0',
//     'https://gips2.baidu.com/it/u=3681636179,223758822&fm=3042&app=3042&f=JPEG&wm=1,huayi,0,0,13,9&wmo=0,0',
//   ]
//   const randomIndex = Math.floor(Math.random() * list.length)
//   fileList.value = list[randomIndex]
// }

const handleFileUpload = async (e: UploadRequestOptions ) => {
  const formData = new FormData()
  formData.append('file', e.file)
  const { status, data, messages } = await mediaUploadApi(formData)
  if(!status) {
    return ElMessage.error('上传失败' + messages)
  }
  if(data.url) fileList.value = [{
    name: 'file',
    url: data.url
  }]
}

const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles)  => {
  fileList.value = []
}
</script>

<template>
  <div class="config-files">
    <el-form-item :label="title" :prop="key + '.' + viewport">
      <!-- <img v-if="src" :src="src" class="image" @click="fileClick" />
      <div v-else class="file" @click="fileClick">
        <v-icon icon="upload" class="icon" />
      </div> -->
      <el-upload
        v-model:file-list="fileList"
        ref="upload"
        :limit="1"
        list-type="picture-card"
        :http-request="handleFileUpload"
        :on-remove="handleRemove"
        :class="{'is-hidden': fileList.length}"
      >
        <template #trigger>
          <v-icon icon="upload" class="icon" />
        </template>
      </el-upload>
      
      <el-input v-model="fileList" style="display: none" />
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
  .icon {
    width: 26px;
    height: 26px;
  }
  .is-hidden{
    :deep(.el-upload--picture-card) {
      display: none;
    }
  }
}
</style>
