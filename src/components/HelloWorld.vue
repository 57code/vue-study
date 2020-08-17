<template>
  <div class="hello">
    <!-- <h1>{{ msg }}</h1> -->
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
import { Component, Prop, Vue } from "vue-property-decorator";

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

// 导出的组件构造函数
@Component
export default class HelloWorld extends Vue {
  features: FeatureSelect[] = [];

  // 方法作为methods中的选项
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
  created() {
    this.features = [
      { id: 1, name: "类型注解", selected: false },
      { id: 2, name: "编译型语言", selected: true },
    ];
  }

  // 存取器可以定义计算属性
  get count() {
    return this.features.length
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
