// pages/home/mycourse/index.js
import { siteConf,commonFunc } from '../../../static/js/common';
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showPage: false,
    sourceUrl: siteConf.sourceUrl,
    status:[
      {
        "info":"未开始",
        "classname":"s-nostudy"
      },
      {
        "info": "学习中",
        "classname": "s-studying"
      },
      {
        "info": "已学完",
        "classname": "s-complete"
      }
    ],
    courseList:[]
  },

  /**
   * 自定义函数
   */
  formatDataTime:function(time){
    return commonFunc.formatTime(time)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    //获取数据
    var apiUrl = '/Home/mycourse'
    var getApiData = app._getApiData(apiUrl);
    var _that = this;
    getApiData.then(data => {
      wx.hideLoading();
      _that.setData({
        courseList: data.list,
        showPage: true
      })
    }, reject => {
      console.log(reject)
    })
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