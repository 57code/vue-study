<template>
  <div>
    <!-- 新增 -->
    <input type="text" @keyup.enter="addFeature" />
    <div v-for="item in features" :key="item.id" :class="{selected: item.selected}">{{ item.name }}</div>
    <div>{{count}}</div>
  </div>
</template>

<script lang="ts">
import { Vue } from "vue-property-decorator";
// import { Vue, Component, Prop, Emit, Watch } from "vue-property-decorator";
import { FeatureSelect } from "@/types";

// 泛型方法
function getList<T>(): Promise<T> {
  return Promise.resolve([
    { id: 1, name: "类型注解", selected: false },
    { id: 2, name: "编译型语言", selected: true }
  ] as any);
}


// Component目标是将下面class中的各种描述转换成组件构造函数Vue.extend(配置对象)
// 自己写一个
function Component(options: any) {
  return function (target: any) {
    return Vue.extend(options)
  }
}

@Component({
  data() {
    return {
      features: []
    }
  },
  mounted(){}
})
export default class HelloWorld extends Vue {}

// @Component({
//   components: {

//   }
// })
// export default class HelloWorld extends Vue {

//   // 括号里面是传给vue的配置
//   @Prop({type: String, required: true})
//   msg!: string;
  
//   // message = 'class based component'
//   // ts特性展示，!是赋值断言，表示该属性一定会被赋值，编译器不用警告
//   features: FeatureSelect[] = [];

//   // 生命周期直接用同名方法即可
//   async created() {
//     // this.features = await getList<FeatureSelect[]>();
//     const resp = await this.$axios.get<FeatureSelect[]>('/api/list')
//     this.features = resp.data
    
//   }

//   @Watch('msg')
//   onMsgChange(val:string, old:string) {
//     console.log(val);
//   }

//   // 回调函数直接声明即可
//   @Emit('add-feature')
//   addFeature(e: KeyboardEvent) {
//     // 断言为Input，一般当一些类型需要变得更具体的时候需要使用as断言
//     // 这里把EventTarget类型断言为它的子类HTMLInputElement
//     // 通常编程者比编译器更清楚自己在干什么
//     const inp = e.target as HTMLInputElement;
//     const feature: FeatureSelect = {
//       id: this.features.length + 1,
//       name: inp.value,
//       selected: false
//     };
//     this.features.push(feature);

//     inp.value = "";
//     // 返回值作为事件参数
//     return feature
//   }

//   // 访问器当做计算属性
//   get count() {
//     return this.features.length;
//   }
// }
</script>

<style scoped>
.selected {
  background-color: rgb(205, 250, 242);
}
</style>