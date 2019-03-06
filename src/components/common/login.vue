<template>
  <div class="loginWapper">
    <el-card>
      <div slot="header">
        <span>登录</span>
      </div>
      <el-row>
        <el-form :model="user">
          <ElFormItem label="用户名:">
            <el-input v-model="user.userName"></el-input>
          </ElFormItem>
          <el-form-item label="密码:">
            <el-input v-model="user.userPassword"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="login">点击登录</el-button>
          </el-form-item>
        </el-form>
      </el-row>
    </el-card>
  </div>
</template>
<script>
import Router from "vue-router";
import router from "../../router/index.js";

export default {
  data() {
    return {
      user: {
        userName: "",
        userPassword: ""
      }
    };
  },
  methods: {
    login() {
      this.$axios
        .post("/api/baseUser/login", this.$qs.stringify(this.user))
        .then(response => {
          if (!response.data.loginStatus) {
            this.$message({
              type: "error",
              message: "登录失败,用户名或密码错误"
            });
            this.user.userPassword=""
          } else {
            console.log(response.data);
            // this.resolveRoute(response.data.baseModuleList);
            // 将登录信息存储到sessionStroage中
            sessionStorage.setItem("LoginUser", JSON.stringify(response.data));
            // 跳转到钩子函数beforeEach
            router.push("/home/table");
          }
        })
        .catch(error => console.log(error));
    },
    resolveRoute(baseModuleList) {
      var functions = [];
      //  解析出所有的路由对象
      for (var baseModule of baseModuleList) {
        // console.log(baseModule)
        for (var baseFunction of baseModule.baseFunctionList) {
          // var com =  require(['../page/'+baseFunction.functionComponent])
          var child = {
            path: baseFunction.functionRouter,
            component:resolve => require(['../page/'+baseFunction.functionComponent+'.vue'], resolve),
            // component:com
          };
          functions.push(child);
        }
      }
      console.log(functions);
      var route = [
        {
          path: "/home",
          component: resolve => require(["./Home.vue"], resolve),
          children: functions
        }
      ];
      // 
      // sessionStorage.setItem('routes',JSON.stringify(route))
      console.log('登录时添加到session中的')
      console.log(route)
      router.addRoutes(route);
    }
  }
};
</script>
<style scoped>
.loginWapper {
  width: 100%;
  height: 710px;
  background: rgb(0, 4, 44);
}
.el-card {
  margin: 0 auto;
  /* margin-top:100px; */
  width: 350px;
  height: 350px;
  position: relative;
  top: 150px;
}
</style>
