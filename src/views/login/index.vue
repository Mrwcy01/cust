<template>
  <div class="login">
    <div class="from-menu">
      <h1>客户管理系统</h1>
      <div class="inp-menu user">
        <input
          v-model="from.username"
          type="text"
          placeholder="请输入手机号">
      </div>
      <div class="inp-menu pwd">
        <input
          v-model="from.password"
          type="password"
          placeholder="请输入密码">
      </div>
      <button @click="goHome()">登录</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      from: {
        username: '',
        password: ''
      }

    }
  },
  created() {

  },
  methods: {
    goHome() {

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
