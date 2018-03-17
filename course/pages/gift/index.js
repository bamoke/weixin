// pages/gift/index.js
import { siteConf } from '../../static/js/common';
//获取应用实例
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showPage: false,
    price: "99.00",
    type: "课程"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var apiUrl = '/Gift/index';
    var requestData = { key: options.key }
    var myPromise = app._fetchApiData(apiUrl, requestData);
    // console.log("onload")
  },
  onReady:function(){

    
  }
})