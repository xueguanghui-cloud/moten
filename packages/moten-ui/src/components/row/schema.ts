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

const schema = Type.Object({
  display: schemaAllViewport(display),
  background: schemaAllViewport(background),
});

export type MoRowSchema = Static<typeof schema>;

export default schema;
