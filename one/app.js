//app.js
App({
  onLaunch: function() {

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log(res)
        const code = res.code
        wx.request({
          url: "https://www.onehre.com/api.php/Account/mp_login",
          data: {code},
          method: "GET",
          dataType: "json",
          success:function(res){
            if(res.data.code == 200){
              wx.setStorageSync("accessToken", res.data.info.token)
            }else {
              wx.showToast({
                title: res.data.msg,
                image: "/static/images/icon-error.png"
              })
            }
          },
          fail:function(){
            wx.showToast({
              title: "网络连接错误",
              image: "/static/images/icon-error.png"
            })
          }
        })
      }
    })
  },
  globalData: {
    userInfo: null
  }
})