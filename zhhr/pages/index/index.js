//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    showPage: true,
    grantsInfo:{
      isShow:false,
      thumb:""
    },
    bannerList: [],
    articleList: []
  },

  /**
   * handle
   */
  handleGoPage(e){
    const index = e.currentTarget.dataset.index
    console.log(index)
    const curItem = this.data.articleList[index]
    var url = "/pages/article/";
    if(curItem.web_url == '') {
      url += `detail/index?id=${curItem.id}`
    }else {
      url += 'web/web?weburl=' + encodeURIComponent(curItem.web_url)
    }
    wx.navigateTo({url})
  },

  //事件处理函数
  onShow: function() {
    let requestParams = {
      apiUrl: '/Index/index',
      requestData: {},
      showLoading: false
    }
    // wx.showNavigationBarLoading()
    app.ajax(requestParams).then(res => {
      this.setData({
        showPage: true,
        bannerList: res.data.bannerList,
        articleList: res.data.articleList,
        grantsInfo:res.data.grantsInfo,
        choujiangInfo:res.data.choujiangInfo
      })
      // wx.hideNavigationBarLoading()
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
        articleList: res.data.articleList,
        grantsInfo:res.data.grantsInfo,
        choujiangInfo:res.data.choujiangInfo
      })
      wx.stopPullDownRefresh()
    })
  },
  onShareAppMessage: function(res) {


  }

})