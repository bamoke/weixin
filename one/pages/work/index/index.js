// pages/work/index/index.js
import util from "../../../utils/util"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showPage: false,
    courseId: null,
    curPage: 1,
    list: []
  },

  toTest: function(e) {
    const testId = e.currentTarget.dataset.testid
    const params = {
      apiUrl: "/Homework/checkcomplete",
      requestData: {
        testid: testId
      },
      requestMethod: "GET"
    }
    const ajaxRequest = util.request(params)
    ajaxRequest.then(res => {
      let url = ""
      if (res.data.complete == 0) {
        url = "/pages/work/detail/index?id=" + testId
      } else {
        url = "/pages/work/result/index?testid=" + testId
      }
      wx.navigateTo({
        url: url
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options){
    const courseId = options.courseid
    this.setData({
      courseId
    })
  },
  onShow: function(options) {
    const courseId = this.data.courseId
    const params = {
      apiUrl: "/Homework/index",
      requestData: {
        courseid: courseId
      },
      requestMethod: "GET"
    }
    const ajaxRequest = util.request(params)
    ajaxRequest.then(res => {
      this.setData({
        showPage: true,
        list: res.data.list,
        hasMore: res.data.hasMore
      })
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    if (!this.data.hasMore) return;
    let postData = {
      p: this.data.curPage + 1,
      courseid: this.data.courseId
    }
    const requestParams = {
      apiUrl: "/Homework/index",
      requestMethod: "GET",
      requestData: postData
    }
    const ajaxRequest = util.request(requestParams)
    ajaxRequest.then(res => {
      this.setData({
        hasMore: res.data.hasMore,
        list: this.data.list.concat(res.data.list),
        curPage: res.data.page
      })
    })
  }
})