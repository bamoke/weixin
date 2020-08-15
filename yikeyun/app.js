//app.js
App({
  onLaunch: function () {
    // 登录
    wx.login({
      success: res => {
        wx.request({
          url: 'https://www.bamoke.com/yikeyun/api.php/Account/mplogin',
          method: 'get',
          dataType: 'json',
          data: {
            code: res.code
          },
          success: function (result) {
            if (result.data.code == 200) {
              console.log("login ok")
              wx.setStorageSync("accessToken", result.data.data.accessToken)
            } else {
              wx.showToast({
                title: result.data.msg,
                image: "/static/image/icon-error.png"
              })
            }
          }
        })
      }
    })
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
  globalData: {
    userInfo: null,
    siteConf:{
      apiBaseUrl: 'https://www.bamoke.com/yikeyun/api.php'
    }
  },
  ajaxLoaded: true,
  ajax: function ({
    apiUrl,
    requestData = {},
    requestMethod = "GET",
    isShowLoad = true
  }) {
    // before send
    var _that = this;
    if (!this.ajaxLoaded) {
      return
    }
    if (isShowLoad) {
      wx.showLoading({
        title: '加载中',
      })
    }
    this.ajaxLoaded = false;

    // send
    var myPromise = new Promise(function (resolve, reject) {
      const baseApiUrl = "https://www.bamoke.com/yikeyun/api.php";
      // const baseApiUrl = "https://www.easy-mock.com/mock/5ba635918c38302a9b1a667e/example";
      wx.request({
        url: baseApiUrl + apiUrl,
        data: requestData,
        method: requestMethod,
        dataType: "json",
        header: {
          'content-type': 'application/x-www-form-urlencoded',
          'x-access-token': wx.getStorageSync('accessToken')
        },
        success: function (res) {
          _that.ajaxLoaded = true;
          if (isShowLoad) {
            wx.hideLoading();
          }
          if (res && res.data.code == 200) {
            resolve(res.data)
          } else {
            if (res.data.code == 11001 || res.data.code == 11002) {
              // 创建返回页面路径
              /*             const routePage = getCurrentPages();
                          const curRoute = routePage[routePage.length-1]
                          const realPage = buildUrl(curRoute.route, curRoute.options) */
              wx.showModal({
                content: res.data.msg,
                showCancel: false,
                success: function (res) {
                  if (res.confirm) {
                    wx.navigateTo({
                      url: '/pages/mplogin/index',
                    })
                  }
                }
              })
            } else if (res.data.code == 11003){
              wx.navigateTo({
                url: '/pages/bind/guide/index',
              })
            }else {
              wx.showToast({
                title: res.data.msg,
                image: "/static/images/icon-error.png"
              })
            }
            reject(res.data)
          }
        },
        fail: function () {
          wx.showToast({
            title: "网络连接错误",
            image: "/static/images/icon-error.png"
          })
          reject("连接错误")
        }
      })
    })
    return myPromise;
  },
  errorBack: function ({ tips, deltaNu = 1, delay = 1000 }) {
    wx.showToast({
      title: tips,
      image: "/static/images/error.png?v=4",
    })
    setTimeout(function () {
      wx.navigateBack({
        delta: deltaNu
      })
    }, delay)
  }
})