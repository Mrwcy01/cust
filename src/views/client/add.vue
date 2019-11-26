<template>
  <div class="addClient">
    <div class="return clearfix">
      <p class="left">
        <van-icon
          size="20"
          name="arrow-left" />
      </p>
      <p class="left ret">返回</p>
    </div>
    <h2>添加客户信息</h2>
    <form
      action="form"
      method="get">
      <p>
        <label for="male"><em>* &nbsp;</em>客户名称</label>
        <br>
        <input
          v-model="form.username"
          type="text"
          placeholder="请填写客户名称">
      </p>
      <p>
        <label for="male"><em>* &nbsp;</em>洽谈人</label>
        <br>
        <input
          v-model="form.username"
          type="text"
          placeholder="请填写洽谈人">
      </p>
      <p>
        <label for="male"><em>* &nbsp;</em>洽谈人电话</label>
        <br>
        <input
          v-model="form.username"
          type="text"
          placeholder="请填写洽谈人电话">
      </p>
      <p>
        <label for="male"><em>* &nbsp;</em>客户区域</label>
        <br>
        <select
          v-model="tree"
          @change="onTree(tree)">
          <option
            v-for="item in regionsTree"
            :key="item.Code"
            :value="item.Code">{{ item.Name }}</option>
        </select>
        <select>
          <option
            v-for="item in childrenTree"
            :key="item.Code"
            :value="item.Code">{{ item.Name }}</option>
        </select>
      </p>
      <p>
        <label for="male"><em>* &nbsp;</em>客户类型</label>
        <br>
        <select
          name="carlist"
          form="carform">
          <option value="volvo">竞对老客户</option>
          <option value="saab">新入行客户</option>
        </select>
      </p>
      <p>
        <label for="male"><em>* &nbsp;</em>客户类型</label>
        <br>
        <select
          name="carlist"
          form="carform">
          <option value="volvo">矿业能源</option>
          <option value="saab">建筑工程</option>
          <option value="saab">环保绿化</option>
        </select>
      </p>
    </form>
    <button @click="addClient">保存客户信息</button>
  </div>
</template>

<script>
import { getRegionsTree, getCust } from '@/api/client'
export default {
  name: 'AddClient',
  data() {
    return {
      form: {
        username: ''
      },
      regionsTree: [],
      childrenTree: [],
      tree: ''
    }
  },
  created() {
    this.getSelectTree()
  },
  methods: {
    // 添加客户
    addClient() {
      getCust()
        .then(res => {
          if (res.code == 200) {
            console.log(res.deta)
          }
        })
    },
    // 获取省市联动数据
    getSelectTree() {
      getRegionsTree()
        .then(res => {
          this.regionsTree = res[0].children
        })
    },
    // 带出子集联动数据
    onTree(obj) {
      this.regionsTree.forEach(item => {
        if (item.Code === obj) {
          this.childrenTree = item.children
        }
      })
    }
  }
}
</script>

<style lang='scss' scoped>
.addClient{
  height: 100vh;
  padding: 60px 30px;
  .return{
    font-size: 30px;
    .ret{
      margin: 5px;
    }
  }
  h2{
    font-size: 30px;
    font-weight: 700;
    padding: 40px 0;
  }
  em{
    color: red;
  }
  form{
    margin-top: 10px;
    p{
      margin-top: 40px;
    }
    label{
      font-size: 30px;
    }
    input{
      width: 100%;
      margin-top: 20px;
      padding: 25px 0;
      font-size: 26px;
      border-bottom: 1px solid #e4e4e4;
    }
    select{
      margin-top: 25px;
      width: 250px;
      margin-right: 40px;
    }
  }
  button{
    width: 100%;
    height: 100px;
    text-align: center;
    color: #fff;
    background-color: #3498db;
    font-size: 30px;
    border-radius: 50px;
    margin-top: 60px;
  }
}
</style>
