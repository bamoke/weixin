// pages/detail/index.js
const app = getApp()
import * as WxParse from '../../../wxParse/wxParse.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageShow: false,
    detail: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const newsId = options.id
    let requestParams = {
      apiUrl: "/Article/detail",
      requestMethod: "GET",
      requestData:{id:newsId}
    }
    const ajaxRequest = app.ajax(requestParams)
    ajaxRequest.then(res => {
      if (res.data.info.content) {
        WxParse.wxParse('wxparse_content', 'html', res.data.info.content, this)
      }
      this.setData({
        showPage: true,
        detail: res.data.info
      })
    })

   
  },

  

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})