// pages/home/index/index.js
import { siteConf } from '../../../static/js/common';
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    home_bg_img: '',
    userinfo: {
      nickName: '',
      avatarUrl: "https://pic1.zhimg.com/50/v2-593c53e1b03ee35a7ae1c11221330894_xs.jpg",
      balance:0,
      mp_identification:0
    }
  },

/**
 * 更新用户信息
 */
_updateUserinfo:function(userInfo){
  var apiUrl = '/Account/updateUserinfo';
  var requestData = {
    nickname: userInfo.nickName,
    avatar: userInfo.avatarUrl
  }
  var myPromise = app._getApiData(apiUrl, requestData, 'POST')
  myPromise.then(function () {
    wx.hideLoading();

  })
},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _that = this;
    var indexApiUrl = "/Home/index";
    var curPromise = app._getApiData(indexApiUrl);
    curPromise.then(data=>{
      wx.hideLoading();
      _that.setData({
        userinfo:{
          nickName: data.info.nickname,
          avatarUrl: data.info.avatar,
          balance:data.info.balance,
          mp_identification:data.info.mp_identification
        }
      })

    },reject=>{

    }).then()

    // 页面初始化 options为页面跳转所带来的参数
    var _that = this;
    // if (this.data.userinfo.nickName == ''){
    //   wx.login({
    //     success: function (res) {
    //       // success
    //       wx.getUserInfo({
    //         success: function (res) {
    //           // success
    //           _that._updateUserinfo(res.userInfo);
    //           _that.setData({
    //             userinfo: res.userInfo
    //           })


    //         },
    //         fail: function () {
    //           // fail
    //         },
    //         complete: function () {
    //           // complete
    //         }
    //       })
    //     },
    //     fail: function () {
    //       // fail
    //     },
    //     complete: function () {
    //       // complete
    //     }
    //   })
    // }
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

})