//app.js
import { siteConf } from './static/js/common'
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)


    this.checkLogin();

  },


  getUserInfo: function (cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  globalData: {
    userInfo: null
  },
  /**
   * 微信登录
   * 返回Promise对象
   */
  onlogin: function () {
    wx.showLoading({
      title: '',
    });
    //1.微信登录
    var promise = new Promise(function (resolve, reject) {
      wx.login({
        success: function (res) {
          resolve(res)
        },
        fail: function () {
          reject("微信登录失败")
        }

      })
    })

    promise
      //3.登录服务器
      .then(weData => {
        console.log(weData)
        var sendData = { code: weData.code };
        var newPromise = new Promise(function (resolve, reject) {
          wx.request({
            url: siteConf.apiBaseUrl + "/Account/login",
            data: sendData,
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            success: function (result) {
              var resolveData = {}
              if (result.data.errorCode == 10000) {
                // console.log(result)
                resolve(result.data)
              } else {
                reject(result.data.errorMsg)
              }
            },
            fail: function () {
              reject('网络请求失败')
            }
          })
        });
        return newPromise;
      }, reject => {
        wx.hideLoading();
        console.log(reject)
      })
      //4. 维护本地登录状态
      .then(resolve => {
        wx.hideLoading();
        console.log('update session')
        wx.setStorageSync('sessionId', resolve.sessionid);

      }, reject => {
        wx.hideLoading();
        console.log(reject)
      })
  },
  /**
   * 检测是否登录
   */
  checkLogin: function () {
    var that = this;
    wx.checkSession({
      success: function () {
        if (!wx.getStorageSync('sessionId')) {
          that.onlogin()
        }
        //session 未过期，并且在本生命周期一直有效
      },
      fail: function () {
        console.log('unlogin')
        that.onlogin()
      },
      complete: function () {
        // console.log("c")
      }
    })
  },

isLoaded:true,
  /**
    * 获取数据(无需sessionID)
    * @param string  api url
    * @param object  post or get method's data
    * @param string  method name
    */
  _fetchApiData: function (apiurl, data, method) {
    var _that = this;
    wx.showLoading({
      title: '加载中',
    })
    if (!this.isLoaded) {
      return
    }
    this.isLoaded = false;
    var requestData = data ? data : {};
    var requestMethod = method ? method : 'GET';
    var myPromise = new Promise(function (resolve, reject) {
      wx.request({
        url: siteConf.apiBaseUrl + apiurl,
        data: requestData,
        method: requestMethod,
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          if (res && res.data.errorCode == 10000) {
            _that.isLoaded = true;
            resolve(res.data)
          } else {
            _that.isLoaded = true;
            reject(res.data.errorMsg)
          }
        },
        fail: function () {
          reject("连接错误")
        }
      })
    })
    return myPromise;
  },

  /**
   * 获取数据(带sessionID)
   * @param string  api url
   * @param object  post or get method's data
   * @param string  method name
   */
  _getApiData: function (apiurl, data, method) {
    var _that =this;
    wx.showLoading({
      title: '加载中',
    })
    if(!this.isLoaded){
      return
    }
    this.isLoaded = false;
    var requestData = data ? data : {};
    var requestMethod = method ? method : 'GET';
    var myPromise = new Promise(function (resolve, reject) {
      wx.request({
        url: siteConf.apiBaseUrl + apiurl,
        data: requestData,
        method: requestMethod,
        header: {
          'content-type': 'application/x-www-form-urlencoded',
          'session-id': wx.getStorageSync('sessionId')
        },
        success: function (res) {
          wx.hideLoading();
          if (res && res.data.errorCode == 10000) {
            _that.isLoaded = true;
            resolve(res.data)
          } else {
            _that.isLoaded = true;
            reject(res.data.errorMsg)
          }
        },
        fail: function () {
          reject("连接错误")
        }
      })
    })
    return myPromise;
  },

  /**转换HTML;
   *   */
   _transtionHTML:function(data){
     var newData = null;
    return newData;
   }


})