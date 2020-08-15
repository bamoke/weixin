// pages/common/bind/index.js
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    acType: 1, //1新绑定;2:更换手机号
    btnText: "获取验证码",
    btnStyle: "btn-active",
    btnDisebled: false,
    errorStatus: false,
    errorMsg: "",
    formData: {
      mobile: ""
    },
    rules: [{
        name: 'realname',
        rules: {
          required: true,
          message: '姓名必填'
        },
      },
      {
        name: 'mobile',
        rules: [{
          required: true,
          message: 'mobile必填'
        }, {
          mobile: true,
          message: 'mobile格式不对'
        }],
      }, {
        name: 'vcode',
        rules: {
          required: true,
          message: '请输入短信验证码'
        },
      }
    ]
  },


  /**
   * 获取验证码
   */
  fetchCode: function() {
    var phoneRe = /^[1][345789]{1}([0-9]{9})$/;

    var phone = this.data.formData.mobile;
    if (!phone) {
      this.setData({
        errorMsg: "请输入手机号码"
      })
      return
    }
    if (!phoneRe.test(phone)) {
      this.setData({
        errorMsg: "手机号格式不正确"
      })
      return
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

  formInputChange(e) {
    const {
      field
    } = e.currentTarget.dataset
    this.setData({
      [`formData.${field}`]: e.detail.value
    })
  },

  /**
   * 提交表单
   */
  submitForm: function(data) {
    this.selectComponent('#form').validate((valid, errors) => {
      console.log('valid', valid, errors)
      if (!valid) {
        const firstError = Object.keys(errors)
        if (firstError.length) {
          this.setData({
            errorMsg: errors[firstError[0]].message
          })

        }
      } else {
        // 发送表单数据
        const requestParams = {
          apiUrl: "/Account/bind",
          requestData: this.data.formData,
          requestMethod: "POST"
        }
        app.ajax(requestParams).then(data => {
          wx.showModal({
            content: '绑定成功',
            showCancel: false,
            success: function () {
              wx.reLaunch({
                url: '/pages/index/index',
              })
            }
          })
        })
      }
    })


  
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    /*     var navigationBarTitle;
        navigationBarTitle = "账号绑定";
        wx.setNavigationBarTitle({
          title: navigationBarTitle
        }) */

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