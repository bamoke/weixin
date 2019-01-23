//app.js
import util from 'utils/util';
App({
  onLaunch: function(paths) {

    //
    // 登录
    util.wxLogin()
  },
    // 获取用户信息
  getUserInfo: function() {
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
  globalData: {
    userInfo: null,
    siteConf: {
      apiBaseUrl: 'https://www.pykscloud.com/organization.php',
      webUrl: 'http://www.pykscloud.com/',
      staticUrl: "https://wesource.oss-cn-shenzhen.aliyuncs.com"
    }
  },
  ajax:function(requestParams){
    return util.request(requestParams)
  }
})