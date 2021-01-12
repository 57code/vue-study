/* @flow */

import { ASSET_TYPES } from 'shared/constants'
import { isPlainObject, validateComponentName } from '../util/index'

export function initAssetRegisters (Vue: GlobalAPI) {
  /**
   * Create asset registration methods.
   */
  // ['component', 'directive', 'filter']
  ASSET_TYPES.forEach(type => {
    // Vue.component('comp', {...})
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
          // 如何定义一个组件
          definition.name = definition.name || id
          // 转换参数2为组件构造函数：Vue.extend(options) => VueComponent
          // 获取组件实例：new VueComponent
          // 挂载 =》 render() => update() => patch()
          // parent create
          //    child create
          //    child mount
          // parent mount
          definition = this.options._base.extend(definition)
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition }
        }
        // 注册到默认选项中
        // options.components.comp = Ctor
        this.options[type + 's'][id] = definition
        return definition
      }
    }
  })
}
