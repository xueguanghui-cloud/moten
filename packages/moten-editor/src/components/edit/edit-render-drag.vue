<template>
  <draggable
    :list="list"
    :group="group"
    :sort="sort"
    animation="200"
    item-key="id"
    ghost-class="ghost-class"
    class="edit-render-drag"
    :move="move"
    @click="console.log(list)"
  >
    <template #item="{ element }">
      <div class="element">
        <div
          v-if="element.nested && level < 2"
          class="block-nested-render"
          :class="activeClass(element)"
          @click.stop="edit.setCurrentSelect(element)"
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
              style="transform: translateX(-50%) translateY(-10px);"
            />
          </transition>
          <component
            :key="element.id"
            :is="renderComponentCode(element)"
            :data="element.formData"
            :children="element.children"
            :viewport="edit.viewport"
          >
            <template #default="{ item, index }">
              <edit-render-canvas
                v-if="element.code === 'canvas'"
                :key="element.id + '-canvas-' + index"
                :list="item"
                :parent="element.code"
                class="nested-item"
              />
              <edit-render-drag
                v-else
                :key="element.id + '-' + index"
                :list="item"
                :level="level + 1"
                :group="group"
                :parent="element.code"
                class="nested-item"
                :class="nestedClass"
              />
            </template>
          </component>
        </div>
        <div
          v-else
          class="block-render"
          :class="activeClass(element)"
          @click.stop="edit.setCurrentSelect({...element, parent})"
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
  </draggable>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useEditStore } from '@/stores/edit'
import { findNodeById, move, nestedClass, replaceNodeId } from './nested'
import { COMPONENT_PREFIX } from '@/config'
import type { BaseBlock } from '@/types/edit'

const edit = useEditStore()

defineOptions({
  name: 'edit-render-drag',
})

defineProps({
  list: {
    type: Array,
    required: true,
    default: () => [],
  },
  group: {
    type: [String, Object],
    default: 'group',
  },
  sort: {
    type: Boolean,
    default: true,
  },
  level: {
    type: Number,
    default: 1,
  },
  parent: {
    type: String,
    default: ''
  }
})

const hoverId = ref('')

const renderComponentCode = computed(() => {
  return (element: { code: string }) => {
    return COMPONENT_PREFIX + '-' + element.code
  }
})
const activeClass = computed(() => {
  return (element: { id: string }) => {
    const id = edit.currentSelect?.id || ''
    return { 'is-active': element.id === id }
  }
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
  /* background: var(--color-edi t-render-block-bg); */
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
