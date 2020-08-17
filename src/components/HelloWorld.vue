<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      <input type="text" @keyup.enter="addFeature" />
    </p>
    <!-- 列举ts特性 -->
    <ul>
      <li
        v-for="feature in features"
        :key="feature.id"
        :class="{selected: feature.selected}"
      >{{feature.name}}</li>
      <li>特性总数：{{count}}</li>
    </ul>
  </div>
</template>

<script lang="ts">
// import { Component, Prop, Vue, Emit } from "vue-property-decorator";
import { Prop, Vue, Emit } from "vue-property-decorator";
import Axios from 'axios'
// Feature类型
// type Feature = {
//   id: number;
//   name: string;
// };

interface Feature {
  id: number;
  name: string;
}

type Select = {
  selected: boolean;
};

type FeatureSelect = Feature & Select;

interface Result<T> {
  ok: 0 | 1;
  data: T;
}

function getResult<T>(): Promise<Result<T>> {
  const data: any = [
    { id: 1, name: "类型注解", selected: false },
    { id: 2, name: "编译型语言", selected: true },
  ];
  return Promise.resolve({ ok: 1, data });
}

function Component(options: any): any {
  return function(target: any) {
    // 此处省略若干行处理target代码
    return Vue.extend(options) 
  }
}

// 导出的组件构造函数 Ctor
// Component做了什么？
// 构造一个配置对象 {props:{},data:{},methods:{}}
// return Vue.extend(options)
@Component({
  props: {
    msg: {
      type: String,
      default: ''
    },
  }
})
export default class HelloWorld extends Vue {

  // {type: String, required: true}传递给vue的
  @Prop({type: String, required: true}) msg!: string;

  features: FeatureSelect[] = [];

  // 方法作为methods中的选项
  @Emit()
  addFeature(e: KeyboardEvent) {
    // 获取input元素
    // as: 类型断言，使类型更加具体，不是类型转换
    const inp = e.target as HTMLInputElement;
    const feature: FeatureSelect = {
      id: this.features.length + 1,
      name: inp.value,
      selected: false,
    };
    this.features.push(feature);

    inp.value = "";
  }

  // 生命周期
  async created() {   
    // Promise<AxiosResponse<T>>
    // const result = await Axios.get<FeatureSelect[]>('/api/list')
    const result = await this.$axios.get<FeatureSelect[]>('/api/list')
    // const result = await getResult<FeatureSelect[]>();
    this.features = result.data;
  }

  // 存取器可以定义计算属性
  get count() {
    return this.features.length;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}

a {
  color: #42b983;
}

.selected {
  background-color: #ddd;
}
</style>
