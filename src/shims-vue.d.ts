import { AxiosInstance } from 'axios'
import Vue from 'vue'

declare module '*.vue' {
  export default Vue
}

// 扩充一下Vue接口
declare module 'vue/types/vue' {
  interface Vue {
    $axios: AxiosInstance
  }
}
