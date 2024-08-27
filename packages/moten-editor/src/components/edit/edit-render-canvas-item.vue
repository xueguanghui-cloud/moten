<template>
  <div ref="el" class="element" :style="[elementStyle]">
    <div
      class="block-render"
      :class="activeClass(element)"
      @click.stop="!isDraggingTemp && edit.setCurrentSelect({ ...element, parent })"
      @mouseup="resetDragging"
      @mouseenter="hoverId = element.id"
      @mouseleave="hoverId = ''"
    >
    <transition name="fade">
      <edit-render-hover
        v-show="hoverId === element.id"
        :id="element.id"
        :name="element.name"
        @copy="copy"
        @clear="clear"
      />
    </transition>
    <component
      :is="renderComponentCode(element)"
      :data="element.formData"
      :viewport="edit.viewport"
      :parent="parent"
    />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch, type PropType } from 'vue'
import { useEditStore } from '@/stores/edit'
import { findNodeById, replaceNodeId } from './nested'
import { COMPONENT_PREFIX } from '@/config'
import type { BaseBlock } from '@/types/edit'
import { useDraggable } from '@vueuse/core'
import { cloneDeep, debounce } from 'lodash'
import { sleep } from '@/utils'

const edit = useEditStore()
const props = defineProps({
  element: {
    type: Object as PropType<BaseBlock>,
    required: true,
    default: () => {}
  },
  parent: {
    type: String,
    default: ''
  },
  box: {
    type: Object as PropType<HTMLElement>,
    default: null
  }
})

const hoverId = ref('')

const renderComponentCode = computed(()=>{
  return (element: BaseBlock) => {
    return COMPONENT_PREFIX + '-' + element.code
  }
})

const activeClass = computed(() => {
  return (element: { id: string }) => {
    const id = edit.currentSelect?.id || ''
    return { 'is-active': element.id === id }
  }
})

const el = ref<HTMLElement | null>(null)
const isDisabled = computed(() => edit.currentSelect?.id !== props.element.id)
const isDraggingTemp = ref(false)
// 不能使用useDraggable的isDragging，否则 click 放手一瞬间 isDragging 也会变成false
const {x, y, style, isDragging} = useDraggable(el, {
  stopPropagation: true,
  initialValue: { x: 0, y: 0 },
  containerElement: props.box,
  disabled: isDisabled
})

watch(isDragging, (val) => {
  if(!val) isDraggingTemp.value = true
})
 
const resetDragging = async () => {
  await sleep(500)
  isDraggingTemp.value = false
}

// 是否同步，表示当我们拖拽移动时，并不希望监听props.element里面的再次执行，避免死循环
const isSynced = ref(false)

// 监听 style 变化，将拖动后的数据存储打store去
watch(style, debounce(()=>{
  if(!edit.currentSelect?.id || edit.currentSelect?.id !== props.element.id) return
  const newBlockConfig = findNodeById(edit.blockConfig, edit.currentSelect.id!, (params) => {
      const { array, node, index } = params
      const newNode = cloneDeep(node)
      if (newNode.formData && edit.currentSelect.formData) {
        newNode.formData.top[edit.viewport] = y.value + 'px'
        newNode.formData.left[edit.viewport] = x.value + 'px'
      }
      array[index] = newNode
      edit.setCurrentSelect(newNode)
      isSynced.value = true
    })
    edit.setBlockConfig(newBlockConfig)
}, 300))

// 监听 element 变化，将配置区域的修改的信息赋值到x和y,以实现通过配置去移动组件
watch(()=>props.element, (element)=>{
  if(isSynced.value) {
    isSynced.value = false
    return
  }
  if(!element?.formData?.top?.[edit.viewport]) return
  if(!element?.formData?.left?.[edit.viewport]) return
  y.value = element?.formData?.top?.[edit.viewport]?.replace('px', '')
  x.value = element?.formData?.left?.[edit.viewport]?.replace('px', '')
}, { immediate: true })

// 监听 viweport 变化，将当前元素位置信息进行赋值
watch(()=>edit.viewport, () => {
  if(!props.element?.formData?.top?.[edit.viewport]) return
  if(!props.element?.formData?.left?.[edit.viewport]) return
  y.value = props.element?.formData?.top?.[edit.viewport]?.replace('px', '')
  x.value = props.element?.formData?.left?.[edit.viewport]?.replace('px', '')
})

const elementStyle = computed(()=>{
  return [
    {
      width: 'fit-content',
      position: 'absolute',
      transform: `translate3d(${x.value}px, ${y.value}px, 0)`
    }
  ]
})

const handleNodeById = (arr: BaseBlock[], nodeId: string, type: 'copy' | 'clear') => {
  return findNodeById(arr, nodeId, (params) => {
    const { array, node, index } = params
    if (type === 'copy') array.splice(index, 0, replaceNodeId(node))
    if (type === 'clear') array.splice(index, 1)
  })
}
const copy = (id: string) => {
  if (!edit.blockConfig?.length) return
  const newBlockConfig = handleNodeById(edit.blockConfig, id, 'copy')
  edit.setCurrentSelect({})
  edit.setBlockConfig(newBlockConfig)
}
const clear = (id: string) => {
  if (!edit.blockConfig?.length) return
  const newBlockConfig = handleNodeById(edit.blockConfig, id, 'clear')
  edit.setCurrentSelect({})
  edit.setBlockConfig(newBlockConfig)
}
</script>


<style lang="scss" scoped>
.edit-render-drag {
  width: 100%;
  height: 100%;
  .element {
    position: relative;
  }
}
.nested-item {
  border: 1px solid var(--color-edit-render-block-border);
  //   background: var(--color-edit-render-block-bg);
  height: 100%;
  min-height: inherit;
  & + .nested-item {
    border-left: 0;
  }
}
.block-nested-render,
.block-render {
  cursor: grab;
  &:active {
    cursor: grabbing;
  }
}
.block-nested-render {
  &:hover,
  &.is-active {
    // 注意不能像block-render做成after，否则组件无法拖入嵌套容器里
    border: 1px dashed var(--color-edit-render-block-border-hover);
  }
}
.block-render {
  position: relative;
  &:hover,
  &.is-active {
    // 在表面蒙上一层，加上边框，防止组件可以交互
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      border: 1px dashed var(--color-edit-render-block-border-hover);
    }
  }
}
</style>
