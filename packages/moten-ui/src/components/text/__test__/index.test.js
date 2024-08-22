import { COMPONENT_PREFIX } from "@/config";
import Component from ".."; // .. ==> ../index.ts
import CurrentComponent from "../index.vue";
import { expect, describe, test } from "vitest";
import { mount } from "@vue/test-utils";
import { createApp } from "vue-demi";

const componentCode = "text";
const componentClass = `.${COMPONENT_PREFIX}-${componentCode}`;

describe(`${componentCode} 基本测试`, () => {
  test("测试组件名", () => {
    const app = createApp({}).use(Component);
    expect(app.component(Component.name || "")).toBeTruthy();
  });

  test("测试主要class", () => {
    const wrapper = mount(CurrentComponent);
    expect(wrapper.find(componentClass).classes()).toBeTruthy();
    wrapper.unmount();
  });

  describe("测试props", () => {
    test("测试text", () => {
      const text = "<p>1</p>";
      const wrapper = mount(CurrentComponent, {
        props: {
          data: {
            text: {
              desktop: text,
              mobile: text,
            },
          },
        },
      });

      expect(wrapper.find(componentClass + " .text").innerHTML).toContain(text);
      wrapper.unmount();
    });
  });
});
