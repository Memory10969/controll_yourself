import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'


Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   redirect : '/'
    // },
    {
      path:"/",
      redirect:"login"
    },
    {
      path: '/home',
      component: resolve => require(['../components/common/Home.vue'], resolve),
      meta: { title: '测试' },
      children:[
        {path:'table',component: resolve => require(['../components/page/table.vue'], resolve)},
        {path:'baseUser',component: resolve => require(['../components/page/baseUser.vue'], resolve)}
      ]
    },
    {
      name:"login",
      path: '/login',
      component: resolve => require(['../components/common/login.vue'], resolve),
      meta: { title: '登录' },
    },
    {
      path: '/font',
      component: resolve => require(['../components/front/common/Home.vue'], resolve),
      meta: { title: '前台' },
    },
    {
      path: '/font/desktop',
      component: resolve => require(['../components/front/desktop/desktop.vue'], resolve),
      meta: { title: '我的桌面' },
      children:[
        {
          path:'diary',
          component:resolve => require(['../components/front/desktop/desktop.vue'], resolve),
        }
      ]
    },


  ]
})
