//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    showPage:false,
    testList:[],
    banner:""
  },
 onShow: function () {
    let requestParams = {
      apiUrl: '/Index/index',
      requestData: {}
    }

    app.ajax(requestParams).then(res => {
      this.setData({
        showPage: true,
        testList: res.data.testList,
        banner:res.data.banner
      })
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
