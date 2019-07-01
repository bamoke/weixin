//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    showPage: true,
    bannerList: [],
    articleList:[]
  },

  /**
   * handle
   */
  handleDeveloping(){
    wx.showModal({
      content: '模块正在开发中……',
      showCancel:false
    })
  },
  //事件处理函数
  onShow: function() {
    let requestParams = {
      apiUrl: '/Index/index',
      requestData: {},
      showLoading:false
    }
    wx.showNavigationBarLoading()
    app.ajax(requestParams).then(res => {
      this.setData({
        showPage:true,
        bannerList:res.data.bannerList,
        articleList:res.data.articleList
      })
      wx.hideNavigationBarLoading()
    })
  },
  onShareAppMessage: function(res) {


  }

})