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

// 构建URL
const buildUrl = function(page,options) {
  var queryStr = [];
  if(Object.keys(options).length){
    for(var item in options) {
      let str = item + "=" + options.item
      queryStr.push(str)
    }
    return page+"?"+queryStr.join("&")
  }else {
    return page
  }

}

var isLoaded = true;
/**
 * @param apiUrl
 * @param requestData 
 * @param method
 * @param show wx.loading
 */

const request = function ({ apiUrl, requestData = {}, requestMethod="GET", isShowLoad=true}) {

  // before send
  var _that = this;
  if (!isLoaded) {
    return
  }
  if(isShowLoad) {
    wx.showLoading({
      title: '加载中',
    })
  }
  isLoaded = false;

  // send
  var myPromise = new Promise(function (resolve, reject) {
    // const baseApiUrl = "https://www.easy-mock.com/mock/5ba635918c38302a9b1a667e/example/onehre";
    const baseApiUrl = "http://www.onehre.com/api.php";
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
        if(isShowLoad) {
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
              success: function(res){
                if (res.confirm) {
                  wx.navigateTo({
                    url: '/pages/account/login/index',
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

export default {
  request,
  formatTime,
  buildUrl
}
