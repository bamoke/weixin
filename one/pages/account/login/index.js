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
    onLoading: false,
    backUrl:null
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
      wx.setStorageSync("user", res.data.user) 
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
    const backUrl = options.back || null
    this.setData({
      backUrl
    })

  }


})