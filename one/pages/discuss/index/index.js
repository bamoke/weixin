// pages/discuss/index/index.js
const app = getApp()
import util from "../../../utils/util"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showPage:false,
    courseId:null,
    list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const courseId = options.courseid
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
    const courseId = this.data.courseId
    const params = {
      apiUrl: "/Discuss/index",
      requestMethod: "GET",
      requestData: { obj_id: courseId, type: 1 }
    }
    const ajaxRequest = util.request(params)
    ajaxRequest.then(res => {
      this.setData({
        showPage: true,
        list: res.data.list
      })
    }).catch(reject => {
      console.log("s")
    })
  }

})