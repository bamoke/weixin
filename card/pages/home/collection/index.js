// pages/collection/list/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showPage: false,
    page: 1,
    hasMore: false,
    total: 0,
    list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let requestParams = {
      apiUrl: '/Collection/vlist',
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
      apiUrl: '/Collection/vlist',
      requestData: { page: parseInt(this.data.page) + 1 }
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