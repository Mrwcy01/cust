import request from '@/utils/request'

/** 省市联动 */
export const getRegionsTree = (params) => request({
  url: '/region/GetRegionsTree',
  method: 'GET',
  params
})

// 登录
export const getLogin = (data) => request({
  url: '/Login/PostF',
  method: 'POST',
  data
})

// 我的客户及今日拜访
export const getMyCustCountTodayVisit = (params) => request({
  url: '/Cust/getMyCustCountTodayVisit',
  method: 'GET',
  params
})

// 客户维护（新增及修改）
export const getCust = (data) => request({
  url: '/Cust/PostCust',
  method: 'POST',
  data
})

// 客户列表查询
export const getCustList = (params) => request({
  url: '/Cust/GetCustListF',
  method: 'GET',
  params
})

// 客户查询详细
export const getCustDetails = (params) => request({
  url: '/Cust/GetCustDet',
  method: 'GET',
  params
})

// 拜访日志维护（添加及修改）
export const getAddLog = (data) => request({
  url: '/VisitLog/PostLog',
  method: 'POST',
  data
})

//  拜访日志列表
export const getLogList = (params) => request({
  url: '/VisitLog/GetVLogListF',
  method: 'GET',
  params
})

// 我的客户下拉列表
export const getMycustsList = (params) => request({
  url: '/cust/getMycustsDDL',
  method: 'GET',
  params
})

// 修改密码
export const getChangePwd = (data) => request({
  url: '/Login/ChangePwd',
  method: 'POST',
  data
})
