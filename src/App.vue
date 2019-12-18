<template>
  <div id="app">
    <img :src="`${publicPath}assets/logo.png`" />

    <message ref="msgSuccess" class="success">
      <!-- 命名为title插槽内容 -->
      <template v-slot:title="slotProps">
        <strong>{{slotProps.title}}</strong>
      </template>
      <!-- 默认插槽内容 -->
      <template v-slot:default>新增课程成功!</template>
    </message>

    <message ref="msgWarning" class="warning">
      <!-- 命名为title插槽内容 -->
      <template v-slot:title>
        <strong>警告</strong>
      </template>
      <!-- 默认插槽内容 -->
      <template v-slot:default>请输入课程名称!</template>
    </message>

    <CourseAdd v-model="course" @add-course="addCourse"></CourseAdd>
    <CourseList :courses="courses"></CourseList>
  </div>
</template>

<script>
import CourseList from "@/components/CourseList.vue";
import CourseAdd from "@/components/CourseAdd.vue";
import Message from "@/components/Message.vue";
import { getCourses } from "@/api/course";

export default {
  name: "app",
  components: {
    CourseList,
    CourseAdd,
    Message
  },
  data() {
    return {
      title: "开课吧购物车",
      course: "",
      courses: [],
      publicPath: process.env.BASE_URL
    };
  },
  async created() {
    // 组件实例已创建，由于未挂载，dom不存在
    const courses = await getCourses();
    this.courses = courses;
  },
  methods: {
    addCourse() {
      if (this.course) {
        // 添加course到数组
        this.courses.push({ name: this.course });
        this.course = "";

        // 显示提示信息
        // this.show = true
        this.$refs.msgSuccess.toggle();
      } else {
        // 显示错误信息
        // this.showWarn = true
        this.$refs.msgWarning.toggle();
      }
    }
  }
};
</script>

<style lang="scss">
a {
  color: $color;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

#app {
  /deep/ .inp {
    border: 1px solid #2687e7
  }  
}
</style>
