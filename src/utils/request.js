import axios from 'axios'
import store from '@/store'

// 创建 axios 实例
const service = axios.create({
  baseURL: 'http://192.168.1.104:8101/api/',
  timeout: 5000 // 请求延迟
})

// 请求拦截
service.interceptors.request.use(
  config => {
    if (localStorage.getItem('token')) {
      config.headers['auth'] = localStorage.getItem('token')
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
    if (res.code === 200) {
      store.commit('logout')
      // location.reload()
    }
    return res
  },
  // 通过 XMLHttpRequest 对象状态码标识
  error => {
    console.error(error)
    return Promise.reject(error)
  }
)
export default service
