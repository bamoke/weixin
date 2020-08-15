// pages/home/coupon/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showPage:false,
    list:[],
    page:1,
    total:0,
    hasMore:false
  },

  onShow: function () {
    let requestParams = {
      apiUrl: '/Coupon/vlist',
      requestData: {}
    }
    app.ajax(requestParams).then(res => {
      this.setData({
        showPage: true,
        page: res.data.page,
        total: res.data.total,
        hasMore: res.data.hasMore,
        list: res.data.list
      })
    })
  },
  onReachBottom: function () {
    if (!this.data.hasMore) return
    let requestParams = {
      apiUrl: '/Coupon/vlist',
      requestData: {page: parseInt(this.data.page) + 1 }
    }
    app.ajax(requestParams).then(res => {
      this.setData({
        page: res.data.page,
        total: res.data.total,
        hasMore: res.data.hasMore,
        list: this.data.list.concat(res.data.list)
      })
    })

  }
})