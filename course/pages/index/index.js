//index.js
//获取应用实例
var app = getApp()

//加载公用
import { siteConf } from '../../static/js/common';
Page({
  data: {
    sourceUrl:siteConf.sourceUrl,
    showPage: false,
    banner: [],
    recomment: {},
    column: [],
    course: []
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var myPromise = app._getApiData('/Index/index')
    var _that = this;
    myPromise.then(function (data) {
      wx.hideLoading()
      _that.setData({
        showPage: true,
        column: data.columnist,
        course: data.courseList,
        banner: data.banner
      })
    }, function (err) {
      console.log(err)
    })
  },
    /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // console.log('show')
  }


})
