// pages/work/result/index.js
import util from "../../../utils/util"
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const testId = options.testid
    const params = {
      apiUrl: "/Homework/result",
      requestData: {
        testid: testId
      },
      requestMethod: "GET"
    }
    const ajaxRequest = util.request(params)
    ajaxRequest.then(res => {
      this.setData({
        showPage: true,
        courseId:res.data.courseid,
        myRecord: res.data.myRecord,
        otherRecord: res.data.otherRecord
      })
    })
  }




})