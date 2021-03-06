// pages/job/detail/index.js
import util from '../../../utils/util'
import * as WxParse from '../../../wxParse/wxParse.js'
import {
  expArr,
  eduArr,
  comSizeArr,
  wagesArr
} from '../../../utils/data'
const app = getApp()
let loaded = true
let actArr = []
let actStartTime = 0
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showPage: false,
    eduArr,
    expArr,
    wagesArr,
    curId:null,
    mainInfo: {}
  },
  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const jobId = options.id

    const params = {
      apiUrl: "/Headhunter/detail",
      requestMethod: "GET",
      requestData:{id:jobId}
    }
    const ajaxRequest = util.request(params)
    ajaxRequest.then(res => {
      WxParse.wxParse('wxparse_content', 'html', res.data.info.content, this)
      this.setData({
        showPage: true,
        curId: jobId,
        mainInfo: res.data.info,
      })
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