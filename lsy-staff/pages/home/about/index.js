// pages/home/about/index.js
const app = getApp()
import * as WxParse from '../../../wxParse/wxParse.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showPage:false,
    detail:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const requestParams = {
      apiUrl:"/Home/about"
    }
    app.ajax(requestParams).then(res=>{
      if (res.detail.content) {
        WxParse.wxParse('wxparse_content', 'html', res.detail.content, this)
      }
      this.setData({
        showPage:true,
        detail: res.detail
      })
    })
  }

  

})