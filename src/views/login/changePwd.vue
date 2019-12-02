<template>
  <div class="change-pwd">
    <div class="from-menu">
      <h1>修改密码</h1>
      <div class="inp-menu user">
        <input
          v-model="ChangePwdRequest.LoginName"
          type="text"
          placeholder="请输入账号">
      </div>
      <div class="inp-menu">
        <input
          v-model="ChangePwdRequest.OldPwd"
          type="password"
          placeholder="请输入旧密码">
      </div>
      <div class="inp-menu">
        <input
          v-model="ChangePwdRequest.NewPwd"
          type="password"
          placeholder="请输入新密码">
      </div>
      <button @click="onChangePwd()">确认</button>
    </div>
  </div>
</template>

<script>
import { getChangePwd } from '@/api/client'

export default {
  name: 'ChangePwd',
  data() {
    return {
      ChangePwdRequest: {
        LoginName: '',
        OldPwd: '',
        NewPwd: ''
      }
    }
  },
  created() {

  },
  methods: {
    onChangePwd() {
      if (!this.ChangePwdRequest.LoginName) {
        this.$toast.fail('请输入账户')
        return false
      }
      if (!this.ChangePwdRequest.OldPwd) {
        this.$toast.fail('请输入旧密码')
        return false
      }
      if (!this.ChangePwdRequest.NewPwd) {
        this.$toast.fail('请输入新密码')
        return false
      }
      getChangePwd(this.ChangePwdRequest)
        .then(res => {
          if (res.code === 200) {
            this.$toast.success('修改成功，请重新登陆')
            this.$store.commit('logout')
            this.$router.push({
              path: '/login'
            })
          } else {
            this.$toast.fail(res.message)
          }
        })
    }
  }
}
</script>

<style lang='scss' scoped>
.change-pwd{
  width: 100%;
  min-height: 100vh;
  .from-menu{
    padding: 0 46px;
    padding-top: 155px;
    h1{
      padding-top: 80px;
      text-align: center;
      font-size: 56px;
      font-weight: 600;
      padding-bottom: 20px;
    }
    .inp-menu{
      height: 50px;
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

