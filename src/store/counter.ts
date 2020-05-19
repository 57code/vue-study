import { Module, VuexModule, Mutation, Action, getModule } from 'vuex-module-decorators'
import store from './index'

@Module({ dynamic: true, store: store, name: 'counter', namespaced: true })
class CounterModule extends VuexModule {
  // state
  count = 1

  // mutation
  @Mutation
  add(num: number = 1) {
    this.count += num
  }

  @Action
  asyncAdd() {
    setTimeout(() => {
      this.add()
    }, 1000);
  }
}

export default getModule(CounterModule)