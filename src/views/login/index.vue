<template>
  <div class="login">
    <div class="from-menu">
      <h1>客户管理系统</h1>
      <div class="inp-menu user">
        <input
          v-model="LoginRequest.UserName"
          type="text"
          placeholder="请输入手机号">
      </div>
      <div class="inp-menu pwd">
        <input
          v-model="LoginRequest.Password"
          type="password"
          placeholder="请输入密码">
      </div>
      <van-checkbox
        v-model="checked"
        class="checkedpwd"
        shape="square">记住密码</van-checkbox>
      <button @click="goHome()">登录</button>
    </div>
  </div>
</template>

<script>
import { getLogin } from '@/api/client'
export default {
  name: 'Login',
  data() {
    return {
      checked: false,
      LoginRequest: {
        UserName: '',
        Password: ''
      }
    }
  },
  created() {
    // 在页面加载时从cookie获取登录信息
    const username = this.getCookie('username')
    const password = this.getCookie('Password')
    // 如果存在赋值给表单，并且将记住密码勾选
    if (username) {
      this.LoginRequest.UserName = username
      this.LoginRequest.Password = password
      this.checked = true
    }
  },
  methods: {
    // 记住密码
    setUserInfo() {
      if (this.checked) {
        this.setCookie('username', this.LoginRequest.UserName)
        this.setCookie('Password', this.LoginRequest.Password)
        this.setCookie('remember', this.checked)
      } else {
        this.setCookie('username', '')
        this.setCookie('Password', '')
      }
    },
    // 获取cookie
    getCookie: function(key) {
      if (document.cookie.length > 0) {
        var start = document.cookie.indexOf(key + '=')
        if (start !== -1) {
          start = start + key.length + 1
          var end = document.cookie.indexOf(';', start)
          if (end === -1) end = document.cookie.length
          return unescape(document.cookie.substring(start, end))
        }
      }
      return ''
    },
    // 保存cookie
    setCookie: function(cName, value, expiredays) {
      var exdate = new Date()
      exdate.setDate(exdate.getDate() + expiredays)
      document.cookie = cName + '=' + decodeURIComponent(value) +
            ((expiredays == null) ? '' : ';expires=' + exdate.toGMTString())
    },
    goHome() {
      if (!this.LoginRequest.UserName) {
        this.$toast.fail('请输入手机号码')
        return false
      }
      if (!this.LoginRequest.Password) {
        this.$toast.fail('请输入密码')
        return false
      }
      getLogin(this.LoginRequest)
        .then(res => {
          if (res.code === 200) {
            this.setUserInfo()
            this.$toast.success('登录成功')
            this.$store.commit('LOGIN', res.result.Token)
            this.$store.commit('GET_USER_INFO', res.result.UserName)
            this.$store.commit('GET_USER_FALG', res.result.btnStr)
            this.$router.push('/')
          } else {
            this.$toast.fail(res.message)
          }
        })
    }
  }
}
</script>

<style lang='scss' scoped>
.login{
  width: 100%;
  min-height: 100vh;
  padding: 40% 0 81%;
  background-color: #fff;
  .checkedpwd{
    padding: 20px 0;
  }
  .from-menu{
    padding: 0 46px;
    padding-bottom: 55px;
    h1{
      margin-top: 80px;
      text-align: center;
      font-size: 56px;
      font-weight: 600;
    }
    .user{
      padding-top: 20px;
    }
    .inp-menu{
      height: 62px;
      width: 100%;
      margin-top: 60px;
      input{
        width: 100%;
        height: 52px;
        color: #9B9B9B;
        font-size: 32px;
        line-height: 52px;
        border-bottom: 1px solid #DCDCDC;
      }
    }
    button{
      width: 100%;
      height:86px;
      margin-top: 40px;
      background:#3498db;
      border-radius:50px;
      font-size: 32px;
      color: #fff;
    }
  }
}
</style>
