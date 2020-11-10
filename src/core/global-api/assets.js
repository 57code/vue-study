/* @flow */

import { ASSET_TYPES } from 'shared/constants'
import { isPlainObject, validateComponentName } from '../util/index'

export function initAssetRegisters (Vue: GlobalAPI) {
  /**
   * Create asset registration methods.
   */
  // ['component','filter','directive']
  ASSET_TYPES.forEach(type => {
    Vue[type] = function (
      id: string,
      definition: Function | Object
    ): Function | Object | void {
      // Vue.component('compname', {})
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if (process.env.NODE_ENV !== 'production' && type === 'component') {
          validateComponentName(id)
        }
        if (type === 'component' && isPlainObject(definition)) {
          // 设置name
          definition.name = definition.name || id
          // Vue.extend(name, def) => VueComponent => new Ctor()
          // .vue => def
          // ins.$mount()
          // Vue VueComponent
          // extend: 继承，创建VueComponent
          // 获得组件构造函数
          definition = this.options._base.extend(definition)
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition }
        }
        // 注册：默认选项中存放刚才生成构造函数
        // options.components.compid = Ctor
        this.options[type + 's'][id] = definition
        return definition
      }
    }
  })
}
