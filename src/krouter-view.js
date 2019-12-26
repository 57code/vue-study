export default {

  render(h) {
    const { matched } = this.$router
    

    this.$vnode.data.routerView = true

    let depth = 0
    let parent = this.$parent
    while (parent) {
      const vnodeData = parent.$vnode && parent.$vnode.data
      if (vnodeData && vnodeData.routerView) {
        depth++
      }
      parent = parent.$parent
    }
    this.$vnode.data.routerViewDepth = depth
    
    const component = matched[depth] ? matched[depth].component : null;
    return h(component);
  }
}