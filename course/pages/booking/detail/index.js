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
    phaseList: []
  },
  /**
   * 点击预约
   */
  phase: function (data) {
    var id = data.currentTarget.dataset.id;
    var bid = data.currentTarget.dataset.bid;
    var apiUrl = '/Orders/create';
    var requestData = { type: 4, proid: id }
    console.log(data);
    // return;
    var myPromise = app._getApiData(apiUrl, requestData);
    myPromise.then(data => {
      var nonceStr = data.info.nonceStr;
      var pkg = data.info.package;
      var timeStamp = data.info.timeStamp;
      var paySign = data.info.sign;
      wx.requestPayment({
        timeStamp: timeStamp,
        nonceStr: nonceStr,
        package: pkg,
        signType: 'MD5',
        paySign: paySign,
        success: function (res) {
          wx.redirectTo({
            url: '/pages/booking/enter/index?bid=' + bid + '&id=' + id,
          })
        },
        fail: function (res) {
          wx.hideLoading();
/*           wx.redirectTo({
            url: '/pages/home/orders/index',
          }) */
        }
      })
    }, err => {
      wx.hideLoading();
      wx.showModal({
        title: '提示',
        content: err,
        showCancel:false
      })
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
        info: data.info,
        phaseList:data.phaseList
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