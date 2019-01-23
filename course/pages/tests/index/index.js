// pages/test/index.js
import { siteConf } from "../../../static/js/common";
//获取应用实例
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bannerUrl: 'http://112.74.42.16/Upload/images/tests-banner.jpg',
    navList:[],
    mainList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function (options) {
    const requestParams = {
      apiUrl : '/Tests/index',
      requestData : { page: 1 }
    }
    var myPromise = app.ajax(requestParams);
    myPromise.then(data => {
      wx.hideLoading();
      this.setData({
        showPage: true,
        navList: data.navList,
        mainList: data.mainList
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  }



})