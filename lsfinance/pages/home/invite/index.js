// pages/home/invite/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    comInfo: null,
    serverId: null,
    icon: "http://www.pykscloud.com/Uploads/wesource/invite-image.jpg"
  },

  /**
   * 跳转
   */
  jumpMiniProgram() {
    console.log("s")
    wx.navigateToMiniProgram({
      appId: 'wxe0ad4459e84ec05b',
      path: 'page/bind/index?id=123',
      envVersion: 'develop',
      success(res) {
        // 打开成功
      },
      fail: function() {
        console.log("fail")
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var type = typeof options.type !== "undefined" ? options.type : "share"

    var comInfo = wx.getStorageSync("curComInfo")
    var userInfo = wx.getStorageSync("userInfo")
    this.setData({
      comInfo,
      userInfo
    })
  },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    return {
      title: '邀请加入'+this.data.comName,
      path: '/pages/home/invite/index?code='+this.data.inviteCode,
      imageUrl:this.data.icon
    }
  }
})