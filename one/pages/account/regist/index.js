// pages/common/bind/index.js
import util from '../../../utils/util';
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    acType: 'reg',
    btnText: "获取验证码",
    btnStyle: "btn-active",
    btnDisebled: false,
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
   * 获取验证码
   */
  fetchCode: function() {
    var phoneRe = /^[1][3578]{1}([0-9]{9})$/;
    var phone = this.data.phone;
    if (this.data.btnDisebled) {
      return;
    }
    if (!phone) {
      return this._setError("请输入手机号码")
    }
    if (!phoneRe.test(phone)) {
      return this._setError("手机号格式不正确")
    }

    var requestParams = {
      apiUrl: '/Account/mpcode',
      requestData: {
        "phone": phone
      },
      isShowLoad: false
    }
    var myPromise = util.request(requestParams);
    var _that = this;
    var num = 60;
    var timeText = "";
    var timeTextSuffix = "秒后重发";
    myPromise.then(data => {
      this.setData({
        btnText: num + timeTextSuffix,
        btnDisebled: true,
        btnStyle: "btn-disebled"
      })
      var timer = setInterval(function() {
        if (num == 1) {
          clearInterval(timer);
          _that.setData({
            btnText: "获取验证码",
            btnDisebled: false,
            btnStyle: "btn-active"
          })
          return;
        }
        num--;
        timeText = num < 10 ? 0 + (num + timeTextSuffix) : num + timeTextSuffix;
        _that.setData({
          btnText: timeText
        })
      }, 1000)
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
    const apiUrl = '/Account/regist'
    const successTipsTitle = "注册成功"
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
    if (formData.password2 == "") {
      return this._setError("请确认密码")
    }
    if (formData.password2 !== formData.password) {
      return this._setError("两次密码不一致")
    }
    if (formData.code == "") {
      return this._setError("请输入验证码")
    }
    // update
    this.setData({
      onLoading: true
    })
    // 发送表单数据
    let requestParams = {
      apiUrl,
      requestData: formData,
      requestMethod: "POST"
    }
    req = util.request(requestParams);
    req.then(data => {
      this.setData({
        onLoading: false
      })
      wx.showToast({
        title: data.msg,
      })
      const _that = this
      setTimeout(function() {
        wx.showModal({
          title: '注册成功',
          content: "现在返回登录页面",
          showCancel: false,
          success: function () {
            wx.navigateTo({
              url: '/pages/account/login/index'
            })
          }
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

  }



})