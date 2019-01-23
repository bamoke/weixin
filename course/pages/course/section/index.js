// pages/video/video.js
import {
  siteConf
} from "../../../static/js/common";
import util from "../../../utils/util"
var WxParse = require('../../../wxParse/wxParse.js');
//获取应用实例
var app = getApp()


Page({
  data: {
    showPage: false,
    sourceUrl: siteConf.sourceUrl,
    ossUrl: siteConf.ossUrl,
    thumb: "",
    authStatus: 0,
    sectioninfo: {},
    isCollect: false,
    prevRecord: null,
    nextRecord: null,
    audioSeek:0

  },
  /**
   * Audio method
   */
  playPrev: function(e) {
    var prevRecord = this.data.prevRecord;
    if (prevRecord === null || prevRecord.type != 2) return;
    wx.redirectTo({
      url: 'index?id=' + prevRecord.id + "&img=" + this.data.thumb
    })
  },
  playNext: function(e) {
    var nextRecord = this.data.nextRecord;
    if (nextRecord === null || nextRecord.type != 2) return;
    wx.redirectTo({
      url: 'index?id=' + nextRecord.id + "&img=" + this.data.thumb,
    })
  },
  /**
   * collection
   */
  changeCollection: function() {
    if (!this.data.isCollect) {
      wx.showToast({
        title: '收藏成功',
        icon: "none"
      })
      this.setData({
        isCollect: true
      })
      requestData.actype = 1;
    } else {
      wx.showToast({
        title: '已取消收藏',
        icon: "none"
      })
      this.setData({
        isCollect: false
      })
      requestData.actype = 0;
    }
    // http request
    const requestParams = {
      apiUrl: "/Collection/index",
      requestData: {
        type: 2,
        proid: this.data.sectioninfo.id
      }
    }
    const httpResult = util.request(requestParams);
    httpResult.then();

  },
  /**
   * initialize
   */
  onLoad: function(options) {
    this.setData({
      curId: options.id
    })

  },
  onReady: function() {
    // 页面渲染完成
    // this.videoContext = wx.createVideoContext('js-video');


  },
  onShow: function() {
    var _that = this;
    const requestParams = {
      apiUrl: "/Course/sectiondetail",
      requestData: {
        id:this.data.curId
      }
    }
    const httpResult = util.request(requestParams);
    httpResult.then(data => {
      //标签转换
      if (data.sectioninfo.content) {
        WxParse.wxParse('wxparse_content', 'html', data.sectioninfo.content, this)
      }
      this.setData({
        showPage: true,
        sectioninfo: data.sectioninfo,
        thumb: data.thumb,
        prevRecord: data.prev,
        nextRecord: data.next,
        isCollect: data.isCollection
      })
      //update bar title
      wx.setNavigationBarTitle({
        title: data.sectioninfo.title
      })

      //设置audio
      if (data.sectioninfo.type == 2) {
        _that.xzaudio = this.selectComponent("#xzaudio")
        let audioSeek = wx.getStorageSync("audioSeek") == '' ? 20 : wx.getStorageSync("audioSeek")
        this.setData({
          audioSeek
        })
      }
    });
  },
  onHide: function() {
    // 页面隐藏
  },
  onUnload: function() {
    // 页面关闭
  }
})