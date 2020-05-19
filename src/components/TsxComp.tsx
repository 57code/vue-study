// 像react jsx
// 获得最强的类型支持
// 熟悉jsx
import Vue from 'vue'
import {Component} from 'vue-property-decorator'

@Component
class TsxComp extends Vue {
  message = 'tsx component'

  onClick() {
    console.log(this);
  }

  // render函数时必须的
  render() {
    return <div onClick={this.onClick}>
      {this.message}
    </div>
  }

}