// pages/test/paraphrase/index.js
const app = getApp();
import * as WxParse from '../../../wxParse/wxParse.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    questionInfo:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const curId = options.id
    let requestParams = {
      apiUrl: '/Test/paraphrase',
      requestData: {
        questionid: options.questionid
      }
    }

    app.ajax(requestParams).then(res => {
      if (res.data.questionInfo.paraphrase) {
        WxParse.wxParse('wxparse_content', 'html', res.data.questionInfo.paraphrase, this)
      }
      this.setData({
        showPage: true,
        questionInfo: res.data.questionInfo,
      })
    })
  },



})