// pages/job/detail/index.js
import util from '../../../utils/util'
import * as WxParse from '../../../wxParse/wxParse.js'
import {
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
    defaultLogo: '/static/images/default-logo.jpg',
    eduArr,
    comSizeArr,
    wagesArr,
    mainInfo: {}
  },
  /**
   * Action deliver resume
   */
  deliverResume() {
    const jobId = this.data.id
    wx.navigateTo({
      url: '/pages/jobs/deliver/index?jid=' + jobId
    })
  },
  // Action collection 
  collectionJob(e) {
    const collectionState = this.data.isCollection
    let tipsText = collectionState ? '已取消收藏' : '已加入收藏'

    this.setData({
      isCollection: !collectionState
    })
    wx.showToast({
      title: tipsText,
      icon: "none"
    })

    const requestParams = {
      apiUrl: "/Collection/doit?jobid=" + this.data.id,
      requestMethod: "GET",
      isShowLoad:false
    }

    if(loaded) {
      loaded = false
      let ajaxRequest = util.request(requestParams)
      ajaxRequest.then(res=>{
        loaded = true
      })
    }

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const jobId = options.id
    this.setData({
      id: jobId
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
    const jobId = this.data.id
    const params = {
      apiUrl: "/Jobs/detail/id/" + jobId,
      requestMethod: "GET"
    }
    const ajaxRequest = util.request(params)
    ajaxRequest.then(res => {
      WxParse.wxParse('wxparse_content', 'html', res.mainInfo.description, this)
      this.setData({
        showPage: true,
        isDeliver: parseInt(res.isDeliver),
        isCollection: parseInt(res.isCollection),
        id: jobId,
        mainInfo: res.mainInfo,
      })
    })
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