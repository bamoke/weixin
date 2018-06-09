const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

// ajax
var isLoaded = true;
const request = function (apiurl, data, method) {
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
  var myPromise = new Promise(function (resolve, reject) {
    const baseApiUrl ="http://www.pykscloud.com/organization.php";
    wx.request({
      url: baseApiUrl + apiurl,
      data: requestData,
      method: requestMethod,
      dataType:"json",
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'session-id': wx.getStorageSync('sessionid'),
        'server-id': wx.getStorageSync('serverid'),
      },
      success: function (res) {
        wx.hideLoading();
        if (res && res.data.errorCode == 10000) {
          isLoaded = true;
          resolve(res.data)
        } else {
          isLoaded = true;
          reject(res.data)
        }
      },
      fail: function () {
        reject("连接错误")
      }
    })
  })
  return myPromise;
}


module.exports = {
  formatTime: formatTime,
  request: request
}
