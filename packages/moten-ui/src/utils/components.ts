import { App } from "vue-demi";
import { TSchema, Type } from "@sinclair/typebox";
export const schemaAllViewport = <T extends TSchema>(params: T) => {
  return Type.Object({
    desktop: params,
    mobile: params,
  });
};

/**
 * 组件安装，组件加上install函数
 * @param component
 * @returns
 */
export function withInstall(component: any) {
  component.install = function (app: App) {
    const { name } = component;
    if (name) app.component(name, component);
  };
  return component;
}
