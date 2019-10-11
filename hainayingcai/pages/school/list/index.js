// pages/article/list/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showPage: false,
    list: [],
    pageInfo:{page:1}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let requestParams = {
      apiUrl: '/School/index',
      requestData: { }
    }

    app.ajax(requestParams).then(res => {
      this.setData({
        showPage: true,
        list: res.data.list,
        pageInfo:res.data.pageInfo
      })
    })

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
    let requestParams = {
      apiUrl: '/School/index',
      requestData: {}
    }

    app.ajax(requestParams).then(res => {
      wx.stopPullDownRefresh()
      this.setData({
        list: res.data.list,
        pageInfo: res.data.pageInfo
      })
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (pageInfo.total <= (pageInfo.pageSize * pageInfo.page)) {
      return
    }
      let requestParams = {
        apiUrl: '/School/vlist',
        requestData: {
          page: parseInt(this.data.pageInfo.page) + 1
        }
      }
      app.ajax(requestParams).then(res => {
        this.setData({
          list: this.data.list.concat(res.data.list),
          pageInfo:res.data.pageInfo
        })
      })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})