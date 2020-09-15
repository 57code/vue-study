<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <!-- 新增特性  -->
    <p><input type="text" @keydown.enter="addFeature" /></p>
    <!-- 特性列表 -->
    <ul>
      <li
        v-for="feature in features"
        :key="feature.id"
        :class="{ selected: feature.selected }"
      >
        {{ feature.name }}
      </li>
      <li>特性总数：{{ count }}</li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Prop, Vue, Emit, Watch } from "vue-property-decorator";

// 类型别名
type Feature = {
  id: number;
  name: string;
};

// 交叉类型
export type FeatureSelect = Feature & { selected: boolean };

interface Result<T> {
  ok: 0 | 1;
  data: T;
}

// 泛型方法
function getResult<T>(): Promise<Result<T>> {
  const data: any = [
    { id: 1, name: "类型注解", selected: false },
    { id: 2, name: "编译型语言", selected: true },
  ];
  return Promise.resolve({
    ok: 1,
    data,
  });
}

// function Component(options: any) {
//   return function (target: any): any {
//     return Vue.extend(options);
//   };
// }

function Component(target: any): any {
  const options: any = {};

  // 1.方法在原型上
  const proto = target.prototype;
  const keys = Object.getOwnPropertyNames(proto);
  console.log(keys);

  keys.forEach((key) => {
    if (key !== "constructor") {
      const descriptor = Object.getOwnPropertyDescriptor(proto, key);

      if (descriptor) {
        if (typeof descriptor.value === "function") {
          // 生命周期钩子
          if (["created", "mounted"].indexOf(key) !== -1) {
            options[key] = proto[key];
          }
          // methods
          else {
            if (!options.methods) {
              options.methods = {}
            }
            options.methods[key] = descriptor.value;
          }
        } else if (descriptor.get || descriptor.set) {
          // 存取器, computed
          if (!options.computed) {
            options.computed = {}
          }
          options.computed[key] = {
            get: descriptor.get,
            set: descriptor.set,
          };
        }
      }
    }
  });

  // 2.data
  options.data = function() {
    const data: any = {};
    const vm = new target();

    Object.keys(vm).filter(
      (key) => !key.startsWith("_") && !key.startsWith("$")
    ).forEach(key => {
      data[key] = vm[key]
    });

    return data;
  };

  return Vue.extend(options)
}

@Component
export default class HelloWorld extends Vue {
  @Prop({ type: String, required: true })
  msg!: string;

  features: FeatureSelect[] = [];

  async created() {
    // this.features = (await getResult<FeatureSelect[]>()).data;
    // getResult<FeatureSelect[]>().then(result => {
    //   this.features = result.data
    // })
    this.$axios.get<FeatureSelect[]>("/api/list").then((res) => {
      this.features = res.data;
    });
  }

  // @Watch('features')
  // onFeauturesChange(val, old) {

  // }
  // this.$emit('add-feature', result)
  @Emit()
  addFeature(e: KeyboardEvent) {
    // 断言：用户确定变量的类型，可以使用断言
    const inp = e.target as HTMLInputElement;
    const feature: FeatureSelect = {
      id: this.features.length + 1,
      name: inp.value,
      selected: false,
    };
    this.features.push(feature);

    inp.value = "";
    // 返回值作为时间参数
    return feature;
  }

  // 存取器作为计算属性
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

a {
  color: #42b983;
}

.selected {
  background-color: rgb(191, 244, 231);
}
</style>
