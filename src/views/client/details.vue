<template>
  <div class="detailsClient">
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
    <ul class="tab-title clearfix">
      <li
        v-for="(item,index) in tabList"
        :key="index"
        :class="index === selet?'active':''"
        @click="chageTab(index)">{{ item }}</li>
    </ul>
    <div class="tab-content">
      <!-- 客户详情 -->
      <div v-show="selet === 0">
        <div class="form">
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
                v-for="item in regionsTree"
                :key="item.Code"
                :value="item.Code">{{ item.Name }}</option>
            </select>
            <select
              v-model="cust.CountyCode"
              @change="onChildTree(cust.CountyCode)">
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
        </div>
        <button @click="addClient">更新客户信息</button>
      </div>
      <!-- 拜访记录 -->
      <div v-show="selet === 1">
        <list
          v-model="fansLoading"
          :finished="fansFinished"
          finished-text="已加载全部"
          @load="MoreList">
          <div
            v-for="item in logList"
            :key="item.id"
            class="recording">
            <p>拜访方式：{{ item.VisitWay }}</p>
            <p>拜访目的：{{ item.VisitPurpose }}</p>
            <p>拜访日期：{{ splitStr(item.VisitDate) }}</p>
            <p>意向吨位：{{ item.Tonnage }}</p>
            <p>意向数量：{{ item.IntentCount }}</p>
            <p>意向类型：{{ item.TargetCate }}</p>
            <p>意向产品：{{ item.TargetProduct }}</p>
            <p>意向机型：{{ item.MachineCate }}</p>
            <p>
              <span>资金：<span :class="item.HasMoney === 1 ? 'green' : 'red'">{{ item.HasMoney === 1 ? '有' : "无" }}</span></span>
              <span>工程：<span :class="item.HasProject === 1 ? 'green' : 'red'">{{ item.HasProject === 1 ? '有' : "无" }}</span></span>
              <span>意向：<span :class="item.HasIntention === 1 ? 'green' : 'red'">{{ item.HasIntention === 1 ? '有' : "无" }}</span></span>
              <span>竞争：<span :class="item.HasCompete === 1 ? 'green' : 'red'">{{ item.HasCompete === 1 ? '有' : "无" }}</span></span>
            </p>
            <p>预计日期：{{ splitStr(item.PrePurchaseDate) }}</p>
            <p>竞争产品：{{ item.CompeProd1 }} &nbsp; {{ item.CompeProd2 }} &nbsp; {{ item.CompeProd3 }}</p>
            <p>客户关注商务条件：{{ item.Condition1 }} &nbsp; {{ item.Condition2 }}</p>
            <!-- <p>赢单率：{{ item.WinRate }}</p> -->
            <p>拜访总结：</p>
            <p>{{ item.VisitSummary }}</p>
          </div>
        </list>

      </div>
      <!-- 添加拜访记录 -->
      <div v-show="selet === 2">
        <div class="form">
          <!-- <p>
            <label for="male"><em>* &nbsp;</em>客户名称</label>
            <br>
            <select v-model="getLog.CId">
              <option
                v-for="item in userNameList"
                :key="item.Id"
                :value="item.Id">{{ item.CName }}</option>
            </select>
          </p> -->
          <p>
            <label for="male"><em>* &nbsp;</em>拜访方式</label>
            <br>
            <select v-model="getLog.VisitWay">
              <option value="走访">走访</option>
            </select>
          </p>
          <p>
            <label for="male"><em>* &nbsp;</em>拜访目的</label>
            <br>
            <select v-model="getLog.VisitPurpose">
              <option value="商谈意向">商谈意向</option>
              <option value="客情维护">客情维护</option>
            </select>
          </p>
          <div class="birthday">
            <label for="male"><em>* &nbsp;</em>拜访日期</label>
            <br>
            <div
              class="input"
              @click="showDate">
              <p v-if="getLog.VisitDate == ''">请选择拜访日期</p>
              <p v-else>{{ VisitDate }}</p>
            </div>
            <span @click="showDate" />
            <Popup
              v-model="date"
              position="bottom"
              :style="{ height: '20%' }">
              <DatetimePicker
                v-model="visitCurrentDate"
                type="date"
                @confirm="visitSelectDate"
                @cancel="xiaoDate" />
            </Popup>
          </div>
          <p class="clearfix">
            <van-checkbox
              v-model="getLog.HasMoney"
              class="left checked"
              shape="square">资金</van-checkbox>
            <van-checkbox
              v-model="getLog.HasProject"
              class="left checked"
              shape="square">工程</van-checkbox>
            <van-checkbox
              v-model="getLog.HasIntention"
              class="left checked"
              shape="square">意向</van-checkbox>
          </p>
          <p>
            <label for="male"><em>* &nbsp;</em>意向类型</label>
            <br>
            <select v-model="getLog.TargetCate">
              <option value="租车">租车</option>
              <option value="二手机">二手机</option>
              <option value="新机">新机</option>
              <option value="其他">其他</option>
            </select>
          </p>
          <p>
            <label for="male"><em>* &nbsp;</em>意向吨位</label>
            <br>
            <input
              v-model="getLog.Tonnage"
              type="text"
              placeholder="请填写意向吨位">
          </p>
          <p>
            <label for="male"><em>* &nbsp;</em>意向数量</label>
            <br>
            <input
              v-model.number="getLog.IntentCount"
              type="text"
              placeholder="请填写意向数量"
              @blur="num(getLog.IntentCount)">
          </p>
          <p>
            <label for="male"><em>* &nbsp;</em>意向产品</label>
            <br>
            <input
              v-model="getLog.TargetProduct"
              type="text"
              placeholder="请填写意向产品">
          </p>
          <p>
            <label for="male"><em>* &nbsp;</em>意向机型</label>
            <br>
            <input
              v-model="getLog.MachineCate"
              type="text"
              placeholder="请填写意向产品">
          </p>
          <div class="birthday">
            <label for="male"><em>* &nbsp;</em>预计日期</label>
            <br>
            <div
              class="input"
              @click="showPopup">
              <p v-if="getLog.PrePurchaseDate == ''">请选择预计日期</p>
              <p v-else>{{ PrePurchaseDate }}</p>
            </div>
            <span @click="showPopup" />
            <Popup
              v-model="show"
              position="bottom"
              :style="{ height: '20%' }">
              <DatetimePicker
                v-model="currentDate"
                type="date"
                @confirm="selectDate"
                @cancel="quxiao" />
            </Popup>
          </div>
          <p>
            <van-checkbox
              v-model="getLog.HasCompete"
              class="checked"
              shape="square">竞争</van-checkbox>
          </p>
          <p>
            <label for="male"><em>* &nbsp;</em>竞争产品1</label>
            <br>
            <input
              v-model="getLog.CompeProd1"
              type="text"
              placeholder="请填写竞争产品">
          </p>
          <p>
            <label for="male"><em>* &nbsp;</em>竞争产品2</label>
            <br>
            <input
              v-model="getLog.CompeProd2"
              type="text"
              placeholder="请填写竞争产品">
          </p>
          <p>
            <label for="male"><em>* &nbsp;</em>竞争产品3</label>
            <br>
            <input
              v-model="getLog.CompeProd3"
              type="text"
              placeholder="请填写竞争产品">
          </p>
          <p>
            <label for="male"><em>* &nbsp;</em>客户关注商务条件1</label>
            <br>
            <input
              v-model="getLog.Condition1"
              type="text"
              placeholder="请填写客户关注商务条件">
          </p>
          <p>
            <label for="male"><em>* &nbsp;</em>客户关注商务条件2</label>
            <br>
            <input
              v-model="getLog.Condition2"
              type="text"
              placeholder="请填写客户关注商务条件">
          </p>
          <p>
            <label for="male"><em>* &nbsp;</em>拜访总结：</label>
            <br>
            <br>
            <van-cell-group>
              <van-field
                v-model="getLog.VisitSummary"
                rows="2"
                autosize
                type="textarea"
                placeholder="请填写拜访总结"
                show-word-limit />
            </van-cell-group>
          </p>
        </div>
        <button @click="addLog">添加拜访记录</button>
      </div>
    </div>
  </div>
</template>

<script>
import { DatetimePicker, Popup, List } from 'vant'
import { getMycustsList, getRegionsTree, getCust, getAddLog, getCustDetails, getLogList } from '@/api/client'

export default {
  name: 'DetailsClient',
  components: { DatetimePicker, Popup, List },
  data() {
    return {
      PrePurchaseDate: null,
      VisitDate: null,
      fansLoading: false,
      fansFinished: false,
      visitCurrentDate: null,
      date: false,
      cust: {},
      getLog: {
        Id: -1,
        CId: this.$route.query.id,
        VisitWay: '走访', // 拜访方式
        VisitPurpose: '商谈意向', // 拜访目的
        VisitDate: '', // 拜访日期
        VisitSummary: '', // 拜访总结
        HasMoney: 0, // 有资金(1:有 0：无)
        HasProject: 0, // 有项目(1:有 0：无)
        HasCompete: 0, // 有竞争(1:有 0：无)
        HasIntention: 0, // 有意向(1:有 0：无)
        // WinRate: '', // 赢单率
        Tonnage: '', // 意向吨位
        IntentCount: null, // 意向数量
        PrePurchaseDate: '', // 预计日期
        TargetCate: '租车', // 意向类型
        TargetProduct: '', // 意向产品
        MachineCate: '', // 意向机型
        CompeProd1: '', // 竞品1
        CompeProd2: '', // 竞品2
        CompeProd3: '', // 竞品3
        Condition1: '', // 条件1
        Condition2: ''
      },
      regionsTree: [],
      childrenTree: [],
      currentDate: null,
      show: false,
      selet: 0,
      tabList: ['客户详情', '拜访记录', '添加拜访记录'],
      logList: [],
      parameter: {
        currpage: 1, // 当前页
        pagesize: 10, // 每页多少条
        auth: true
      },
      userNameList: []
    }
  },
  created() {
    this.getCustDetails()
    this.MoreList()
    this.getMycustsSelect()
  },
  methods: {
    splitStr(str) {
      return str.split('T')[0]
    },
    isvalidPhoneNum(str) {
      const reg = /^1[3456789]\d{9}$/
      return reg.test(str)
    },
    // 客户选择下拉
    getMycustsSelect() {
      getMycustsList()
        .then(res => {
          this.userNameList = res.result
        })
    },
    MoreList() {
      this.fansLoading = true
      getLogList(this.parameter)
        .then((res) => {
          if (res.code === 200) {
            this.parameter.currpage === 1 ? this.logList = res.result : this.logList = this.logList.concat(res.result)
            // 判读是否加载到最后一页
            this.parameter.currpage >= res.total / 10 ? this.fansFinished = true : this.parameter.currpage++
            // 请求完毕后隐藏正在 加载样式
            this.fansLoading = false
          }
        })
    },
    // 客户详情
    getCustDetails() {
      getCustDetails({ id: this.$route.query.id })
        .then(res => {
          if (res.code === 200) {
            this.cust = res.result
            this.getSelectTree()
          } else {
            this.$toast.fail(res.message)
          }
        })
    },
    num() {
      if (!Number(this.getLog.IntentCount) || Number(this.getLog.IntentCount) < 0) {
        this.getLog.IntentCount = null
      }
    },
    // 添加拜访记录
    addLog() {
      if (this.getLog.VisitDate === '') {
        this.$toast.fail('请选择拜访日期')
        return false
      }
      if (this.getLog.Tonnage === '') {
        this.$toast.fail('请填写意向吨位')
        return false
      }
      if (this.getLog.IntentCount === null) {
        this.$toast.fail('请填写意向数量')
        return false
      }
      if (this.getLog.PrePurchaseDate === '') {
        this.$toast.fail('请选择预计日期')
        return false
      }
      if (this.getLog.TargetProduct === '') {
        this.$toast.fail('请填写意向产品')
        return false
      }
      if (this.getLog.MachineCate === '') {
        this.$toast.fail('请填写意向机型')
        return false
      }
      if (this.getLog.CompeProd1 === '' && this.getLog.CompeProd2 === '' && this.getLog.CompeProd3 === '') {
        this.$toast.fail('请填写竞争产品')
        return false
      }
      if (this.getLog.Condition1 === '' && this.getLog.Condition2 === '') {
        this.$toast.fail('请填写客户关注条件')
        return false
      }
      if (this.getLog.VisitSummary === '') {
        this.$toast.fail('请填写拜访总结')
        return false
      }
      if (this.getLog.HasMoney === true) {
        this.getLog.HasMoney = 1
      } else {
        this.getLog.HasMoney = 0
      }
      if (this.getLog.HasProject === true) {
        this.getLog.HasProject = 1
      } else {
        this.getLog.HasProject = 0
      }
      if (this.getLog.HasIntention === true) {
        this.getLog.HasIntention = 1
      } else {
        this.getLog.HasIntention = 0
      }
      if (this.getLog.HasCompete === true) {
        this.getLog.HasCompete = 1
      } else {
        this.getLog.HasCompete = 0
      }
      getAddLog(this.getLog)
        .then(res => {
          if (res.code === 200) {
            this.$toast.success('添加成功')
          } else {
            this.$toast.fail(res.message)
          }
        })
    },
    // 更新客户
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
          if (res.result === 1) {
            this.$toast.success('添加成功')
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
          this.regionsTree.forEach(item => {
            if (item.Code === this.cust.CityCode) {
              this.cust.City = item.Name
              this.childrenTree = item.children
            }
          })
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
    },
    chageTab(num) {
      this.selet = num
    },
    showPopup() {
      this.show = true
    },
    // 拜访日期
    visitSelectDate(date) {
      var month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
      var currentDate = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
      this.VisitDate = date.getFullYear() + '-' + month + '-' + currentDate
      this.getLog.VisitDate = date.getFullYear() + '-' + month + '-' + currentDate + ' 01:00:00'
      this.date = false
    },
    // 预计日期
    selectDate(date) {
      var month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
      var currentDate = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
      this.PrePurchaseDate = date.getFullYear() + '-' + month + '-' + currentDate
      this.getLog.PrePurchaseDate = date.getFullYear() + '-' + month + '-' + currentDate + ' 01:00:00'
      this.show = false
    },
    quxiao() {
      this.show = false
    },
    // 返回
    getBack() {
      this.$router.back()
    },
    showDate() {
      this.date = true
    },
    xiaoDate() {
      this.date = false
    }

  }
}
</script>

<style lang='scss' scoped>
.detailsClient{
  min-height: 100vh;
  padding: 60px 30px;
  .return{
    font-size: 30px;
    .ret{
      margin: 5px;
    }
  }
  .green{
    color: green,
  }
  .red{
    color: red,
  }
  .tab-title{
    padding: 50px 0;
    margin-left: 10px;
    li{
      float: left;
      font-size:28px;
      margin-right: 30px;
      color: #0066ff;
    }
  }
  .active{
    color: #000 !important;
    font-weight: 700;
  }
  .tab-content{
    padding: 0px 30px;
    // 客户详情
    em{
      color: red;
    }
    .form{
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
    // 拜访记录
    .recording{
      padding-bottom: 40px;
      border-bottom: 1px solid #ccc;
      margin-bottom: 40px;
      p{
        font-size: 26px;
        line-height: 38px;
        >span{
          margin-right: 45px;
        }
      }
      .detap{
        padding-bottom: 10px;
        span{
          margin-right: 45px;
        }
      }
    }
    .checked{
      margin-right: 40px;
      height: 30px;
      line-height: 30px;
    }
    .birthday{
        position: relative;
        margin-top: 40px;
        .input{
          width: 250px;
          height: 40px;
          margin-top: 20px;
          position: relative;
          font-size: 28px;
          line-height: 40px;
          background-color: #fff;
          border: 1px solid #ccc;
          >p{
            font-size: 28px;
            line-height: 38px;
            margin-top: 2px;
            margin-left: 5px;
            // position: absolute;
          }
        }
        >span{
          width:0;
          height:0;
          display: block;
          border-right:9px solid transparent;
          border-left:9px solid transparent;
          border-top:9px solid #333;
          position: absolute;
          left:220px;
          bottom: 12px;
        }
      }
  }

}

</style>
<style  lang='scss'>
.detailsClient{
  .van-ellipsis{
    line-height: 100px;
    font-size: 30px;
  }
  .van-picker__confirm{
    font-size: 30px;
  }
  .van-picker__cancel{
    font-size: 30px;
  }
  .van-radio__icon{
    height: 32px !important;
    width: 32px !important;
    border-radius: 50%;
  }
  .van-radio{
    margin-right: 106px;
  }
  .van-popup {
    height: 30% !important;
  }
  .van-hairline--top-bottom{
    padding-top: 20px;
    padding-bottom: 40px !important;
  }
  .van-ellipsis{
    line-height: 100px;
    font-size: 30px;
  }
}
</style>
