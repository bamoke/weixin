// pages/mplogin/index.js
const App = getApp();
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
        App.ajax({
          apiUrl: '/Account/mplogin',
          requestData:{code:res.code},
          requestMethod: "get"
        }).then(res => {
          if (res.code == 200) {
            wx.setStorageSync("accessToken", res.data.accessToken)
            wx.navigateBack({
              detale: 1
            })
          } else {
            wx.showToast({
              title: res.data.msg,
              image: "/image/icon-error.png"
            })
          }
        }, reject => {
          wx.showToast({
            title: "连接错误",
            image: "/images/icon-error.png"
          })
        })

      }
    })
  },

  /**
   * handle cancel
   */
  handleMpLogin_bf(){
    wx.reLaunch ({
      url: '/pages/index/index',
    })
  },
  /**
 * handle cancel
 */
  handleCancel() {
    wx.reLaunch({
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
    console.log(backPath)
    this.setData({backPath})
  }



 
})