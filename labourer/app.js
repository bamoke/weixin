//app.js
App({
  onLaunch: function() {
    // 展示本地存储能力
  },

  ajax: function({
    apiUrl,
    requestData = {},
    requestMethod = "GET",
    showLoading = true
  }) {
    // before send
    var _that = this;

    if (showLoading) {
      wx.showLoading({
        title: '加载中',
      })
    }

    // send
    var myPromise = new Promise(function(resolve, reject) {
      const baseApiUrl = "https://www.pykscloud.com/labourer.php";
      var requestTask = wx.request({
        url: baseApiUrl + apiUrl,
        data: requestData,
        method: requestMethod,
        dataType: "json",
        header: {
          'content-type': 'application/x-www-form-urlencoded',
          'x-access-token': wx.getStorageSync('accessToken')
        },
        success: function(res) {
          if (showLoading) {
            wx.hideLoading();
          }
          if (res && res.data.code == 200) {
            resolve(res.data)
          } else {
            wx.showToast({
              title: res.data.msg,
              image: "/static/images/icon-error.png"
            })
            reject(res.data)
          }
        },
        complete: function() {
          // isLoaded = true;
        },
        fail: function() {
          wx.showToast({
            title: "网络连接错误",
            image: "/static/images/icon-error.png"
          })
          reject("连接错误")
        }
      })
      requestTask.abort()
    })

    return myPromise;
  },
  globalData: {
    userInfo: null
  }
})