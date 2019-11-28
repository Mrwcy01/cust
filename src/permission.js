import router from './router'
import store from './store'
// import { setToken } from '@/utils/auth'
import { Toast } from 'vant'
// 页面刷新时，重新赋值 token
// const TOKEN = setToken()
if (window.sessionStorage.getItem('token')) {
  store.commit('LOGIN', window.sessionStorage.getItem('token'))
  store.commit('GET_USER_INFO', window.sessionStorage.getItem('userInfo'))
} else {
  router.replace('/login')
}
// 路由守卫 路由跳转新页面回到顶部
router.afterEach((to, from, next) => {
  window.scrollTo(0, 0)
  // console.log(window.sessionStorage.getItem('userInfo'))
})
// 路由守卫
router.beforeEach(async(to, from, next) => {
  // 检查是否登录
  // if (store.state.token === '') {
  //   this.$router.push({
  //     path: '/login'
  //   })
  // }
  // // 设置限制路由,检查是否有权限访问 未登录状态 跳首页
  if (to.matched.some(record => record.meta.requireAuth)) {
    console.log(to.matched)
    if (store.state.token === null || store.state.token === 'null' || store.state.token === '') {
      Toast.fail('请先登录')
      next('/login')
    } else {
      next()
    }
  } else {
    next()
  }
})
