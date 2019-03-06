<template>
  <el-row>
    <ElCol :span="6">
        <div class="logo">
            我是一个logo
        </div>    
    </ElCol>
    <ElCol :span="12">
      <el-menu
        :default-active="activeIndex2"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <!-- <el-menu-item index="1">个人中心</el-menu-item> -->
        <el-submenu index="2">
          <template slot="title">我的工作台</template>
          <el-menu-item index="2-1">日记</el-menu-item>
          <el-menu-item index="2-2">学习笔记</el-menu-item>
          <el-menu-item index="2-3">工作心得</el-menu-item>
          <el-submenu index="2-4">
            <template slot="title">选项</template>
            <el-menu-item index="2-4-1">选项1</el-menu-item>
            <el-menu-item index="2-4-2">选项2</el-menu-item>
            <el-menu-item index="2-4-3">选项3</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-menu-item index="3" >消息中心</el-menu-item>
        <!-- <el-menu-item index="4">
          <a href="https://www.ele.me" target="_blank">订单管理</a>
        </el-menu-item> -->
      </el-menu>
    </ElCol>
    <ElCol :span="6">
        <div class="login">
            <el-button type="" size="small">登录</el-button><span>或者 </span><el-button size="small">注册</el-button>
        </div>
    </ElCol>
  </el-row>
</template>
<script>
export default {};
</script>
<style scoped>
.el-row{
    /* display: block; */
    background-color:#545c64;
    /* border-bottom: 2px solid #545c64 */
}
.logo{
    line-height: 60px;
    color: aliceblue;
    text-align: center;
    font-size: 30px;

}
.el-menu.el-menu--horizontal{
  border-bottom: 0px
}
.el-menu{
  /* height: 71px !important; */
}
.login{
    line-height: 60px;
    text-align: center;
    color: beige;
}
</style>
