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

export default router
