// pages/home/mybooking/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showPage: false,
    page: 1,
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
      apiUrl: '/Home/mybooking'
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

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    let requestParams = {
      apiUrl: '/Home/mybooking',
      requestData: { page: parseInt(this.data.page) + 1 }
    }
    app.ajax(requestParams).then(res => {
      this.setData({
        page: res.data.page,
        total: res.data.total,
        hasMore: res.data.hasMore,
        list: res.data.list
      })
    })
  }


})