<template>
  <div>
    <!-- 新增 -->
    <input type="text" @keyup.enter="addFeature" />
    <div v-for="item in features" :key="item.id" :class="{selected: item.selected}">{{ item.name }}</div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { FeatureSelect } from "@/types";

@Component
export default class HelloWorld extends Vue {
  // message = 'class based component'
  // ts特性展示，!是赋值断言，表示该属性一定会被赋值，编译器不用警告
  features!: FeatureSelect[];

  // 生命周期直接用同名方法即可
  created() {
    this.features = [
      { id: 1, name: "类型注解", selected: false },
      { id: 2, name: "编译型语言", selected: true }
    ];
  }

  // 回调函数直接声明即可
  addFeature(e: KeyboardEvent) {
    // 断言为Input，一般当一些类型需要变得更具体的时候需要使用as断言
    // 这里把EventTarget类型断言为它的子类HTMLInputElement
    // 通常编程者比编译器更清楚自己在干什么
    const inp = e.target as HTMLInputElement;
    const feature: FeatureSelect = {
      id: this.features.length + 1,
      name: inp.value,
      selected: false
    };
    this.features.push(feature);

    inp.value = "";
  }
}
</script>

<style scoped>
.selected {
  background-color: rgb(205, 250, 242);
}
</style>