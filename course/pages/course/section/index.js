// pages/video/video.js
import { siteConf } from "../../../static/js/common";
var WxParse = require('../../../wxParse/wxParse.js');
//获取应用实例
var app = getApp()


Page({
  data: {
    showPage: false,
    authStatus:0,
    sectioninfo: {},

  },

  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var id = options.id;
    var _that = this;
    var apiUrl = '/Course/sectiondetail'
    var requestData = { id: id }
    var myPromise = app._getApiData(apiUrl, requestData);
    myPromise.then(data => {
      wx.hideLoading();
      //标签转换
      if (data.sectioninfo.content) {
        WxParse.wxParse('wxparse_content', 'html', data.sectioninfo.content, _that)
      }
      _that.setData({
        showPage: true,
        sectioninfo: data.sectioninfo,
      })
    });
 

  },
  onReady: function () {
    // 页面渲染完成
    // this.videoContext = wx.createVideoContext('js-video');
    
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})