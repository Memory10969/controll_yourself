<template>
  <div class="sideWapper">
    <!-- default-active="1-4-1" -->
    <!-- 动态绑定默认打开的 -->
    <el-menu class="el-menu-vertical-demo"  router :default-active="defaultActive">
      <el-submenu
        :index="'1'"
        v-for="baseModule in baseModules"
        :key="baseModule.moduleId"
       
      >
        <template slot="title">
          <!-- <i class="el-icon-menu"></i> -->
          <i :class="baseModule.moduleIcon"></i>
          <span slot="title">{{baseModule.moduleName}}</span>
        </template>

        <!-- <el-menu-item-group> -->
        <span slot="title">分组一</span>
        <el-menu-item
          :index="baseFunction.functionRouter"
          v-for="baseFunction in baseModule.baseFunctionList"
          :key="baseFunction.functionId"
        >
        {{baseFunction.functionName}}
          <!-- <router-link :to="baseFunction.functionRouter" tag="div" replace> -->
            
          <!-- </router-link> -->
        </el-menu-item>
        <!-- </el-menu-item-group> -->
      </el-submenu>
      <!-- <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">导航一</span>
        </template>
        <el-menu-item-group>
          <span slot="title">分组一</span>
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="分组2">
          <el-menu-item index="1-3">选项3</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="1-4">
          <span slot="title">选项4</span>
          <el-menu-item index="1-4-1">选项1</el-menu-item>
        </el-submenu>
      </el-submenu>-->
      <!-- <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">导航二</span>
      </el-menu-item>
      <el-menu-item index="3" disabled>
        <i class="el-icon-document"></i>
        <span slot="title">导航三</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <span slot="title">导航四</span>
      </el-menu-item>-->
    </el-menu>
  </div>
</template>
<script>
export default {
  data() {
    return {
      baseModules: []
    };
  },
  computed:{
    defaultActive(){
      var fullPath = this.$router.history.current.fullPath;
      var path = fullPath.split('/')[fullPath.split('/').length-1];
      // alert(path)
      return path;
    }
  },
  // 方法和数据加载完成之后,修改data的值
  beforeMount() {
    // console.log(JSON.parse(sessionStorage.getItem("LoginUser")))
    this.baseModules = JSON.parse(
      sessionStorage.getItem("LoginUser")
    ).baseModuleList;
    // console.log(this.baseModules)
    // this.baseModules = this.baseModules.filter((item, index) => {
    //   if (item.baseFunctionList.length > 0) {
    //     return item
    //   }
    // });

  }
};
</script>
<style scoped>
.sideWapper {
  width: 200px;
  height: 400px;
  float: left;
}
</style>


