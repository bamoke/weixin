// pages/policy/detail/index.js
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
   * Handle
   */
  handleViewFile(){
    const detailInfo = this.data.detail
    /**下载文件 */
    if (detailInfo.file) {
      wx.showLoading({
        title: '加载中……',
      })
      wx.downloadFile({
        url: detailInfo.file,
        success: function (res) {
          if (res.statusCode === 200){
            wx.openDocument({
              filePath: res.tempFilePath,
              success: function (result) {
                wx.hideLoading()
                // console.log(result)
              }
            })
          }
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const policyId = options.id
    let requestParams = {
      apiUrl: "/Policy/detail",
      requestMethod: "GET",
      requestData: { id: policyId }
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
  onShareAppMessage: function () {

  }
})