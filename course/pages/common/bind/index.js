// pages/common/bind/index.js
import { siteConf } from '../../../static/js/common';
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    acType: 1,  //1新绑定;2:更换手机号
    btnText: "获取验证码",
    btnStyle: "btn-active",
    btnDisebled: false,
    errorStatus: false,
    errorMsg: "",
    phone: null
  },

  /**
   * 
   */
  updatePhone: function (data) {
    this.setData({
      phone: data.detail.value
    })
  },
  /**
   * 获取验证码
   */
  fetchCode: function () {
    var phoneRe = /^[1][3578]{1}([0-9]{9})$/;
    var phone = this.data.phone;
    if (!phone) {
      return this._setError("请输入手机号码")
    }
    if (!phoneRe.test(phone)) {
      return this._setError("手机号格式不正确")
    }

    if (this.data.btnDisebled) {
      return;
    }
    var apiUrl = '/Account/mpcode';
    var requestData = { "phone": phone };
    var myPromise = app._getApiData(apiUrl, requestData);
    var _that = this;
    var num = 60;
    var timeText = "";
    var timeTextSuffix = "秒后重发";
    myPromise.then(data=>{
      wx.hideLoading();
      this.setData({
        btnText: num + timeTextSuffix,
        btnDisebled: true,
        btnStyle: "btn-disebled"
      })
      var timer = setInterval(function () {
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
    },reject=>{
      wx.hideLoading();
      _that._setError(reject)
    })
    
  },

  /**
   * 提交表单
   */
  submitForm: function (data) {
    var formData = data.detail.value;
    var phoneRe = /^[1][3578]{1}([0-9]{9})$/;
    var codeRe = /[0-9]{6}/
    var apiUrl = "/Account/bindphone";
    var req;
    formData.actype = this.data.acType;
    //表单验证
    if (formData.phone == '') {
      return this._setError("请输入手机号码")
    }
    if (!phoneRe.test(formData.phone)) {
      return this._setError("手机号格式不正确")
    }
    if (formData.code == "") {
      return this._setError("请输入验证码")
    }
    this.setData({
      errorStatus: false,
      errorMsg: ""
    })

    // 发送表单数据
    req = app._getApiData(apiUrl, formData, "POST");
    req.then(data => {
      wx.hideLoading();
      wx.showModal({
        title: '绑定成功',
        content: data.errorMsg,
        showCancel: false,
        success:function(){
          wx.reLaunch({
            url: '/pages/index/index',
          })
        }
      })
    }, reject => {
      wx.hideLoading();
      this._setError(reject)
    })
  },

  _setError: function (msg) {
    this.setData({
      errorStatus: true,
      errorMsg: msg
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var navigationBarTitle;
    navigationBarTitle = options.type==1?"手机绑定":"更换手机号码";
    this.setData({
      acType: options.type
    })
    wx.setNavigationBarTitle({
      title: navigationBarTitle
    })
    
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})