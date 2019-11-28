<template>
  <div class="addClient">
    <div class="return clearfix">
      <div @click="getBack">
        <p class="left">
          <van-icon
            size="20"
            name="arrow-left" />
        </p>
        <p class="left ret">返回</p>
      </div>
    </div>
    <h2>添加客户信息</h2>
    <form
      action="form"
      method="get">
      <p>
        <label for="male"><em>* &nbsp;</em>客户名称</label>
        <br>
        <input
          v-model="cust.CName"
          type="text"
          placeholder="请填写客户名称">
      </p>
      <p>
        <label for="male"><em>* &nbsp;</em>洽谈人</label>
        <br>
        <input
          v-model="cust.MeetPerson"
          type="text"
          placeholder="请填写洽谈人">
      </p>
      <p>
        <label for="male"><em>* &nbsp;</em>洽谈人电话</label>
        <br>
        <input
          v-model="cust.MeetPersonNo"
          type="text"
          placeholder="请填写洽谈人电话">
      </p>
      <p>
        <label for="male"><em>* &nbsp;</em>与客户关系</label>
        <br>
        <input
          v-model="cust.Relation"
          type="text"
          placeholder="请填写与客户关系">
      </p>
      <p>
        <label for="male"><em>* &nbsp;</em>客户区域</label>
        <br>
        <select
          v-model="cust.CityCode"
          @change="onTree(cust.CityCode)">
          <option
            disabled
            value="">请选择</option>
          <option
            v-for="item in regionsTree"
            :key="item.Code"
            :value="item.Code">{{ item.Name }}</option>
        </select>
        <select
          v-model="cust.CountyCode"
          @change="onChildTree(cust.CountyCode)">
          <option
            disabled
            value="">请选择</option>
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
          v-model="cust.CType"
          name="carlist"
          form="carform">
          <option value="竞对老客户">竞对老客户</option>
          <option value="新入行客户">新入行客户</option>
        </select>
      </p>
      <p>
        <label for="male"><em>* &nbsp;</em>行业类型</label>
        <br>
        <select v-model="cust.ProfType">
          <option value="矿业能源">矿业能源</option>
          <option value="建筑工程">建筑工程</option>
          <option value="环保绿化">环保绿化</option>
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
      cust: {
        id: -1,
        CName: '', // 客户名称
        CityCode: '', // 市编码
        City: '', // 市名
        CountyCode: '', // 县编码
        County: '', // 县名
        ProfType: '矿业能源', // 行业类型
        CType: '竞对老客户', // 客户类型
        MeetPersonNo: '', // 洽谈人电话
        MeetPerson: '', // 洽谈人
        Relation: '' // 与客户关系
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
    isvalidPhoneNum(str) {
      const reg = /^1[3456789]\d{9}$/
      return reg.test(str)
    },
    // 返回
    getBack() {
      this.$router.back()
    },
    // 添加客户
    addClient() {
      if (this.cust.CName === '') {
        this.$toast.fail('请填写客户名称')
        return false
      }
      if (this.cust.MeetPerson === '') {
        this.$toast.fail('请填写洽谈人')
        return false
      }
      if (this.cust.MeetPersonNo === '') {
        this.$toast.fail('请填写洽谈人电话')
        return false
      } else {
        if (!this.isvalidPhoneNum(this.cust.MeetPersonNo)) {
          this.$toast.fail('洽谈人电话不符合格式')
          return false
        }
      }
      if (this.cust.Relation === '') {
        this.$toast.fail('请填写与客户关系')
      }
      if (this.cust.CityCode === '' || this.cust.CountyCode === '') {
        this.$toast.fail('请选择客户区域')
        return false
      }
      getCust(this.cust)
        .then(res => {
          if (res.code === 200) {
            this.$toast.success('添加成功')
            this.$router.push({
              path: '/'
            })
          } else {
            this.$toast.fail(res.message)
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
          this.cust.City = item.Name
          this.childrenTree = item.children
        }
      })
    },
    // 获取区域名称
    onChildTree(val) {
      this.childrenTree.forEach(item => {
        if (item.Code === val) {
          this.cust.County = item.Name
        }
      })
    }
  }
}
</script>

<style lang='scss' scoped>
.addClient{
  min-height: 100vh;
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
