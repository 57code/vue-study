### 虚拟DOM

虚拟DOM（Virtual DOM）是对DOM的JS抽象表示，它们是JS对象，能够描述DOM结构和关系。


虚拟DOM流程

##### mountComponent

vdom树首页生成、渲染发生在mountComponent中，core/instance/lifecycle.js

```js
export function mountComponent (
  vm: Component,
  el: ?Element,
  hydrating?: boolean
): Component {
  // 挂载的宿主元素
  vm.$el = el
  
  // 调用beforeMount钩子
  callHook(vm, 'beforeMount')

  // 定义更新函数
  const updateComponent = () => {
      // 实际调用是在lifeCycleMixin中定义的_update和renderMixin中定义的_render
      vm._update(vm._render(), hydrating)
  }

  // 创建Watcher实例和根组件挂钩
  new Watcher(vm, updateComponent, noop, {
    before () {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate')
      }
    }
  }, true /* isRenderWatcher */)

  // 标识已挂载，调用mounted钩子
  // 子组件创建渲染时mounted会在它的inserted钩子中调用
  if (vm.$vnode == null) {
    vm._isMounted = true
    callHook(vm, 'mounted')
  }
  return vm
}
```





##### _render

_render生成虚拟dom，core/instance/render.js

```js
// 核心代码
Vue.prototype._render = function (): VNode {
    const vm: Component = this
    // 获取render，根组件往往是h => h(App)，子组件通常由template编译得到
    const { render, _parentVnode } = vm.$options

    // 保存parentVnode
    vm.$vnode = _parentVnode
    // 渲染当前组件Vnode
    let vnode
    try {
      currentRenderingInstance = vm
      // 关键代码：执行render，上下文是_renderProxy，参数为$createElement函数
      vnode = render.call(vm._renderProxy, vm.$createElement)
    } catch (e) {
      // ...
    } finally {
      currentRenderingInstance = null
    }
    // 一些特殊情况处理
    // ...
    // 设置父节点
    vnode.parent = _parentVnode
    return vnode
}
```



##### createElement

真正用来创建vnode的函数是createElement，src\core\vdom\create-element.js

```js
// 核心代码
export function createElement(...){
    //...
    return _createElement(...)
}
export function _createElement (
  context: Component,
  tag?: string | Class<Component> | Function | Object,
  data?: VNodeData,
  children?: any,
  normalizationType?: number
): VNode | Array<VNode> {
  // 结果
  let vnode, ns
  // 字符串tag：如“div"、”p“
  if (typeof tag === 'string') {
    let Ctor // 组件构造函数
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag)
    if (config.isReservedTag(tag)) {
      // 原生标签
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      )
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // 字符串形式表示的组件
      vnode = createComponent(Ctor, data, context, children, tag)
    } else {
      // 未知元素
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      )
    }
  } else {
    // 组件选项 / 构造函数
    vnode = createComponent(tag, data, context, children)
  }
  // 返回结果。。。
}

```



##### createComponent

用于创建组件并返回VNode，src\core\vdom\create-component.js

```js
export function createComponent (
  Ctor: Class<Component> | Function | Object | void,
  data: ?VNodeData,
  context: Component,
  children: ?Array<VNode>,
  tag?: string
): VNode | Array<VNode> | void {
  // 省略特殊判断...
  
  data = data || {}

  // 省略选项合并...

  // 提取props
  const propsData = extractPropsFromVNodeData(data, Ctor, tag)

  // 创建函数式组件
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // 提取listeners, 因为这些需要被子组件处理，替换为
  const listeners = data.on
  // 将data.on替换为带有.native修饰符的监听器，即data.nativeOn
  // 它会在父组件patch时被处理
  data.on = data.nativeOn

  if (isTrue(Ctor.options.abstract)) {
    // 抽象组件不保存props & listeners & slot以外东西
    const slot = data.slot
    data = {}
    if (slot) {
      data.slot = slot
    }
  }

  // 组件管理钩子合并，init/insert等
  installComponentHooks(data)

  // 返回占位vnode
  const name = Ctor.options.name || tag
  const vnode = new VNode(
    `vue-component-${Ctor.cid}${name ? `-${name}` : ''}`,
    data, undefined, undefined, undefined, context,
    { Ctor, propsData, listeners, tag, children },
    asyncFactory
  )

  return vnode
}
```



##### VNode

render返回的一个VNode实例，它的children还是VNode，最终构成一个树，就是虚拟DOM树，src\core\vdom\vnode.js

```js
// VNode对象：共有6种类型：元素、组件、函数式组件、文本、注释和克隆节点
export default class VNode {
  tag: string | void; // 节点标签，文本、注释没有
  data: VNodeData | void; // 节点数据，文本、注释没有
  children: ?Array<VNode>;// 元素子元素
  text: string | void;// 文本、注释的内容，元素文本
  elm: Node | void;
  ns: string | void;
  context: Component | void; 
  key: string | number | void;
  componentOptions: VNodeComponentOptions | void;
  componentInstance: Component | void; // 组件实例
  parent: VNode | void; 

  // strictly internal member...

}
```





##### _update

update负责更新dom，src\core\instance\lifecycle.js

```js
export function lifecycleMixin (Vue: Class<Component>) {
  Vue.prototype._update = function (vnode: VNode, hydrating?: boolean) {
    const vm: Component = this
    const prevEl = vm.$el
    const prevVnode = vm._vnode
    const restoreActiveInstance = setActiveInstance(vm)
    vm._vnode = vnode
    
    // ----核心代码-----
    if (!prevVnode) {
      // 若无prevVnode则是初始化渲染
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */)
    } else {
      // 更新操作，diff发生在这里
      vm.$el = vm.__patch__(prevVnode, vnode)
    }
    restoreActiveInstance()
    // 关联dom上保存一个组件实例引用
    if (prevEl) {
      prevEl.__vue__ = null
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm
    }
    // 若parent是一个HOC, 其$el也更新
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  }
}

```

\__patch__是在平台特有代码中指定的， src/platforms/web/runtime/index.js

```js
Vue.prototype.__patch__ = inBrowser ? patch : noop
```

实际就是createPatchFunction的返回值，传递nodeOps和modules，这里主要是为了跨平台

```js
export const patch: Function = createPatchFunction({ nodeOps, modules })
```

src\platforms\web\runtime\node-ops.js定义各种原生dom基础操作方法

```js
import { namespaceMap } from 'web/util/index'

export function createElement (tagName: string, vnode: VNode): Element {
  const elm = document.createElement(tagName)
  if (tagName !== 'select') {
    return elm
  }
  // false or null will remove the attribute but undefined will not
  if (vnode.data && vnode.data.attrs && vnode.data.attrs.multiple !== undefined) {
    elm.setAttribute('multiple', 'multiple')
  }
  return elm
}
//...
```

`modules` 定义了虚拟dom更新 => dom操作转换方法

```js
// 平台特有模块，src\platforms\web\runtime\modules\index.js
export default [
  attrs,
  klass,
  events,
  domProps,
  style,
  transition
]
```



##### patch

patch将新老VNode节点进行比对（diff算法），然后根据比较结果进行最小量DOM操作，而不是将整个视图根据新的VNode重绘。



...

生成相关代码：

```js
// genScopedSlot：这里把slotScope作为形参转换为工厂函数返回内容
const fn = `function(${slotScope}){` +
    `return ${el.tag === 'template'
      ? el.if && isLegacySyntax
        ? `(${el.if})?${genChildren(el, state) || 'undefined'}:undefined`
        : genChildren(el, state) || 'undefined'
      : genElement(el, state)
    }}`
// reverse proxy v-slot without scope on this.$slots
const reverseProxy = slotScope ? `` : `,proxy:true`
return `{key:${el.slotTarget || `"default"`},fn:${fn}${reverseProxy}}`
```

