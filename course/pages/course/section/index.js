// pages/video/video.js
import { siteConf } from "../../../static/js/common";
var WxParse = require('../../../wxParse/wxParse.js');
//获取应用实例
var app = getApp()


Page({
  data: {
    showPage: false,
    sourceUrl: siteConf.sourceUrl,
    thumb:"",
    authStatus: 0,
    sectioninfo: {},
    prevRecord:null,
    nextRecord:null

  },
  /**
   * Audio method
   */
  playPrev: function (e) {
    var prevRecord = this.data.prevRecord;
    if (prevRecord === null || prevRecord.type != 2) return;
    wx.redirectTo({
      url: 'index?id=' + prevRecord.id + "&img=" + this.data.thumb,
    })
  },
  playNext:function(e){
    var nextRecord = this.data.nextRecord;
    if (nextRecord === null || nextRecord.type != 2) return;
    wx.redirectTo({
      url: 'index?id='+nextRecord.id+"&img="+this.data.thumb,
    })
  },

  /**
   * initialize
   */
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var id = options.id;
    var thumb = typeof options.img !='undefined'?options.img:"";
    var _that = this;
    var apiUrl = '/Course/sectiondetail'
    var requestData = { id: id }
    var myPromise = app._getApiData(apiUrl, requestData);
    myPromise.then(data => {
      //标签转换
      if (data.sectioninfo.content) {
        WxParse.wxParse('wxparse_content', 'html', data.sectioninfo.content, _that)
      }
      _that.setData({
        showPage: true,
        sectioninfo: data.sectioninfo,
        thumb:thumb,
        prevRecord: data.prev,
        nextRecord: data.next
      })
      //update bar title
      wx.setNavigationBarTitle({
        title: data.sectioninfo.title
      })

      //设置audio
      if (data.sectioninfo.type == 2) {
        _that.xzaudio = this.selectComponent("#xzaudio")
      }
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