/* @flow */

import { isRegExp, remove } from 'shared/util'
import { getFirstComponentChild } from 'core/vdom/helpers/index'

type VNodeCache = { [key: string]: ?VNode };

function getComponentName (opts: ?VNodeComponentOptions): ?string {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern: string | RegExp | Array<string>, name: string): boolean {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance: any, filter: Function) {
  const { cache, keys, _vnode } = keepAliveInstance
  for (const key in cache) {
    const cachedNode: ?VNode = cache[key]
    if (cachedNode) {
      const name: ?string = getComponentName(cachedNode.componentOptions)
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode)
      }
    }
  }
}

function pruneCacheEntry (
  cache: VNodeCache,
  key: string,
  keys: Array<string>,
  current?: VNode
) {
  const cached = cache[key]
  if (cached && (!current || cached.tag !== current.tag)) {
    cached.componentInstance.$destroy()
  }
  cache[key] = null
  remove(keys, key)
}

const patternTypes: Array<Function> = [String, RegExp, Array]

// 组件配置
export default {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes, // 包含哪些需要缓存组件
    exclude: patternTypes, // 排除那些不需要缓存组件
    max: [String, Number]  // 缓存最大数量
  },

  created () {
    // 缓存对象 {[key]: vdom}
    this.cache = Object.create(null)
    // 记录缓存数量
    this.keys = []
  },

  destroyed () {
    for (const key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys)
    }
  },

  mounted () {
    this.$watch('include', val => {
      pruneCache(this, name => matches(val, name))
    })
    this.$watch('exclude', val => {
      pruneCache(this, name => !matches(val, name))
    })
  },

  render () {
    // 获取插槽内容
    const slot = this.$slots.default
    // 获取首个子组件vnode
    const vnode: VNode = getFirstComponentChild(slot)
    // 获取其选项
    const componentOptions: ?VNodeComponentOptions = vnode && vnode.componentOptions
    // 选项存在
    if (componentOptions) {
      // check pattern
      // 获取子组件名称
      const name: ?string = getComponentName(componentOptions)
      // 获取keep-alive组件设置属性
      const { include, exclude } = this
      // 如果设置包含组件名，那么查看当前首个子组件不包含在include中
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        // 如果设置排除选项，排除那些在排除名单中存在的组件
        (exclude && name && matches(exclude, name))
      ) {
        // 以上两种情况不做任何处理
        return vnode
      }

      // 获取缓存和keys数组
      const { cache, keys } = this
      // 当前组件key的获取
      const key: ?string = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? `::${componentOptions.tag}` : '')
        : vnode.key
      // 先查缓存
      if (cache[key]) {
        // 替换为缓存的组件实例
        vnode.componentInstance = cache[key].componentInstance
        // make current key freshest
        remove(keys, key)
        keys.push(key)
      } else {
        // 没有缓存，缓存它
        cache[key] = vnode
        keys.push(key)
        // prune oldest entry
        // 修剪最老的缓存项
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode)
        }
      }

      // 关键动作：标记子组件为keepAlive
      vnode.data.keepAlive = true
    }
    // 返回vnode
    return vnode || (slot && slot[0])
  }
}
