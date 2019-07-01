// pages/home/invite/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    comInfo : null,
    serverId : null
  },

  /**
   * 跳转
   */
  jumpMiniProgram(){
    console.log("s")
    wx.navigateToMiniProgram({
      appId: 'wxe0ad4459e84ec05b',
      path: 'page/bind/index?id=123',
      envVersion: 'develop',
      success(res) {
        // 打开成功
      },
      fail:function(){
        console.log("fail")
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var comInfo = wx.getStorageSync("curComInfo")
    var userInfo = wx.getStorageSync("userInfo")
    this.setData({
      comInfo,
      serverId: userInfo.serverId
    })
  },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})