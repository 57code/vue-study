/* @flow */

import { ASSET_TYPES } from 'shared/constants'
import { isPlainObject, validateComponentName } from '../util/index'

export function initAssetRegisters (Vue: GlobalAPI) {
  /**
   * Create asset registration methods.
   */
  // ['component', 'directive', 'filter']
  ASSET_TYPES.forEach(type => {
    // Vue['component']
    // Vue.component('comp', compOptions)
    Vue[type] = function (
      id: string,
      definition: Function | Object
    ): Function | Object | void {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if (process.env.NODE_ENV !== 'production' && type === 'component') {
          validateComponentName(id)
        }
        if (type === 'component' && isPlainObject(definition)) {
          // 组件name如果设置就用，不设置就以id为name
          definition.name = definition.name || id
          // this.options._base == Vue
          // Vue.extend() => 接收一个组件配置，返回组件构造函数
          // Vue => VueComponent
          // 获得组件构造函数
          definition = this.options._base.extend(definition)
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition }
        }
        // 注册：options.components.comp = Ctor
        // 所谓全局注册组件，其实在全局默认选项中加入该组件注册信息
        // 初始化的时候会合并全局默认选项和用户配置选项
        // 以后每个组件都会有该组件的注册，所以组件看起来是全局注册的
        this.options[type + 's'][id] = definition
        return definition
      }
    }
  })
}
