// pages/home/present/index.js
import { siteConf } from '../../../static/js/common';
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showPage: false,
    curPage: 1,
    list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _that = this;
    var apiUrl = "/Home/present";
    var requestData = { page: this.data.curPage }
    var fetchData;
    fetchData = app._getApiData(apiUrl)
    fetchData.then(data=>{
      wx.hideLoading();
      _that.setData({
        showPage:true,
        list:data.list
      })
    },reject=>{

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

  }


})