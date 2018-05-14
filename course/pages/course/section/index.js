// pages/video/video.js
import { siteConf } from "../../../static/js/common";
var WxParse = require('../../../wxParse/wxParse.js');
//获取应用实例
var app = getApp()


Page({
  data: {
    showPage: false,
    sourceUrl: siteConf.sourceUrl,
    ossUrl: siteConf.ossUrl,
    thumb:"",
    authStatus: 0,
    sectioninfo: {},
    isCollect:false,
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
 * collection
 */
  changeCollection:function(){
    var apiUrl = "/Collection/index"
    var requestData = {type:2,proid:this.data.sectioninfo.id};
    var HttpResult;
    if(!this.data.isCollect){
      wx.showToast({
        title: '收藏成功',
        icon: "none"
      })
      this.setData({
        isCollect: true
      })
      requestData.actype = 1;
    }else {
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
    HttpResult =  app._getApiData(apiUrl,requestData,'GET',1);
    HttpResult.then();

  },
  /**
   * initialize
   */
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var id = options.id;
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
        thumb:data.thumb,
        prevRecord: data.prev,
        nextRecord: data.next,
        isCollect:data.isCollection
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