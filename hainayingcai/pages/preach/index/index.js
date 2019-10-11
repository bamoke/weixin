// pages/preach/index/index.js
const app = getApp();
import * as WxParse from '../../../wxParse/wxParse.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showPage:false,
    mainInfo:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const jobId = this.data.id
    const params = {
      apiUrl: "/Preach/index",
      requestMethod: "GET"
    }
    const ajaxRequest = app.ajax(params)
    ajaxRequest.then(res => {
      if(res.data.info.content) {
        WxParse.wxParse('wxparse_preach_content', 'html', res.data.info.content, this)
      }
      this.setData({
        showPage: true,
        mainInfo: res.data.info,
      })
    })
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})