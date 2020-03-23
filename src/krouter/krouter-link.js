// 需要一个属性to
export default {
  props: {
    to: {
      type: String,
      required: true
    },
  },
  render(h) {
    // 渲染结果：<a href="/xx">abc</a>
    // 渲染函数三个参数：标签名称，属性集合，子元素数组
    // return h('a', { attrs: { href: '#' + this.to } }, [this.$slots.default])
    // jsx写法
    console.log(h);
    return <a href={'#' + this.to}>{this.$slots.default}</a>
  }
}