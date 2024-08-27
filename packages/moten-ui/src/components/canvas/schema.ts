import { schemaAllViewport } from "@/utils/components";
import { Static, Type } from "@sinclair/typebox";

const display = Type.Boolean({
  code: "config-viewport",
  title: "屏幕",
  default: true,
  errorMessage: {
    required: "选择一项即可",
  },
  rules: [{ required: true, message: "选择一项即可", trigger: "change" }],
});

const background = Type.String({
  code: "config-color",
  title: "背景",
  default: "",
});

const height = Type.String({
  code: "config-input",
  title: "高度",
  default: "350px",
  placeholder: "请输入高度",
  minLength: 1,
  errorMessage: {
    required: "最少1一个字符",
    minLength: "最少一个字符",
  },
  rules: [{ required: true, min: 1, message: "最少1个字符", trigger: "change" }],
});

const schema = Type.Object({
  display: schemaAllViewport(display),
  background: schemaAllViewport(background),
  height: schemaAllViewport(height),
});

export type MoCanvasSchema = Static<typeof schema>;

export default schema;
