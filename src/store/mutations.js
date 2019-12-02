import getData from './data'
// import { setToken } from '@/utils/auth'
export default {
  // 存储 token
  LOGIN(state, data) {
    state.token = data // 状态管理中存储
    // setToken(data)
    window.sessionStorage.setItem('token', data) // 本地存储
  },
  GET_USER_INFO(state, data) {
    state.userInfo = data // 状态管理中存储
    window.sessionStorage.setItem('userInfo', data) // 本地存储
  },
  logout(state) {
    var datas = getData()
    console.log(datas)
    // 清空数据
    for (const key in datas) {
      if (key === 'userInfo') {
        state[key] = datas[key]
        // for (const keys in datas[key]) {
        //   state[key][keys] = datas[key][keys]
        // }
      } else {
        state[key] = datas[key]
      }
    }
    sessionStorage.removeItem('userInfo')
    sessionStorage.removeItem('token')
  },
  GET_USER_FALG(state, data) {
    state.falg = data
  }
}
