// pages/home/invite/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showPage:false,
    info:{},
    icon: "http://www.pykscloud.com/Uploads/wesource/invite-image.jpg"
  },

  /**
   * 跳转
   */
  jumpMiniProgram() {
    wx.navigateToMiniProgram({
      appId: 'wxe0ad4459e84ec05b',
      path: '/pages/common/bind/index?code='+this.data.info.code,
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
    if(typeof options.code == "undefined") {
      wx.showToast({
        title: '无效页面',
        image:"/static/images/icon-error.png"
      })
      return
    }
    var inviteCode = options.code
    var requestParams = {
      apiUrl:"/InviteLanding/index",
      requestData:{code:inviteCode}
    }
    app.ajax(requestParams).then(res=>{
      this.setData({
        showPage:true,
        info:res.info
      })
    })

  },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    const inviteInfo = this.data.info
    return {
      title: '邀请加入' + inviteInfo.comname,
      path: '/pages/common/landing/index?code=' + inviteInfo.code,
      imageUrl:this.data.icon
    }
  }
})