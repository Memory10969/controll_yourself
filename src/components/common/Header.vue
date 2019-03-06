<template>
  <el-row :style="{backgroundColor: color.primary}">
    <el-col :span="6" style="font-size : 32px;">我是一个logo</el-col>
    <el-col :span="12">中间部分,可用作顶部导航</el-col>
    <el-col :span="4" :offset="2">
      <div class="userinfo">
        <div class="user-head">
          <!-- <img src alt="头像"> -->
        </div>
        <div class="username">
          <el-dropdown size="small" trigger="click">
            <span class="el-dropdown-link">
              {{baseUser.userName}}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>我的信息</el-dropdown-item>
              <el-dropdown-item @click.native="logOut()">退出登陆</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </el-col>
  </el-row>
</template>
<script>
import commonVue from "./common.js";
export default {
  data() {
    return {
      baseUser: {
        userId:'',
        userName:'',
      }
    };
  },
  props: ["color"],
  methods:{
    logOut(){
      // alert("进入登出方法")
      // 删除sessionStorage中的用户数据
      sessionStorage.removeItem("LoginUser")
      // alert("s删除成功")
      this.$router.replace("/login")
    }
  },
  created(){
    var LoginUser = JSON.parse(sessionStorage.getItem('LoginUser'))
    // console.log("头部获取信息")
    // console.log(LoginUser)
    if(LoginUser){
      this.baseUser.userId = LoginUser.userId;
      this.baseUser.userName = LoginUser.userName;
      //  alert(LoginUser.userId.userId)
    }
   
  }
};
</script>
<style scoped>
.el-row {
  width: 101.5%;
  height: 70px;
  background-color: "red";
  line-height: 70px;
  color: #fff;
}
.el-col {
  height: 70px;
  text-align: center;
}
.username span:hover {
  cursor: pointer;
}
.username span {
  color: #fff;
}
.el-dropdown-menu {
  top: 50px !important;
}
/* .drpodown{
  position: absolute;
  top: -100px;
} */
/* .userinfo{
  float: center;
} */
</style>


