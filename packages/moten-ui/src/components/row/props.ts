import { ComponentViewport } from "@/types/components";
import { PropType } from "vue-demi";

export type MoRowPropsData = {
  /**
   * 屏幕信息
   */
  display?: {
    desktop: number[];
    mobile: number[];
  };
  /**
   * 背景
   */
  background: {
    desktop: string;
    mobile: string;
  };
};

export type MoRowPropsList = any[][];

export const props = {
  data: {
    type: Object as PropType<MoRowPropsData>,
    default: () => ({
      display: {
        desktop: "",
        mobile: "",
      },
      background: {
        desktop: "",
        mobile: "",
      },
    }),
  },
  children: {
    type: Array as PropType<MoRowPropsList>,
    default: () => [[]],
  },
  viewport: {
    type: String as PropType<ComponentViewport>,
    default: "desktop",
    validator(val: string) {
      return ["desktop", "mobile"].includes(val);
    },
  },
};
