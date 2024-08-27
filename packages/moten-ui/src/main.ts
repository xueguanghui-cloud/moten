// import './style.css'
import "@/assets/style/index.scss";
import { App } from "vue-demi";

import MoImage from "@/components/image";
import MoColumn from "@/components/column";
import MoText from "@/components/text";
import MoRow from "@/components/row";
import MoVideo from "@/components/video";
import MoCanvas from "@/components/canvas";

import imageSchema from "./components/image/schema";
import columnSchema from "./components/column/schema";
import textSchema from "./components/text/schema";
import rowSchema from "./components/row/schema";
import videoSchema from "./components/video/schema";
import canvasSchema from "./components/canvas/schema";
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

const components = [MoImage, MoColumn, MoText, MoRow, MoVideo, MoCanvas];

const install = (app: App, options: { platform: "editor" | "user" }) => {
  components.forEach((component) => {
    const { name } = component;
    if (name) app.component(name, component);
  });
  app.provide("platform", options.platform); // 用于区分当前宿主环境（编辑器/用户）
};

export default { install, MoImage, MoColumn, MoText, MoRow, MoVideo, MoCanvas };

export const schemaAllViewport = _schemaAllViewport;
export const COMPONENT_PREFIX = _COMPONENT_PREFIX;
