//app.js
import util from 'utils/util';
App({
  onLaunch: function () {
    // 展示本地存储能力
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)
    // 登录
    // this._login()
    // console.log("token",wx.getStorageSync("accessToken"))
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
  _login: function (callBack) {
    wx.login({
      success: res => {
        const params = {
          apiUrl: "/Account/login/code/" + res.code
        }
        util.request(params).then(function (data) {
          //更新缓存
          wx.setStorageSync("accessToken", data.info.token);
          wx.setStorageSync("user", data.info.user);
          if (typeof callBack !== 'undefined') {
            callBack();
          }
        }).catch(function (msg) {
          console.log(msg)
        })
      }
    })
  },
  globalData: {
    userInfo: null
  },
  ajax: function (requestParams) {
    return util.request(requestParams)
  },
  errorBack: function ({ tips, deltaNu = 1, delay = 1000 }) {
    wx.showToast({
      title: tips,
      image: "/static/images/icon-error.png?v=4",
    })
    setTimeout(function () {
      wx.navigateBack({
        delta: deltaNu
      })
    }, delay)
  }
})