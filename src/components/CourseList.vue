<template>
  <div>
    <!-- 条件渲染 -->
    <p v-if="courses.length == 0">没有任何课程信息</p>

    <!-- 列表渲染 -->
    <!-- <div v-for="c in courses" :key="c" 
              :class="{active: selectedCourse === c}" @click="selectedCourse = c">
              {{ c }}
    </div>-->
    <!-- style -->
    <div :class="['course-list', $style.red]" v-else>
      <div
        v-for="c in courses"
        :key="c.name"
        :class="{[$style.active]: selectedCourse === c}"
        @click="onClick(c)"
      >
        {{ c.name }} - {{ c.price | currency('￥') }}
        <!-- <router-link :to="`/admin/course/${c.name}`">
          {{ c.name }} - {{ c.price | currency('￥') }}
        </router-link>-->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedCourse: ""
    };
  },
  props: {
    courses: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  filters: {
    currency(value, symbol = "￥") {
      return symbol + value;
    }
  },
  methods: {
    onClick(c) {
      this.selectedCourse = c;
      // this.$router.push(`/admin/course/${c.name}`)
      this.$router.push({
        name: "detail",
        params: { name: c.name }
      });
    }
  }
};
</script>

<style module>
.active {
  background-color: #ddd;
}

.red {
  color: #f00;
}
</style>