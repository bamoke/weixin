// pages/grants/detail/index.js
const app = getApp();
import * as WxParse from '../../../wxParse/wxParse.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showPage: false,
    detail: {},
    isColletion:false,
    enrolled:false
  },

  /**
   * Handle
   */
  handleCollection(){
    let requestParams = {
      apiUrl: "/Event/collection",
      requestMethod: "GET",
      requestData: {
        id: this.data.curId
      }
    }
    const ajaxRequest = app.ajax(requestParams)
    ajaxRequest.then(res => {
      this.setData({
        isCollection: !this.data.isCollection
      })
    })
  },
  handleEnroll(){
    wx.navigateTo({
      url: '/pages/grants/apply/index?grantid='+this.data.curId,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options){
    this.setData({
      curId:options.id
    })
  },
  onShow: function() {
    let requestParams = {
      apiUrl: "/Grants/detail",
      requestMethod: "GET",
      requestData: {
        id: this.data.curId
      }
    }
    const ajaxRequest = app.ajax(requestParams)
    ajaxRequest.then(res => {
      if (res.data.info.content) {
        WxParse.wxParse('wxparse_content', 'html', res.data.info.content, this)
      }
      this.setData({
        showPage: true,
        detail: res.data.info,
        applyInfo:res.data.applyInfo
      })
    })
  }

})