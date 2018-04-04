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

  },

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
        thumb:thumb
      })
      //update bar title
      wx.setNavigationBarTitle({
        title: data.sectioninfo.title
      })

      //设置audio
      if (data.sectioninfo.type == 2) {
        _that.setData({
          audioSrc:"http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E061FF02C31F716658E5C81F5594D561F2E88B854E81CAAB7806D5E4F103E55D33C16F3FAC506D1AB172DE8600B37E43FAD&fromtag=46"
        })

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