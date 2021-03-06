// pages/home/mybooking/index.js
import { siteConf } from '../../../static/js/common';
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showPage: false,
    curPage:1,
    sourceUrl: siteConf.sourceUrl,
    list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取数据
    var apiUrl = '/Home/mybooking'
    var getApiData = app._getApiData(apiUrl);
    var _that = this;
    getApiData.then(data => {
      wx.hideLoading();
      _that.setData({
        list: data.list,
        showPage: true
      })
    }, reject => {
      wx.hideLoading();
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
})