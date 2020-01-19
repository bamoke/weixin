//app.js
App({
  onLaunch: function() {

  },
  isLoaded: true,
  ajax: function({
    apiUrl,
    requestData = {},
    requestMethod = "GET",
    showLoading = true
  }) {
    // before send
    var _that = this;
    if (this.isLoaded === false) {
      return
    }

    if (showLoading) {
      wx.showLoading({
        title: '加载中',
      })
    }
    this.isLoaded = false;

    // send
    var myPromise = new Promise(function(resolve, reject) {
      const baseApiUrl = "https://www.pykscloud.com/lscms/backend/mp_api.php";
      wx.request({
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
        complete: function(){
          _that.isLoaded = true;
        },
        fail: function() {
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
  globalData: {
    userInfo: null
  }
})