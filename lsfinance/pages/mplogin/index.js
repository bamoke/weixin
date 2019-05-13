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
          url: app.globalData.siteConf.apiBaseUrl+"/Account/login/code/" + res.code,
          success: function (result) {
            // console.log(result)
            if (result.data.code == 200) {
              let data = result.data.data
              wx.setStorageSync("accessToken", data.accessToken);
              if (data.userInfo) {
                wx.setStorageSync("userInfo", {
                  "serverId": data.userInfo.server_id,
                  "manageType": data.userInfo.manage_type,
                  "userType": data.userInfo.user_type
                })
              }
              wx.navigateBack({
                detale:1
              })
            } else {
              wx.showToast({
                title: result.data.msg,
                image: "/static/images/icon-error.png"
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