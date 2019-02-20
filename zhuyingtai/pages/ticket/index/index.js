// pages/ticket/index/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showPage:false,
    code:""
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
      apiUrl: '/Ticket/index',
      requestData: {}
    }

    app.ajax(requestParams).then(res => {
      this.setData({
        showPage:true,
        code:res.data.code
      })
    })
  },
  onShareAppMessage: function () {

  }
 
})