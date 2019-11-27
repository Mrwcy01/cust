import getData from './data'
import { setToken } from '@/utils/auth'
export default {
  // 存储 token
  LOGIN(state, data) {
    state.token = data // 状态管理中存储
    setToken(data)
    // window.localStorage.setItem('token', data) // 本地存储
  },
  GET_USER_INFO(state, data) {
    state.userInfo = data // 状态管理中存储
    window.localStorage.setItem('userInfo', data) // 本地存储
  },
  logout(state) {
    var datas = getData()
    // 清空数据
    for (const key in datas) {
      if (key === 'userInfo') {
        for (const keys in datas[key]) {
          state[key][keys] = datas[key][keys]
        }
      } else {
        state[key] = datas[key]
      }
    }
    localStorage.removeItem('token')
  }
}
