<template>
  <div class="hello">
    <p>
      <input type="text" @keyup.enter="addFeature" />
    </p>
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
// class-style组件
import { Component, Prop, Vue } from "vue-property-decorator";

type Feature = {
  id: number;
  name: string;
};

type Select = {
  selected: boolean;
};

type FeatureSelect = Feature & Select;

@Component
export default class HelloWorld extends Vue {
  // 类的属性将直接转换为data
  features: FeatureSelect[] = [];

  // 生命周期同名方法作为同名钩子使用
  created() {
    this.features = [
      { id: 1, name: "类型注解", selected: false },
      { id: 2, name: "静态类型检测", selected: true }
    ];
  }

  // 方法直接作为methods选项
  addFeature(e: KeyboardEvent) {
    // 获取input的value属性
    // 如果用户特别确定类型，可以做类型断言
    const inp = e.target as HTMLInputElement;
    const val = inp.value;
    const feature: FeatureSelect = {
      id: this.features.length + 1,
      name: val,
      selected: false
    };
    this.features.push(feature);
    inp.value = "";
  }

  // 存取器作为计算属性存在
  get count() {
    return this.features.length
  }
}

// options-style
// export default Vue.extend({
//   props: ['msg'],
//   mounted () {
//     this.msg;
//   },
// })
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
a {
  color: #42b983;
}

.selected {
  background-color: rgb(186, 222, 245);
}
</style>
