// pages/mplogin/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * handle
   */
  handleMpLogin(){
    wx.login({
      success: res => {
        wx.request({
          url: app.globalData.siteConf.apiBaseUrl +"/Account/login",
          method: 'get',
          dataType: 'json',
          data: {
            code: res.code
          },
          success: function (result) {
            if (result.data.code == 200) {
              wx.setStorageSync("accessToken", result.data.data.accessToken)
              wx.navigateBack({
                detale: 1
              })
            } else {
              wx.showToast({
                title: res.data.msg,
                image: "/static/image/icon-error.png"
              })
            }
          },
          fail: function () {
            wx.showToast({
              title: "微信连接错误",
              image: "/static/images/icon-error.png"
            })
          }
        })
      }
    })
  },

  /**
   * handle cancel
   */
  handleCancel(){
    wx.reLaunch ({
      url: '/pages/index/index',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var backPath = "";
    if(options.back){
      backPath = decodeURIComponent(options.back)
    }
    this.setData({backPath})
  }



 
})