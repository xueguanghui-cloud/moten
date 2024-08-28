<template>
 <component
      :is="renderComponentCode(element)"
      v-for="(element, index) in block"
      :key="index"
      :data="element.formData"
      :viewport="viewport"
      :children="element.children"
      :parent="element.parent"
    >
      <template #default="{item}">
        <mo-container-child :block="item" :viewport="viewport" />
      </template>
        
    </component>
</template>

<script lang="ts">
import { createNameSpace, renderComponentCode } from "@/utils/components";
import { BaseBlock, ComponentViewport } from '@/types/components'
import { PropType } from "vue-demi";

const { name } = createNameSpace("container-child");

export default {
  name,
  props: {
    block: {
      type: Array as PropType<BaseBlock[]>,
      default: () => []
    },
    viewport: {
      type: String as PropType<ComponentViewport>,
      default: "desktop",
      alidator(val: string) {
        return ["desktop", "mobile"].includes(val);
      },
    }
  },
  methods: {
    renderComponentCode,
  },
}
</script>