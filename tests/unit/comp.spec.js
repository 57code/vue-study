import Vue from 'vue';
import KaikebaComp from "@/components/Kaikeba.vue";
import {mount} from '@vue/test-utils'

describe("KaikebaComp", () => {
  // 检查原始组件选项
  it("由created生命周期", () => {
    expect(typeof KaikebaComp.created).toBe("function");
  });

  // 评估原始组件选项中的函数的结果
  it("初始data是vue-text", () => {
    // 检查data函数存在性
    expect(typeof KaikebaComp.data).toBe("function");
    // 检查data返回的默认值
    const defaultData = KaikebaComp.data();
    expect(defaultData.message).toBe("hello!");
  });

  it("mount之后测data是开课吧", () => {
    const vm = new Vue(KaikebaComp).$mount();
    expect(vm.message).toBe("开课吧");
  });

  it("按钮点击后", () => {
    const wrapper = mount(KaikebaComp);
    wrapper.find("button").trigger("click");
    // 测试数据变化
    expect(wrapper.vm.message).toBe("按钮点击");
    // 测试html渲染结果
    expect(wrapper.find("span").html()).toBe("<span>按钮点击</span>");
    // 等效的方式
    expect(wrapper.find("span").text()).toBe("按钮点击");
});
});
