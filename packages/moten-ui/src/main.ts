// import './style.css'
import "@/assets/style/index.scss";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import { App } from "vue-demi";

import MoImage from "@/components/image";
import MoColumn from "@/components/column";
import MoText from "@/components/text";
import MoRow from "@/components/row";
import MoVideo from "@/components/video";
import MoCanvas from "@/components/canvas";
import MoContainer from "@/components/container";
import MoContainerChild from "@/components/container/child.vue";

import imageSchema, { type MoImageSchema } from "./components/image/schema";
import columnSchema, { type MoColumnSchema } from "./components/column/schema";
import textSchema, { type MoTextSchema } from "./components/text/schema";
import rowSchema, { type MoRowSchema } from "./components/row/schema";
import videoSchema, { type MoVideoSchema } from "./components/video/schema";
import canvasSchema, { type MoCanvasSchema } from "./components/canvas/schema";

import { schemaAllViewport as _schemaAllViewport } from "./utils/components";
import { COMPONENT_PREFIX as _COMPONENT_PREFIX } from "@/config";

export const schema = {
  image: imageSchema,
  column: columnSchema,
  text: textSchema,
  row: rowSchema,
  video: videoSchema,
  canvas: canvasSchema,
};

export type MoComponentSchema = {
  image: MoImageSchema;
  column: MoColumnSchema;
  text: MoTextSchema;
  row: MoRowSchema;
  video: MoVideoSchema;
  canvas: MoCanvasSchema;
};

const componentGroup = { MoImage, MoColumn, MoText, MoRow, MoVideo, MoCanvas, MoContainer, MoContainerChild };

export const schemaAllViewport = _schemaAllViewport;
export const COMPONENT_PREFIX = _COMPONENT_PREFIX;

const components = Object.values(componentGroup);
const install = (app: App, options: { platform: "editor" | "user" }) => {
  components.forEach((component) => {
    const { name } = component;
    if (name) app.component(name, component);
  });
  localStorage.setItem("$platform", options.platform);
};

export default {
  install,
  ...componentGroup,
};
