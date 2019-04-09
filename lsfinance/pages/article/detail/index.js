// pages/article/detail/index.js
const app = getApp();
import * as WxParse from '../../../wxParse/wxParse.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showPage: false,
    curId: null,
    detail: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const id = options.id
    this.setData({
      curId: id
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
    const requestParams = {
      apiUrl: "/Notice/detail",
      requestData: {
        id: this.data.curId
      }
    }
    app.ajax(requestParams).then(res => {
      if (res.info.content) {
        WxParse.wxParse('wxparse_content', 'html', res.info.content, this)
      }
      this.setData({
        showPage: true,
        detail: res.info
      })
    })
  }
})