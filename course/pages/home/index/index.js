// pages/home/index/index.js
import { siteConf } from '../../../static/js/common';
var app = getApp();
import util from "../../../utils/util"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    home_bg_img: '',
    userinfo: {
      nickName: '',
      avatarUrl: "https://www.xinzhinetwork.com/Upload/avatar/default-avatar.png",
      balance: 0,
    }
  },

  /**
   * 更新用户信息
   */
  updateUserinfo: function (userInfo) {
    console.log(userInfo)
    var _that =this;
    var userInfo = _that.data.userinfo;
     wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          console.log("ss");
          wx.getUserInfo({
            success: function (res) {
              console.log(res.userInfo)
              var apiUrl = '/Account/updateUserinfo';
              var requestData = {
                nickname: res.userInfo.nickName,
                avatar: res.userInfo.avatarUrl,
                gender: res.userInfo.gender
              }
              userInfo.nickName = res.userInfo.nickName;
              userInfo.avatarUrl = res.userInfo.avatarUrl;
              // console.log(userInfo)
              _that.setData({
                userinfo: userInfo
              });
              var myPromise = app._getApiData(apiUrl, requestData, 'POST')
              myPromise.then(function () {
                wx.hideLoading();
              }) 
            }
          })
        }
      }
    })


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {




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
    // 页面初始化 options为页面跳转所带来的参数
    var indexApiUrl = "/Home/index";
    const requestParams = {
      apiUrl:'/Home/index'
    }
    var curPromise = util.request(requestParams);
    curPromise.then(data => {
      this.setData({
        userinfo: {
          nickName: data.info.nickname ? data.info.nickname : "未登录",
          avatarUrl: data.info.avatar ? data.info.avatar : siteConf.sourceUrl + "avatar/default-avatar.png",
          balance: data.info.balance,
          mp_identification: data.info.mp_identification,
          phone: data.info.phone
        }
      })

    }, reject => {

    })
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