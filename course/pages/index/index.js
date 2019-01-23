//index.js
import util from '../../utils/util'
//获取应用实例
var app = getApp()

//加载公用
import { siteConf } from '../../static/js/common';
Page({
  data: {
    sourceUrl:siteConf.sourceUrl,
    showPage: false,
    banner: [],
    recomment: {},
    column: [],
    course: [],
    survey:null,
    downLoad:[],
    audioPage:""//是否有音频在播放
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  /**
   * Go audio page
   */
  goAudioPage:function(){
    wx.navigateTo({
      url:this.data.audioPage
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
    /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const requestParams = {
      apiUrl:'/Index/index'
    }
    var myPromise = util.request(requestParams)
    myPromise.then(data=> {
      this.setData({
        showPage: true,
        column: data.columnist,
        course: data.courseList,
        banner: data.banner,
        downloadList: data.download,
        survey: data.survey
      })
    }, function (err) {
      console.log(err)
    })

    var curAudioPage = wx.getStorageSync("audioPage");
     if (typeof curAudioPage !== "undefined"){
      this.setData({
        audioPage: curAudioPage
      })
    }
  }


})
