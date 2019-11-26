import request from '@/utils/request'

/** 省市联动 */
export const getRegionsTree = (params) => request({
  url: '/region/GetRegionsTree',
  method: 'GET',
  params
})

// 客户维护（新增及修改）
export const getCust = (data) => request({
  url: '/Cust/PostCust',
  method: 'POST',
  data
})
