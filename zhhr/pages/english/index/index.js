//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    showPage: true,
    cateList:[],
    bannerList: [],
    articleList: [],
    policiesInfo:{},
    keywords:""
  },

  /**
   * handle
   */
  search:function(){
    if(this.data.keywords == '') return
    wx.navigateTo({
      url: '../list/index?keywords=' + this.data.keywords
    })
  },
  setKeywords(e){
    console.log(e)
    this.setData({
      keywords:e.detail.value
    })
  },

  //事件处理函数
  onShow: function() {
    let requestParams = {
      apiUrl: '/En/index',
      requestData: {},
      showLoading: false
    }
    // wx.showNavigationBarLoading()
    app.ajax(requestParams).then(res => {
      this.setData({
        showPage: true,
        bannerList: res.data.bannerList,
        articleList: res.data.articleList,
        cateList:res.data.cateInfo,
        policiesInfo:res.data.policiesInfo
      })
      // wx.hideNavigationBarLoading()
    })
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    var requestParams = {
      apiUrl: '/En/index',
      showLoading: false
    }
    app.ajax(requestParams).then(res => {
      this.setData({
        bannerList: res.data.bannerList,
        articleList: res.data.articleList,
        cateList:res.data.cateInfo,
        policiesInfo:res.data.policiesInfo
      })
      wx.stopPullDownRefresh()
    })
  },
  onShareAppMessage: function(res) {


  }

})