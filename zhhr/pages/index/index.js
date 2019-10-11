//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    showPage: true,
    bannerList: [],
    articleList: []
  },

  /**
   * handle
   */

  //事件处理函数
  onShow: function() {
    let requestParams = {
      apiUrl: '/Index/index',
      requestData: {},
      showLoading: false
    }
    wx.showNavigationBarLoading()
    app.ajax(requestParams).then(res => {
      this.setData({
        showPage: true,
        bannerList: res.data.bannerList,
        articleList: res.data.articleList
      })
      wx.hideNavigationBarLoading()
    })
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    var requestParams = {
      apiUrl: '/Index/index',
      showLoading: false
    }
    app.ajax(requestParams).then(res => {
      this.setData({
        bannerList: res.data.bannerList,
        articleList: res.data.articleList
      })
      wx.stopPullDownRefresh()
    })
  },
  onShareAppMessage: function(res) {


  }

})