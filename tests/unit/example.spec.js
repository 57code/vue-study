import { shallowMount } from '@vue/test-utils'
import HelloWorld from '@/components/HelloWorld.vue'


// 测试套件
describe('HelloWorld.vue', () => {
  // 测试用例
  it('renders props.msg when passed', () => {
    const msg = 'new message'
    const wrapper = shallowMount(HelloWorld, {
      propsData: { msg }
    })
    expect(wrapper.text()).toMatch(msg)
  })
})
