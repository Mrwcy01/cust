<template>
  <div class="client">
    <div class="hello clearfix">
      <span class="name">XXX,您好</span>
      <span class="logout">注销登录</span>
      <span class="icon right">
        <van-icon
          size="20px"
          color="#ccc"
          name="replay" />
      </span>
    </div>
    <div class="addClient clearfix">
      <div class="left">
        <p class="num">0</p>
        <p>今日拜访</p>
      </div>
      <div class="left me">
        <p class="num">20</p>
        <p>我的客户</p>
      </div>
      <div class="right add">
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
          v-model="userName"
          type="text"
          placeholder="请输入要搜索得客户名称">
        <button>查找</button>
      </div>
      <div class="list">
        <h3>山东一路通工程机械有限公司</h3>
        <div class="msg">
          <span class="name">吉奥</span>
          <span class="phone">110</span>
        </div>
        <p>行业类型：矿业能源</p>
        <p>客户类型：竞对老客户</p>
        <p>客户区域：朔州市/朔城区</p>
        <p>与客户关系：XXX</p>
      </div>
      <div class="list">
        <h3>山东一路通工程机械有限公司</h3>
        <div class="msg">
          <span class="name">吉奥</span>
          <span class="phone">110</span>
        </div>
        <p>行业类型：矿业能源</p>
        <p>客户类型：竞对老客户</p>
        <p>客户区域：朔州市/朔城区</p>
        <p>与客户关系：XXX</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Client',
  data() {
    return {
      userName: ''
    }
  },
  created() {

  },
  methods: {

  }
}
</script>

<style lang='scss' scoped>
.client{
  width: 100%;
  height: 100vh;
  background-color: #fff;
  .hello{
    padding: 60px 42px;
    .name{
      font-size: 32px;
      font-weight: 700;
    }
    .logout{
      margin-left: 30px;
      color: #84d7ff;
      font-size: 21px;
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
        width: 80%;
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
        margin-left: 10px;
        color: #ffffff;
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

