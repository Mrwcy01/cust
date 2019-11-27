import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import 'lib-flexible'
import '@/permission' // permission control
import Vant from 'vant'
import 'vant/lib/index.css'
Vue.use(Vant)
// 基础样式 引入
import('./assets/css/base.css')
// 阻止启动生产消息
Vue.config.productionTip = false

// 移动端调试工具 log日志 网络请求  dom
import Vconsole from 'vconsole'
new Vconsole()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
