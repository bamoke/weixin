// pages/home/invite/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inviteInfo:{},
    icon: "http://www.pykscloud.com/Uploads/wesource/invite-image.jpg"
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var comInfo = wx.getStorageSync("curComInfo")
    var requestParams = {
      apiUrl:"/Mycom/invite"
    }
    app.ajax(requestParams).then(res=>{
      this.setData({
        inviteInfo:res.inviteInfo
      })
    })
  },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    const inviteInfo = this.data.inviteInfo
    return {
      title: '邀请加入' + inviteInfo.comname + '员工专属小程序',
      path: '/pages/common/landing/index?code=' + inviteInfo.code,
      imageUrl:this.data.icon
    }
  }
})