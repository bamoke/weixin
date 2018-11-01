// pages/course/detail/index.js
var WxParse = require('../../../wxParse/wxParse.js');
//获取应用实例
const app = getApp()
import util from "../../../utils/util"
Page({
  /**
   * 页面的初始数据
   */
  data: {
    showPage: false,
    isEnroll:0,//是否已经预约过
    courseId: null,//课程ID
  },

  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const courseId = options.id
    this.setData({courseId})
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
    const params = {
      apiUrl: "/Course/detail",
      requestData:{id:this.data.courseId},
      requestMethod: "GET"
    }
    const ajaxRequest = util.request(params)
    ajaxRequest.then(res => {
      if (res.data.courseInfo.content) {
        WxParse.wxParse('wxparse_content', 'html', res.data.courseInfo.content, this)
      }
      this.setData({
        showPage: true,
        isEnroll: res.data.isEnroll,
        courseInfo: res.data.courseInfo,
        teacherInfo: res.data.teacherInfo
      })
    })
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
  onShareAppMessage: function (res) {
 
  }
})