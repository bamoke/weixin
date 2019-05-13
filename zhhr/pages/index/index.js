//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    showPage: true,
    bannerList: [],
    articleList:[]
  },
  //事件处理函数
  onShow: function() {
    let requestParams = {
      apiUrl: '/Index/index',
      requestData: {},
      showLoading:true
    }

    app.ajax(requestParams).then(res => {
      this.setData({
        showPage:true,
        bannerList:res.data.bannerList,
        articleList:res.data.articleList
      })
    })
  },
  onShareAppMessage: function(res) {


  }

})