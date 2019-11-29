<template>
  <div class="client">
    <div class="hello clearfix">
      <span class="name">{{ userName }},您好</span>
      <span
        class="logout"
        @click="onLogout">注销登录</span>
      <span
        class="icon right"
        @click="getRefresh()">
        <van-icon
          size="20px"
          color="#ccc"
          name="replay" />
      </span>
    </div>
    <div class="addClient clearfix">
      <div class="left">
        <p class="num">{{ todayVisit }}</p>
        <p>今日拜访</p>
      </div>
      <div class="left me">
        <p class="num">{{ myCust }}</p>
        <p>我的客户</p>
      </div>
      <div
        class="right add"
        @click="addClient">
        <p class="addIcon">
          <van-icon
            size="30px"
            color="#76c8ff"
            name="add-o" />
        </p>
        <p>添加客户</p>
      </div>
    </div>
    <div class="clientList">
      <h2>客户列表</h2>
      <div class="search">
        <input
          v-model="parameter.keywords"
          type="text"
          placeholder="请输入要搜索得客户名称">
        <button @click="MoreList(1)">查找</button>
      </div>
      <list
        v-model="fansLoading"
        :finished="fansFinished"
        finished-text="已加载全部"
        @load="MoreList">
        <div
          v-for="item in list"
          :key="item.Id"
          class="list"
          @click="onClientDetails(item.Id)">
          <h3>{{ item.CName }}</h3>
          <div class="msg">
            <span class="name">{{ item.MeetPerson }}</span>
            <span class="phone">{{ item.MeetPersonNo }}</span>
          </div>
          <p>行业类型：{{ item.ProfType }}</p>
          <p>客户类型：{{ item.CType }}</p>
          <p>客户区域：{{ item.City }}/{{ item.County }}</p>
          <p>与客户关系：{{ item.Relation }}</p>
        </div>
      </list>
      <p
        v-if="list.length === 0"
        class="noList">暂无客户信息</p>
    </div>
  </div>
</template>

<script>
import { Dialog, List } from 'vant'
import { getCustList, getMyCustCountTodayVisit } from '@/api/client'
export default {
  name: 'Client',
  components: {
    List
  },
  data() {
    return {
      fansLoading: false,
      fansFinished: false,
      userName: '',
      list: [],
      keyWord: '',
      myCust: null,
      todayVisit: null,
      parameter: {
        keywords: '',
        currpage: 1, // 当前页
        pagesize: 10, // 每页多少条
        auth: true
      }
    }
  },
  created() {
    this.getMyCustCountTodayVisit()
    this.userName = this.$store.state.userInfo
  },
  methods: {
    MoreList(num) {
      this.fansLoading = true
      if (num) {
        this.list = []
        this.parameter.currpage = 1
      }
      getCustList(this.parameter)
        .then((res) => {
          if (res.code === 200) {
            this.parameter.currpage === 1 ? this.list = res.result : this.list = this.list.concat(res.result)
            // 判读是否加载到最后一页
            this.parameter.currpage >= res.total / 10 ? this.fansFinished = true : this.parameter.currpage++
            // 请求完毕后隐藏正在 加载样式
            this.fansLoading = false
          }
        })
    },
    // 注销登录
    onLogout() {
      Dialog.confirm({
        message: '确认退出吗？'
      }).then(() => {
        this.$store.commit('logout')
        this.$router.push({
          path: '/login'
        })
      }).catch(() => {
        // on cancel
      })
    },
    // 我的客户及拜访记录
    getMyCustCountTodayVisit() {
      getMyCustCountTodayVisit()
        .then(res => {
          if (res.code === 200) {
            this.myCust = res.result.ucount
            this.todayVisit = res.result.vcount
          }
        })
    },
    // 列表详情
    onClientDetails(falg) {
      this.$router.push({
        path: '/detailsClient',
        query: {
          id: falg
        }
      })
    },
    // 添加客户
    addClient() {
      this.$router.push({
        path: '/addClient'
      })
    },
    getList() {
      getCustList()
        .then(res => {
          if (res.code === 200) {
            this.list = res.result
          }
        })
    },
    getRefresh() {
      this.$router.go(0)
    }
  }
}
</script>

<style lang='scss' scoped>
.client{
  width: 100%;
  min-height: 100vh;
  background-color: #fff;
  .hello{
    padding: 60px 42px;
    .name{
      font-size: 32px;
      font-weight: 700;
    }
    .logout{
      margin-left: 40px;
      color: #84d7ff;
      font-size: 24px;
    }
  }
  .addClient{
    text-align: center;
    padding: 20px 40px;
    p{
      font-size: 30px;
    }
    .num{
      padding-bottom: 30px;
      font-size: 30px;
    }
    .me{
      margin-left: 22%;
    }
    .add{
      color: #76c8ff;
      .addIcon{
        padding-bottom: 5px;
      }
    }
  }
  .clientList{
    padding: 60px 40px;
    h2{
      font-size: 32px;
      font-weight: 700;
      margin-bottom: 25px;
    }
    .search{
      input{
        width: 75%;
        height: 52px;
        color: #9B9B9B;
        font-size: 28px;
        line-height: 52px;
        padding-bottom: 15px;
        border-bottom: 1px solid #DCDCDC;
      }
      button{
        width: 100px;
        height: 60px;
        background-color: #3498db;
        color: #ffffff;
        margin-left: 10px;
        border-radius: 10px;
      }
    }
    .list{
      padding: 60px 0;
      border-bottom: 1px solid #ccc;
      h3{
        font-size: 38px;
        font-weight: 700;
      }
      .msg{
        padding: 20px 0;
        font-size: 18px;
        .phone{
          margin-left: 10%;
          color: #3498db;
        }
      }
      p{
        color: #999;
        font-size: 20px;
        padding: 5px 0;
      }
    }
  }
}
</style>

<style lang="scss">
  .van-dialog{
    width: 70%;
    height: 15%;
    .van-dialog__content{
      height: 65%;
      padding-top: 10%;
      text-align: center;
      .van-dialog__message{
      text-align: center;

      }
    }
    .van-dialog__footer--buttons{
      height: 35%;
      .van-button{
        width: 50%;
        height: 100%;
      }
    }
  }
</style>
