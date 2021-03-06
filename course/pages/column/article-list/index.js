// pages/column/article-list/index.js
import {
  siteConf
} from "../../../static/js/common";
import util from "../../../utils/util"
//获取应用实例
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sourceUrl: siteConf.sourceUrl,
    showPage: false,
    curPage: 1,
    columnInfo: {},
    articleList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var cid = options.cid;
    var _that = this;

    const requestPatams = {
      apiUrl: '/Columnist/articlelist',
      requestData: {
        page: 1,
        cid: cid
      }
    }
    var myPromise = util.request(requestPatams);
    myPromise.then(data => {
      this.setData({
        showPage: true,
        columnInfo: data.columnistInfo,
        articleList: data.articleList
      })
    })
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

  }


})