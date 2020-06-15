import { Module, VuexModule, Mutation, Action, getModule } from 'vuex-module-decorators'
import store from './index'

// 动态注册模块
@Module({ dynamic: true, store: store, name: 'counter', namespaced: true })
class CounterModule extends VuexModule {
  count = 1

  @Mutation
  add() {
    // 通过this直接访问count
    this.count++
  }

  // 定义getters
  get doubleCount() {
    return this.count * 2;
  }

  @Action
  asyncAdd() {
    setTimeout(() => {
      // 通过this直接访问add
      this.add()
    }, 1000);
  }
}

// 导出模块应该是getModule的结果
export default getModule(CounterModule)