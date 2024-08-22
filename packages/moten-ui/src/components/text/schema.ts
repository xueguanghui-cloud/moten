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
const text = Type.String({
  code: "config-text",
  title: "文本",
  default: "",
});
const schema = Type.Object({
  display: schemaAllViewport(display),
  text: schemaAllViewport(text),
});

export type MoTextSchema = Static<typeof schema>;

export default schema;
