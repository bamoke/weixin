//app.js
import util  from 'utils/util';
App({
  onLaunch: function () {

    // 登录
    if(wx.getStorageSync('sessionid') == ""){
      this.login();
    }

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  login:function(){
    wx.login({
      success: res => {
        // console.log(res)
        const apiUrl =  "/Account/login/code/" + res.code;
        util.request(apiUrl)
          .then(function (data) {
            wx.setStorageSync("sessionid", data.sessionid)
          })
          .catch(function (msg) {
            console.log(msg)
          })
      }
    })
  },
  globalData: {
    userInfo: null,
    siteConf: {
      apiBaseUrl: 'http://www.pykscloud.com/organization.php',
      webUrl: 'http://www.pykscloud.com/',
      staticUrl: "https://wesource.oss-cn-shenzhen.aliyuncs.com"
    }
  }
})