//app.js
var isLoaded = true;
App({
  onLaunch: function (paths) {
    // 微信登录
    this.wxLogin()
  },
  // 获取用户信息
  getUserInfo: function () {
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
      apiBaseUrl: 'https://www.pykscloud.com/staff_api.php',
      webUrl: 'http://www.pykscloud.com/',
      staticUrl: "https://wesource.oss-cn-shenzhen.aliyuncs.com"
    }
  },
  /**
   * 微信登录
   */
  wxLogin:function(){
    wx.login({
      success: res => {
        wx.request({
          url: this.globalData.siteConf.apiBaseUrl+'/Account/login',
          method: 'get',
          dataType: 'json',
          data: {
            code: res.code
          },
          success: function (result) {
            if (result.data.code == 200) {
              console.log(result)
              wx.setStorageSync("accessToken", result.data.data.accessToken)
            } else {
              wx.showToast({
                title: res.data.msg,
                image: "/static/image/icon-error.png"
              })
            }
          }
        })
      }
    })
  },
  /**
   * 自定义ajax
   * @params object
   */
  ajax: function (requestParams) {
    return this._request(requestParams)
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
  },

  _request: function ({
    apiUrl,
    requestMethod='get',
    requestData,
    isShowLoad=true
  }) {
    const _that = this
    // before send
    if (!isLoaded) {
      return
    }
    if (isShowLoad) {
      wx.showLoading({
        title: '加载中',
      })
    }
    isLoaded = false;
    const routePage = getCurrentPages();
    // console.log(routePage)
    // send
    var myPromise = new Promise(function (resolve, reject) {
      const baseApiUrl = _that.globalData.siteConf.apiBaseUrl;
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
          isLoaded = true;
          if (isShowLoad) {
            wx.hideLoading();
          }
          if (res && res.data.code == 200) {
            resolve(res.data.data)
          } else {
            if (res.data.code == 11003) {
              // 创建返回页面路径
              // const routePage = getCurrentPages();
              // const curRoute = routePage[routePage.length - 1]
              // const realPage = buildUrl(curRoute.route, curRoute.options)
              
              wx.showModal({
                content: res.data.msg,
                showCancel: false,
                success: function (res) {
                  if (res.confirm) {
                    wx.navigateTo({
                      url: '/pages/common/bind/index',
                    })
                  }
                }
              })
            } else if (res.data.code == 11002 || res.data.code == 11001) {
              const routes = getCurrentPages();
              const curPage = routes[routes.length - 1]
              const routeOpt = curPage.options
              var fullPath = "/" + curPage.route
              let routeOptKeys = Object.keys(routeOpt);
              var paramsArr = [];
              var pageParams = ""
              if (routeOptKeys.length) {
                paramsArr = routeOptKeys.map(item => {
                  return item + "=" + routeOpt[item]
                })
                pageParams = "?" + paramsArr.join("&")
              }
              fullPath += pageParams
              wx.navigateTo({
                url: '/pages/common/mplogin/index?back=' + encodeURIComponent(fullPath),
              })


            } else if (res.data.code == 13009) {
              // 其他需要前端依据code作回应
            } else if (res.data.code == 11009){
              // 无权限查看
              wx.showModal({
                content: res.data.msg,
                showCancel: false,
                confirmText:"返回首页",
                success:function(result){
                  if(result.confirm) {
                    wx.reLaunch({
                      url: '/pages/index/index'
                    })
                  }
                }
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
  }
})