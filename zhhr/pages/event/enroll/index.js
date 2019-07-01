//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    eventId: null,
    eventInfo: {},
    formInfo: {},
    submiting: false
  },
  formSubmit: function(e) {
    if (this.data.submiting) return
    let formInfo = e.detail.value
    var phoneRe = /^[1][3578]{1}([0-9]{9})$/;
    formInfo.event_id = this.data.eventId
    if (!formInfo.realname) {
      return this._showError("请填写您的姓名")
    }
    if (!formInfo.company) {
      return this._showError("请填写公司名称")
    }

    if (!formInfo.phone) {
      return this._showError("请填写您的手机号")
    }
    if (!phoneRe.test(formInfo.phone)) {
      return this._showError("手机号格式不正确")
    }
    this.setData({
      submiting: true
    })

    const params = {
      apiUrl: "/Event/enroll",
      requestData: formInfo,
      requestMethod: "POST"
    }
    const ajaxRequest = app.ajax(params)
    ajaxRequest.then(res => {
      wx.showToast({
        title: "提交成功,请等待审核",
        icon: "success"
      })
      setTimeout(function() {
        wx.navigateBack({
          delta: 1
        })
      }, 1000)
    }, reject => {
      this.setData({
        submiting: false
      })
    })
  },
  _showError: function(msg) {
    wx.showToast({
      title: msg,
      image: "/static/images/icon-error.png"
    })
  },
  onLoad: function(options) {
    const eventId = options.eventid
    const params = {
      apiUrl: "/Event/enroll",
      requestData: {
        eventid: eventId
      },
      requestMethod: "GET"
    }
    const ajaxRequest = app.ajax(params)
    ajaxRequest.then(res => {
      this.setData({
        eventId,
        eventInfo:res.data.info
      })
    },reject=>{
      if(reject.code === 13009) {
        setTimeout(function () {
          wx.navigateBack({
            delta: 1
          })
        }, 1000)
      }
    })
  }

})