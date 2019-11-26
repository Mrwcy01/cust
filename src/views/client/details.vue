<template>
  <div class="detailsClient">
    <div class="return clearfix">
      <p class="left">
        <van-icon
          size="20"
          name="arrow-left" />
      </p>
      <p class="left ret">返回</p>
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
              name="carlist"
              form="carform">
              <option value="volvo">河北</option>
              <option value="saab">北京</option>
            </select>
            <select
              name="carlist"
              form="carform">
              <option value="volvo">河北</option>
              <option value="saab">北京</option>
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
        </div>
        <button>更新客户信息</button>
      </div>
      <!-- 拜访记录 -->
      <div v-show="selet === 1">
        <div class="recording">
          <p>拜访方式：走访</p>
          <p>拜访目的：商谈意向</p>
          <p>拜访日期：2019-11-25</p>
          <p>意向吨位：33.0 ~ 40.0 吨以下</p>
          <p>意向数量：1</p>
          <p>意向类型：租车</p>
          <p>意向产品：挖掘机</p>
          <p>意向机型：斗山DX380LC-9C</p>
          <p>
            <span>资金：有</span>
            <span>工程：有</span>
            <span>意向：无</span>
            <span>竞争：有</span>
          </p>
          <p>预计日期：2019-12-12</p>
          <p>竞争产品：三一、凯斯</p>
          <p>客户关注商务条件：价格优惠、配件赠送</p>
          <p>赢单率：需特殊商务支持(35％)</p>
          <p>拜访总结：</p>
          <p>这里是总结</p>

        </div>
        <div class="recording">
          <p>拜访方式：走访</p>
          <p>拜访目的：商谈意向</p>
          <p>拜访日期：2019-11-25</p>
          <p>意向吨位：33.0 ~ 40.0 吨以下</p>
          <p>意向数量：1</p>
          <p>意向类型：租车</p>
          <p>意向产品：挖掘机</p>
          <p>意向机型：斗山DX380LC-9C</p>
          <p class="detap">
            <span>资金：有</span>
            <span>工程：有</span>
            <span>意向：无</span>
            <span>竞争：有</span>
          </p>
          <p class="detap">预计日期：2019-12-12</p>
          <p class="detap">竞争产品：三一、凯斯</p>
          <p class="detap">客户关注商务条件：价格优惠、配件赠送</p>
          <p class="detap">赢单率：需特殊商务支持(35％)</p>
          <p class="detap">拜访总结：</p>
          <p>这里是总结</p>
        </div>
      </div>
      <!-- 添加拜访记录 -->
      <div v-show="selet === 2">
        <div class="form">
          <p>
            <label for="male"><em>* &nbsp;</em>拜访方式</label>
            <br>
            <select
              name="carlist"
              form="carform">
              <option value="volvo">走访</option>
            </select>
          </p>
          <p>
            <label for="male"><em>* &nbsp;</em>拜访目的</label>
            <br>
            <select
              name="carlist"
              form="carform">
              <option value="volvo">商谈意向</option>
            </select>
          </p>
          <p class="clearfix">
            <van-checkbox
              v-model="checked"
              class="left checked"
              shape="square">资金</van-checkbox>
            <van-checkbox
              v-model="checked"
              class="left checked"
              shape="square">工程</van-checkbox>
            <van-checkbox
              v-model="checked"
              class="left checked"
              shape="square">意向</van-checkbox>
          </p>
          <p>
            <label for="male"><em>* &nbsp;</em>意向吨位</label>
            <br>
            <input
              type="text"
              placeholder="请填写意向吨位">
          </p>
          <p>
            <label for="male"><em>* &nbsp;</em>意向数量</label>
            <br>
            <input
              type="text"
              placeholder="请填写意向数量">
          </p>
          <p>
            <label for="male"><em>* &nbsp;</em>意向产品</label>
            <br>
            <input
              type="text"
              placeholder="请填写意向产品">
          </p>
          <p>
            <label for="male"><em>* &nbsp;</em>意向机型</label>
            <br>
            <select
              name="carlist"
              form="carform">
              <option value="volvo">东风</option>
            </select>
          </p>
          <p>
            <label for="male"><em>* &nbsp;</em>意向机型</label>
            <br>
            <select
              name="carlist"
              form="carform">
              <option value="volvo">东风</option>
            </select>
          </p>
          <div class="birthday">
            <label for="male"><em>* &nbsp;</em>预计日期</label>
            <br>
            <div
              class="input"
              @click="showPopup">
              <p v-if="form.birthday == ''">请选择生日</p>
              <p v-else>{{ form.birthday }}</p>

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
              v-model="checked"
              class="checked"
              shape="square">竞争</van-checkbox>
          </p>
          <p>
            <label for="male"><em>* &nbsp;</em>竞争产品1</label>
            <br>
            <input
              type="text"
              placeholder="请填写竞争产品">
          </p>
          <p>
            <label for="male"><em>* &nbsp;</em>竞争产品2</label>
            <br>
            <input
              type="text"
              placeholder="请填写竞争产品">
          </p>
          <p>
            <label for="male"><em>* &nbsp;</em>竞争产品3</label>
            <br>
            <input
              type="text"
              placeholder="请填写竞争产品">
          </p>
          <p>
            <label for="male"><em>* &nbsp;</em>客户关注商务条件1</label>
            <br>
            <input
              type="text"
              placeholder="请填写客户关注商务条件">
          </p>
          <p>
            <label for="male"><em>* &nbsp;</em>客户关注商务条件2</label>
            <br>
            <input
              type="text"
              placeholder="请填写客户关注商务条件">
          </p>
          <p>
            <label for="male"><em>* &nbsp;</em>拜访总结：</label>
            <br>
            <br>
            <van-cell-group>
              <van-field
                v-model="checked"
                rows="2"
                autosize
                type="textarea"
                placeholder="请填写拜访总结"
                show-word-limit />
            </van-cell-group>
          </p>
        </div>
        <button>添加拜访记录</button>
      </div>
    </div>
  </div>
</template>

<script>
import { DatetimePicker, Popup } from 'vant'
export default {
  name: 'DetailsClient',
  components: { DatetimePicker, Popup },
  data() {
    return {
      currentDate: null,
      show: false,
      checked: null,
      selet: 2,
      activeName: 'a',
      tabList: ['客户详情', '拜访记录', '添加拜访记录'],
      form: {
        username: '',
        birthday: ''
      }
    }
  },
  created() {
    this.getNowFormatDate()
  },
  methods: {
    getNowFormatDate() {
      var date = new Date()
      var year = date.getFullYear()
      var month = date.getMonth()
      var strDate = date.getDate()
      if (month >= 1 && month <= 9) {
        month = '0' + month
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = '0' + strDate
      }
      this.maxDate = new Date(parseInt(year), parseInt(month), parseInt(strDate))
    },
    chageTab(num) {
      this.selet = num
    },
    showPopup() {
      this.show = true
    },
    selectDate(date) {
      var month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
      var currentDate = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
      this.form.birthday = date.getFullYear() + '-' + month + '-' + currentDate
      this.show = false
    },
    quxiao() {
      this.show = false
    }
  }
}
</script>

<style lang='scss' scoped>
.detailsClient{
  // height: 100vh;
  padding: 60px 30px;
  .return{
    font-size: 30px;
    .ret{
      margin: 5px;
    }
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
        span{
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
