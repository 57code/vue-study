import Kaikeba from '@/components/Kaikeba.vue'
import { mount } from '@vue/test-utils'

function add(num1, num2) {
  return num1 + num2
}

// 测试套件 test suite
describe('Kaikeba', () => {
  // 测试用例 test case
  it('测试add函数', () => {
    // 断言 assert
    // expect(add(1, 3)).toBe(3)
    expect(add(1, 3)).toBe(4)
    expect(add(-2, 3)).toBe(1)
  })


  // 检查组件选项
  it('要求设置created生命周期', () => {
    expect(typeof Kaikeba.created).toBe('function')
  })
  it('message初始值是vue-test', () => {
    // 检查data函数存在性
    expect(typeof Kaikeba.data).toBe('function')
    // 检查data返回的默认值
    const defaultData = Kaikeba.data()
    expect(defaultData.message).toBe('vue-test')
  })

  it("mount之后测data是开课吧", () => {
    // 模拟挂载，wrapper是模拟宿主元素
    const wrapper = mount(Kaikeba);
    // 宿主vm属性可以获取Vue实例
    expect(wrapper.vm.message).toBe("开课吧");
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
}) 