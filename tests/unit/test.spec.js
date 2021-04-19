import { mount } from "@vue/test-utils";
import HelloWorld from '@/components/HelloWorld.vue'

function add(a, b) {
  // dfjdfjfj
  return a + b;
}

// 套件
describe("测试add函数", () => {
  // 用例
  it("传递都是数字", () => {
    // 断言
    expect(add(1, 3)).toBe(4);
    expect(add(1, -3)).toBe(-2);
  });

  it("传递都包含字符串", () => {
    // 断言
    // expect(add(1,'3')).toBe(4)
  });
});

describe("测试HelloWorld.vue", async () => {
  it("传入属性能够正常渲染", () => {
    const msg = 'hello'
    // 挂载组件
    const wrapper = mount(HelloWorld, {
      propsData: {
        msg
      }
    })

    // 查找得到的h1
    const h1 = wrapper.find('h1')
    expect(h1.text()).toBe(msg)

    // const p1 = wrapper.find('.p1')
    // await p1.trigger('click')
    // expect(p.text()).toBe(msg)

    // const comp =  wrapper.findComponent({name: 'comp'})    
    // comp.xxx
  });
});
