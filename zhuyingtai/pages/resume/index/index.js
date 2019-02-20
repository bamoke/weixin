// pages/resume/index/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showPage:false,
    resumeInfo:{}

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },



  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let requestParams = {
      apiUrl: '/Resume/index',
      requestData: {}
    }

    app.ajax(requestParams).then(res => {
      this.setData({
        showPage: true,
        resumeInfo:res.data.info
      })
    })
  }

})