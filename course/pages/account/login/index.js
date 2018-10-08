// pages/common/bind/index.js
import util from '../../../utils/util';
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    btnDisebled: false,
    errorStatus: false,
    errorMsg: "",
    phone: null,
    btnText:"登录",
    backUrl:''
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

    var formData = data.detail.value;
    var phoneRe = /^[1][3578]{1}([0-9]{9})$/;
    var codeRe = /[0-9]{6}/
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

    // update
    this.setData({
      btnText: "登录中……"
    })
    // 发送表单数据
    let requestParams = {
      apiUrl:"/Account/login",
      requestData: formData,
      requestMethod: "POST"
    }
    const req = util.request(requestParams);
    req.then(data => {
      wx.showToast({
        title: data.msg,
      })
      const _that = this
      setTimeout(function() {
        wx.setStorageSync("accessToken", data.token)
        wx.setStorageSync("user", data.user)
        wx.reLaunch({
          url: '/pages/home/index/index'
        })
      }, 500)
    }).catch(error => {
      this.setData({
        btnText: "登录"
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

  }
})