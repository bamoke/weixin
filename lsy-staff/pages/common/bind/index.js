// pages/common/bind/index.js
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    showPage: false,
    noPermission: true,
    btnText: "获取验证码",
    btnStyle: "btn-active",
    btnDisebled: false,
    phone: null,
    comid:null,
    serverid:null,
    comName:""
  },

  /**
   * 
   */
  updatePhone: function(data) {
    this.setData({
      phone: data.detail.value
    })
  },
  /**
   * 获取验证码
   */
  fetchCode: function() {
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

    const requestParams = {
      apiUrl: '/Account/mpcode',
      requestData: {
        "phone": phone
      }
    }
    var myPromise = app.ajax(requestParams);
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
    }, reject => {
      _that._setError(reject.errorMsg)
    })

  },

  /**
   * 提交表单
   */
  submitForm: function(data) {
    var formData = data.detail.value;
    var phoneRe = /^[1][3578]{1}([0-9]{9})$/;
    var codeRe = /[0-9]{6}/
    var apiUrl = "/Account/bindaccount";
    var req;
    //临时设置
    formData.comtype = 2; //1:财务服务机构;2:被代理的企业
    formData.usertype = parseInt(this.data.userType);
    //表单验证
    if (formData.usertype == 0) {
      return this._setError("请选择用户类型")
    }
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

  formData.ztid = this.data.ztId
  formData.comid = this.data.comid
  formData.serverid = this.data.serverid
    // 发送表单数据
    const requestParams = {
      apiUrl,
      requestData: formData,
      requestMethod: "POST"
    }
    req = app.ajax(requestParams);
    req.then(res => {
      console.log(res)
      wx.showModal({
        content: '绑定成功',
        showCancel: false,
        success: function() {
          wx.reLaunch({
            url: '/pages/index/index',
          })
        }
      })
    })
  },

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
    if (typeof options.comid === 'undefined') {
      this.setData({
        showPage: true,
        noPermission: true
      })
    } else {
      let requestParams = {
        apiUrl: "/Account/fetchcominfo",
        requestData: {
          comid: options.comid,
          serverid: options.serverid
        },
        requestMethod: "GET"
      }
      app.ajax(requestParams).then(res => {
        this.setData({
          showPage:true,
          noPermission: false,
          comid:options.comid,
          serverid:options.serverid,
          comName:res.cominfo.name,
          ztId:res.cominfo.ztid
        })
      },reject=>{
        setTimeout(function(){
          wx.reLaunch({
            url: '/pages/index/index'
          })
        },1000)
      })
    }

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

  }






})