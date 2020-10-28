import { mount, shallowMount } from '@vue/test-utils'
import HelloWorld from '@/components/HelloWorld.vue'

describe('HelloWorld.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message'
    // 包装器
    const wrapper = shallowMount(HelloWorld, {
      propsData: { msg }
    })
    // expect(wrapper.text()).toMatch(msg)
    // 查找元素
    const h1 = wrapper.find('h1')
    expect(h1.text()).toBe('new message')


  })

  it('点击元素之后动态内容是预期的 ', async () => {
    const wrapper = mount(HelloWorld)
    // 模拟点击行为
    const p1 = wrapper.find('.p1')
    await p1.trigger('click')
    expect(p1.text()).toBe('baz')

    // 获取组件
    const comp = wrapper.findComponent({name: 'comp'})
    expect(comp.exists()).toBeTruthy()

  })
  

})
