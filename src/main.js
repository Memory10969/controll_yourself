import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'

Vue.config.productionTip = false

// 导入elementui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// import './assets/element-#409eff/index.css';

// 导入axios
import axios from 'axios'
// 解决传参数时axios自动将数据转换为json导致后台接收不到
import qs from 'qs'
Vue.prototype.$axios = axios
Vue.prototype.$qs = qs


Vue.use(ElementUI);

var reflesh = true;
// 解决登录后添加路由 刷新失效问题
router.beforeEach((to, from, next) => {
  // 出口
  if (to.path == "/login") {
    console.log('进入出口')
    next()
  } else {
    // 获取sessionStorage中的用户信息
    var LoginUser = JSON.parse(sessionStorage.getItem("LoginUser"));
    // 未登录情况,直接跳转到登录组件
    if (!LoginUser) {
      //  注意,此方法无法跳出beforeEach, 无参数的next必须被调用,
      console.log('未登录,重定向到登录页面')
      next({ path: "/login" })
    }
  }
  // 由于刷新之后会重新加载配置,所以,每次刷新之后 reflesh 自动初始化为true,
  if (reflesh && LoginUser) {
    reflesh = false;
    console.log('登录后的刷新,重新添加路由')
    // 判断为刷新,如果执行到这里,说明已经登录,并且正在刷新
    var baseModuleList = LoginUser.baseModuleList
    var functions = [];
    //  解析出所有的路由对象
    for (var baseModule of baseModuleList) {
      // console.log(baseModule)
      for (var baseFunction of baseModule.baseFunctionList) {
        // var com =  require(['../page/'+baseFunction.functionComponent])
        // alert( baseFunction.functionRouter)
        var child = {
          path: baseFunction.functionRouter,
          component: () => import('./components/page/'+baseFunction.functionComponent+".vue"),
          // component:com
        };
        functions.push(child);
      }
    }
    // console.log(functions);
    var route = [
      {
        name:'home',
        path: "/home",
        component: () => import("./components/common/Home.vue"),
        meta:{title:'后台'},
        children: functions
      }
    ];
    // sessionStorage.setItem('routes',JSON.stringify(route))
    console.log('刷新时时添加到session中的')
    console.log(route)
    console.log(functions)
    console.log(router)
    router.options.routes= router.options.routes.concat(route)
    console.log(router.options.routes)
    router.addRoutes(route);
   
    // console.log(router)
    // router.replace(to.path);
    // alert(to.path)
    
    next('/home/baseUser')
  }
  console.log("目标地址"+to.path)
  next()
});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')



// router.onReady(()=>{
//   let route = JSON.parse(sessionStorage.getItem("routes"));
//   if(route!=null){
//     router.addRoutes(route)
//     // let hash = window.location.hash
//     // alert(hash)
//     // router.push(hash.replace("#",''))
//   }
// })
// window.onload = function(){
//   let route = JSON.parse(sessionStorage.getItem("routes"));
//   if(route!=null){
//     router.addRoutes(route)
//     let hash = window.location.hash
//     // alert(hash)
//     router.push(hash.replace("#",''))
//   }
// }


