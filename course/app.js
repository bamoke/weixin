//app.js
import { siteConf } from './static/js/common'
import util from './utils/util'
App({
  onLaunch() {
    wx.login({
      success:function(res){
        const requestParams = {
          apiUrl:'/Account/mplogin',
          requestData:{code:res.code}
        }
        const mpLogin = util.request(requestParams)
        mpLogin.then(data=>{
         if (typeof data.accessToken !== 'undefined'){
            wx.setStorageSync("accessToken", data.accessToken)
          }
        })
      }
    })
  },

  globalData: {
    userInfo: null,
  },

 

  /**转换HTML;
   *   */
  _transtionHTML: function (data) {
    var newData = null;
    return newData;
  }


})