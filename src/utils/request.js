import axios from 'axios'
import store from '@/store'
import router from '@/router'
// import { setToken } from '@/utils/auth'
// const TOKEN = setToken()

// 创建 axios 实例
const service = axios.create({
  baseURL: 'http://crm.4000600031.com:8101/api/',
  timeout: 5000 // 请求延迟
})
// 本地
// const service = axios.create({
//   baseURL: 'http://192.168.1.104:8101/api/',
//   timeout: 5000 // 请求延迟
// })

// 请求拦截
service.interceptors.request.use(
  config => {
    if (window.sessionStorage.getItem('token')) {
      // console.log(, '132')
      config.headers['auth'] = window.sessionStorage.getItem('token')
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截
service.interceptors.response.use(
  // 自定义 code 标识请求状态
  response => {
    const res = response.data
    // code 2001 means not login
    if (res.code === 404) {
      store.commit('logout')
      router.replace('/login')
    }
    return res
  },
  // 通过 XMLHttpRequest 对象状态码标识
  error => {
    return Promise.reject(error)
  }
)
export default service
