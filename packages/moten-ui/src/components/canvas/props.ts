import { ComponentViewport } from "@/types/components";
import { PropType } from "vue-demi";

export type MoCanvasPropsData = {
  /**
   * 屏幕信息
   */
  display?: {
    desktop: string;
    mobile: string;
  };
  /**
   * 背景
   */
  background?: {
    desktop: string;
    mobile: string;
  };
  /**
   * 高度
   */
  height?: {
    desktop: string;
    mobile: string;
  };
};

export type MoCanvasPropsList = any[][];

export const props = {
  data: {
    type: Object as PropType<MoCanvasPropsData>,
    default: () => ({
      display: {
        desktop: "",
        mobile: "",
      },
      background: {
        desktop: "",
        mobile: "",
      },
      height: {
        desktop: "",
        mobile: "",
      },
    }),
  },
  children: {
    type: Array as PropType<MoCanvasPropsList>,
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
