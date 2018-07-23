//app.js
var isLoaded = true;
App({
  onLaunch: function() {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })

  },
  globalData: {
    userInfo: null,
    serverUrl: "https://www.zhmlife.com/we.php",
    sourceUrl: "http://www.zhmlife.com/Uploads/"
  },
  //获取数据
  fetchData: function(apiurl, data, method) {
    var _that = this;
    if (!isLoaded) {
      return
    }
    wx.showLoading({
      title: '加载中',
    })
    isLoaded = false;
    var requestData = data ? data : {};
    var requestMethod = method ? method : 'GET';
    var myPromise = new Promise(function(resolve, reject) {
      const baseApiUrl = "https://www.zhmlife.com/we.php";
      wx.request({
        url: baseApiUrl + apiurl,
        data: requestData,
        method: requestMethod,
        dataType: "json",
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function(res) {
          wx.hideLoading();
          if (res && res.data.Code == 10000) {
            isLoaded = true;
            resolve(res.data)
          } else {
            isLoaded = true;
            reject(res.data)
          }
        },
        fail: function() {
          reject("连接错误")
        }
      })
    })
    return myPromise;

  }
})