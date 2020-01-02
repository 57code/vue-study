export default {
  props: {
    to: {
      type: String,
      required: true
    },
  },
  render(h) {
    // <a href="#/about">abc</a>
    // <router-link to="/about">xxx</router-link>
    // h(tag, data, children)
    console.log(this.$slots);
    return h('a', { attrs: { href: '#' + this.to } }, this.$slots.default)
    // return <a href={'#' + this.to}>{this.$slots.default}</a>
  }
}