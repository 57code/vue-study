import Kaikeba from '@/components/Kaikeba.vue'
import {mount} from '@vue/test-utils'

function add(n1,n2){
  return n1+n2
}

// 测试套件
describe('Kaikeba.vue', () => {
  // 测试用例
  test('测试add函数', () => {
    // 断言
    // expect(add(1,3)).toBe(3)
    expect(add(1,3)).toBe(4)
    expect(add(-2,3)).toBe(1)
  })
  
  test('要求组件必须有created选项', () => {
    expect(typeof Kaikeba.created).toBe('function')

    const defData = Kaikeba.data()
    expect(defData.message).toBe('vue-text')
  })
  

  test('挂载之后data应该是开课吧', () => {
    const wrapper = mount(Kaikeba)
    const vm = wrapper.vm
    expect(vm.message).toBe('开课吧')
  })

  test('按钮点击之后', () => {
    const wrapper = mount(Kaikeba)
    wrapper.find('button').trigger('click')
    // 模仿jq获取内部元素内容
    const html = wrapper.find('span').html()
    setTimeout(() => {
      expect(html).toBe('<span>按钮点击</span>')
    }, 0);
    
  })
  
  
})
