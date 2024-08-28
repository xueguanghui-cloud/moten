import { BaseBlock, ComponentViewport } from "@/types/components";
import { PropType } from "vue-demi";

export type MoContainerPropsContent = {
  block: BaseBlock[];
  page: any;
};

export type MoRowPropsList = any[][];

export const props = {
  content: {
    type: Object as PropType<MoContainerPropsContent>,
    default: () => {},
  },
  viewport: {
    type: String as PropType<ComponentViewport>,
    default: "desktop",
    alidator(val: string) {
      return ["desktop", "mobile"].includes(val);
    },
  },
};
