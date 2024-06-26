// import './style.css'
import "@/assets/style/index.scss";
import { App } from "vue-demi";

import MoImage from "@/components/image";
import MoColumn from '@/components/column'

import imageSchema from "./components/image/schema";
import columnSchema from "./components/column/schema";
import { schemaAllViewport as _schemaAllViewport } from "./utils/components";
import { COMPONENT_PREFIX as _COMPONENT_PREFIX } from '@/config'

export const schema = {
  image: imageSchema,
  column: columnSchema
};

const components = [MoImage, MoColumn];

const install = (app: App, options: {platform: 'editor' | 'user'}) => {
  components.forEach((component) => {
    const { name } = component;
    if (name) app.component(name, component);
  });
  app.provide('platform', options.platform) // 用于区分当前宿主环境（编辑器/用户）
};

export default { install, MoImage, MoColumn};

export const schemaAllViewport = _schemaAllViewport;
export const COMPONENT_PREFIX = _COMPONENT_PREFIX;
