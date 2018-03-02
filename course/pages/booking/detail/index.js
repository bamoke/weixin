// pages/booking/detail/index.js
import { siteConf } from "../../../static/js/common";
var WxParse = require('../../../wxParse/wxParse.js');
//获取应用实例
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sourceUrl: siteConf.sourceUrl,
    showPage: false,
    bookingId: null,
    info: {},
    lesson: []
  },
  /**
   * 点击预约
   */
  phase: function (data) {
    var id = data.target.dataset.id;
    var bid = data.target.dataset.bid;
    wx.navigateTo({
      url: '../enter/index?bid=' + bid + '&id=' + id,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id;
    var _that = this;
    var apiUrl = '/Booking/detail'
    var requestData = { id: id }
    var myPromise;
    this.setData({
      bookingId: id
    })
    myPromise = app._getApiData(apiUrl, requestData);
    myPromise.then(data => {
      wx.hideLoading();
      //标签转换
      if (data.info.content) {
        WxParse.wxParse('wxparse_content', 'html', data.info.content, _that)
      }
      _that.setData({
        showPage: true,
        info: data.info
      })
    });
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
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})