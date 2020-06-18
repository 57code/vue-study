import Kaikeba from '@/components/Kaikeba.vue';
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

  it('要设置created钩子', () => {
    expect(typeof Kaikeba.created).toBe('function')
  })

  it('message初始值是vue-test', () => {
    expect(typeof Kaikeba.data).toBe('function')

    const defData = Kaikeba.data()
    expect(defData.message).toBe('vue-test')

  })



  it("mount之后测data是开课吧", () => {
    // 模拟组件，得到封装对象
    // vm是Vue实例
    // wrapper获取dom
    const wrapper = mount(Kaikeba);
    expect(wrapper.vm.message).toBe("开课吧");
  });

  it("按钮点击后", () => {
    const wrapper = mount(Kaikeba);
    // 模拟点击
    wrapper.find("button").trigger("click");
    // 测试数据变化
    expect(wrapper.vm.message).toBe("按钮点击");
    // 测试html渲染结果
    // expect(wrapper.find("span").html()).toBe("<span>按钮点击</span>");
    // 等效的方式
    setTimeout(() => {
      expect(wrapper.find("span").text()).toBe("按钮点击");
    }, 0);
    
});
}) 