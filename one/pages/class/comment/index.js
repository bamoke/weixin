// pages/class/comment/index.js
import util from "../../../utils/util"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showPage: true,
    gradeId: null, //是否已经点评过依据
    courseId: null,
    courseInfo: {},
    comment: "",
    grade: 5,
  },
  changeGrade: function(e) {
    if (this.data.gradeId !== null) return
    if (typeof e.target.dataset.nu === 'undefined') return
    const grade = e.target.dataset.nu
    this.setData({
      grade
    })
  },
  changeComment: function(e) {
    this.setData({
      comment: e.detail.value
    })
  },
  saveGrade: function() {
    const params = {
      apiUrl: "/Myclass/savegrade",
      requestData: {
        courseid: this.data.courseId,
        grade: this.data.grade,
        comment: this.data.comment
      },
      requestMethod: "POST"
    }
    const ajaxRequest = util.request(params)
    ajaxRequest.then(res => {
      wx.showModal({
        title: '提交成功',
        content: '感谢您的评价和建议，现在返回班级主页',
        showCancel: false,
        success: function(res) {
          wx.navigateBack({
            delta: 1
          })
        }
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const courseId = options.courseid
    const params = {
      apiUrl: "/Myclass/grade",
      requestData: {
        courseid: courseId
      },
      requestMethod: "GET"
    }
    const ajaxRequest = util.request(params)
    ajaxRequest.then(res => {
      let updateData = {}
      if (res.data.gradeInfo !== null) {
        updateData.gradeId = res.data.gradeInfo.id
        updateData.grade = parseInt(res.data.gradeInfo.grade)
        updateData.comment = res.data.gradeInfo.comment,
        updateData.date = res.data.gradeInfo.create_time
      }
      this.setData({
        showPage: true,
        courseId,
        courseInfo:res.data.courseInfo,
        ...updateData
      })
      console.log(this.data)
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