<template>
  <div class="hello">
    <h1>{{msg}}</h1>
    <!-- 新增特性 -->
    <div>
      <input type="text" @keyup.enter="addFeature" />
    </div>
    <!-- 特性列表 -->
    <ul>
      <li
        v-for="feature in features"
        :key="feature.id"
        :class="{selected: feature.selected}"
      >{{feature.name}}</li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { FeatureSelect } from "@/types";

// class-style
@Component
export default class HelloWorld extends Vue {
  @Prop() private msg!: string;

  // 属性将成为data中数据
  features: FeatureSelect[] = [];

  addFeature(e: KeyboardEvent) {
    // 类型断言
    const inp = e.target as HTMLInputElement;
    const feature: FeatureSelect = {
      id: this.features.length + 1,
      name: inp.value,
      selected: false
    };
    this.features.push(feature);
    inp.value = "";
  }

  // 生命周期
  created() {
    this.features = [
      { id: 1, name: "类型注解", selected: false },
      { id: 2, name: "编译类型语言", selected: true }
    ];
  }
}

// option-style
// import Vue from 'vue'
// export default Vue.extend({
//   data(){

//   }
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
  background-color: rgb(187, 240, 244);
}
</style>
