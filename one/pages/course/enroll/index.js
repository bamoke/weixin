//index.js
//获取应用实例
const app = getApp()
import util from "../../../utils/util"
Page({
  data: {
    courseId: null,
    courseName: '',
    formInfo: {},
    submiting: false
  },
  formSubmit: function(e) {
    if (this.data.submiting) return
    let formInfo = e.detail.value
    formInfo.course_id = this.data.courseId
    if (!formInfo.realname) {
      return this._showError("请填写您的姓名")
    }
    if (!formInfo.company) {
      return this._showError("请填写公司名称")
    }
    if (!formInfo.position) {
      return this._showError("请填写职位")
    }
    if (!formInfo.phone) {
      return this._showError("请填写您的手机号")
    }
    this.setData({
      submiting: true
    })

    const params = {
      apiUrl: "/CourseEnroll/do_enroll",
      requestData: formInfo,
      requestMethod: "POST"
    }
    const ajaxRequest = util.request(params)
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
    const courseId = options.id
    const params = {
      apiUrl: "/CourseEnroll/index",
      requestData: {
        courseid: courseId
      },
      requestMethod: "GET"
    }
    const ajaxRequest = util.request(params)
    ajaxRequest.then(res => {
      this.setData({
        courseId,
        formInfo: {
          phone: res.data.phone
        },
        courseName:res.data.coursename
      })
    })

    wx.setNavigationBarTitle({
      title: '课程预约'
    })
  },
  onshow: function() {

  }
})