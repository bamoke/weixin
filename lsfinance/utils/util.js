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

//微信登陆
const wxLogin = function(){
  wx.login({
    success: res => {
      wx.request({
        url: "https://www.pykscloud.com/organization.php/Account/login/code/" + res.code,
        success: function (result) {
          console.log(result)
          if (result.data.code == 200) {
            let data = result.data.data
            wx.setStorageSync("accessToken", data.accessToken);
            if (data.userInfo) {
              wx.setStorageSync("userInfo", {
                "serverId": data.userInfo.server_id,
                "manageType": data.userInfo.manage_type,
                "userType": data.userInfo.user_type
              })
            }
          } else {
            wx.showToast({
              title: result.data.msg,
              image: "/static/images/icon-error.png"
            })
          }
        },
        fail: function () {
          wx.showToast({
            title: "微信连接错误",
            image: "/static/images/icon-error.png"
          })
        }
      })
    }
  })
}

var isLoaded = true;
/**
 * @param apiUrl
 * @param requestData 
 * @param method
 * @param show wx.loading
 */

var isLoaded = true;
/**
 * @param apiUrl
 * @param requestData 
 * @param method
 * @param show wx.loading
 */

const request = function({
  apiUrl,
  requestData = {},
  requestMethod = "GET",
  isShowLoad = true
}) {

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

  // send
  var myPromise = new Promise(function(resolve, reject) {
    const baseApiUrl = "https://www.pykscloud.com/organization.php";
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
        isLoaded = true;
        if (isShowLoad) {
          wx.hideLoading();
        }
        if (res && res.data.code == 200) {
          resolve(res.data.data)
        } else {
          if (res.data.code == 11003) {
            // 创建返回页面路径
            /*             const routePage = getCurrentPages();
                        const curRoute = routePage[routePage.length-1]
                        const realPage = buildUrl(curRoute.route, curRoute.options) */
            wx.showModal({
              content: res.data.msg,
              showCancel: false,
              success: function(res) {
                if (res.confirm) {
                  wx.navigateTo({
                    url: '/pages/bind/index',
                  })
                }
              }
            })
          } else if (res.data.code == 11002) {
            wx.showModal({
              content: res.data.msg,
              showCancel: false,
              success: function (res) {
                if (res.confirm) {
                  wxLogin()
                }
              }
            })
          } else {
            wx.showToast({
              title: res.data.msg,
              image: "/static/images/icon-error.png"
            })
          }
          reject(res.data)
        }
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
}

export default {
  request,
  wxLogin,
  formatTime
}