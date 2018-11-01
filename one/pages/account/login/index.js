// pages/common/bind/index.js
import util from '../../../utils/util';
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    errorStatus: false,
    errorMsg: "",
    phone: null,
    onLoading: false
  },

  /**
   * 
   */
  updatePhone: function(e) {
    this.setData({
      phone: e.detail.value
    })
  },


  /**
   * 提交表单
   */
  submitForm: function(data) {
    if (this.data.onLoading) return //已经提交未返回响应
    var formData = data.detail.value;
    var phoneRe = /^[1][3578]{1}([0-9]{9})$/;
    var codeRe = /[0-9]{6}/
    var apiUrl = "/Account/login";
    var successTipsTitle;
    var req;
    //表单验证
    if (formData.phone == '') {
      return this._setError("请输入手机号码")
    }
    if (!phoneRe.test(formData.phone)) {
      return this._setError("手机号格式不正确")
    }
    if (formData.password == '') {
      return this._setError("请输入密码")
    }

    // 发送表单数据
    let requestParams = {
      apiUrl,
      requestData: formData,
      requestMethod: "POST"
    }
    req = util.request(requestParams);
    req.then(res => {
      wx.showToast({
        title: res.msg,
      })
      wx.setStorageSync("accessToken", res.data.token)
      setTimeout(function() {
        wx.switchTab({
          url: '/pages/me/index/index'
        })
        
      }, 500)
    }).catch(error => {
      this.setData({
        onLoading: false
      })
    })
  },

//=======
  _setError: function(msg) {
    wx.showToast({
      title: msg,
      image: "/static/images/icon-error.png"
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const type = typeof options.type !== 'undefined' ? options.type : 'login'
    const navigationBarTitle = type == 'reg' ? '注册' : '登录'
    const isNavBack = typeof options.back !== 'undefined' ? options.back : null
    wx.setNavigationBarTitle({
      title: navigationBarTitle
    })
    this.setData({
      acType: type,
      isNavBack
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})