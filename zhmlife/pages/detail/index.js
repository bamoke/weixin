// pages/detail/index.js
const app = getApp()
var WxParse = require('../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageShow: false,
    sourceUrl: app.globalData.sourceUrl,
    detail: {},
    recommend: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var _that=this;
    var curId = options.id;
    const apiUrl = "/Article/detail";
    var requestData = {
      id: curId
    }
    var requestResult = app.fetchData(apiUrl, requestData);
    requestResult.then(result => {
      if (result.info.detail.content) {
        WxParse.wxParse('wxparse_content', 'html', result.info.detail.content, _that)
      }
      this.setData({
        pageShow: true,
        detail: result.info.detail,
        recommend: result.info.recommend
      })
    }).catch(reject => {

    });
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