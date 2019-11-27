import Vue from 'vue'
import Router from 'vue-router'

// 登录
import login from '../views/login'
// 客户列表
import client from '../views/client'
// 添加客户
import addClient from '../views/client/add'
// 客户详情
import detailsClient from '../views/client/details'
Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/',
      name: 'index',
      component: client
    },
    {
      path: '/addClient',
      name: 'addClient',
      component: addClient
    },
    {
      path: '/detailsClient',
      name: 'detailsClient',
      component: detailsClient
    }
  ]
})
router.beforeEach((to, from, next) => {
  if (to.matched.length === 0) { // 如果未匹配到路由
    from.name ? next({ name: 'login' }) : next('/login') // 如果上级也未匹配到路由则跳转登录页面，如果上级能匹配到则转上级路由
  } else {
    next() // 如果匹配到正确跳转
  }
})
export default router
