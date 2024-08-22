import { ComponentViewport } from "@/types/components";
import { PropType } from "vue-demi";
import { MoTextSchema } from "./schema";

export type MoTextPropsData = {
  /**
   * 文本是否在对应屏幕显示
   */
  display?: {
    desktop: string;
    mobile: string;
  };
  /**
   * 文本
   */
  text?: {
    desktop: string;
    mobile: string;
  };
};

export const props = {
  data: {
    type: Object as PropType<MoTextSchema>,
    default: () => ({
      display: {
        desktop: "",
        mobile: "",
      },
      text: {
        desktop: "",
        mobile: "",
      },
    }),
  },
  viewport: {
    type: String as PropType<ComponentViewport>,
    default: "desktop",
    validator(val: string) {
      return ["desktop", "mobile"].includes(val);
    },
  },
};
