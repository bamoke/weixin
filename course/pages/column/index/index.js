// pages/list/index.js
//import common  js
import { siteConf } from "../../../static/js/common";
//获取应用实例
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sourceUrl: siteConf.sourceUrl,
    showPage: false,
    curPage:1,
    curCate: '',
    curCid: 0,
    category:[],
    columnList:[]
  },

  /**
   * 切换tab
   */
  changeTab: function (options) {
    var curCid = options.target.dataset.cid;
    var _that = this;
    var apiUrl = '/Columnist/columnistlist'
    var requestData = { page: 1 }
    if(curCid){
      requestData.cid = curCid;
    }

    var myPromise = app._getApiData(apiUrl, requestData);
    myPromise.then(data => {
      wx.hideLoading();
      _that.setData({
        curCid:curCid,
        columnList: data.columnistList
      })
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var curCid = 0;
    var _that = this;
    var apiUrl = '/Columnist/columnistlist'
    var requestData = {page:1}
    if (typeof options.cid != 'undefined') {
      curCid = options.cid;
      requestData.cid = curCid;
    }
    var myPromise = app._getApiData(apiUrl, requestData);
    myPromise.then(data=>{
      wx.hideLoading();
      _that.setData({
        showPage:true,
        curCid:curCid,
        category:data.cateList,
        columnList: data.columnistList
      })
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
  onShow: function (options) {
    console.log("show")
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