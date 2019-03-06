<template>
  <div class="wapper">
    <my-header :color="color"></my-header>
    <div class="down">
      <my-side></my-side>
      <div class="content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script>
// 导入公共组件
import commonVue from "./common.js";
import myHeader from "./Header.vue";
import mySide from "./Side.vue";
import myTag from "./Tag.vue";

export default {
  data() {
    return {
      tagList: [],
      collapse: false,
      color: {
        primary: "#409EFF",
        dark: "#242f42"
      }
    };
  },
  components: {
    myHeader,
    mySide,
    myTag
  },
  mounted(){
    // console.log(this.$router)
  }
};
</script>
<style scoped>
.wapper {
  height: 100%;
  width: 1510px;
  /* display:flex; */
  /* flex-flow:row wrap;
    vertical-align: top */
}
</style>
