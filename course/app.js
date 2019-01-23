//app.js
import {
  siteConf
} from './static/js/common'
import util from './utils/util'
App({
  onLaunch() {

  },

  globalData: {
    userInfo: null,
  },

  /**转换HTML;
   *   */
  _transtionHTML: function(data) {
    var newData = null;
    return newData;
  },

  ajaxIsloaded: true,
  /**
   * @param apiUrl
   * @param requestData 
   * @param method
   * @param show wx.loading
   */

  ajax: function({
    apiUrl,
    requestData = {},
    requestMethod = "GET",
    isShowLoad = true
  }) {

    // before send
    var _that = this;
    if (!_that.ajaxIsloaded) {
      return
    }
    if (isShowLoad) {
      wx.showLoading({
        title: '加载中',
      })
    }
    _that.ajaxIsloaded = false;

    // send
    var myPromise = new Promise(function(resolve, reject) {
      const baseApiUrl = "https://www.xinzhinetwork.com/api.php";
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
          _that.ajaxIsloaded = true;
          if (isShowLoad) {
            wx.hideLoading();
          }
          if (res && res.data.code == 200) {
            resolve(res.data.data)
          } else {
            if (res.data.code == 11001 || res.data.code == 11002) {
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
                      url: '/pages/account/login/index',
                    })
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
})