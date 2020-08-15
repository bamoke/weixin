// pages/course/detail/index.js
import {
  siteConf
} from '../../../static/js/common';
const WxParse = require('../../../wxParse/wxParse.js')
var timer;
var curPlayTime = 0; //当前播放时间,秒
//获取应用实例
var app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    showPage: false,
    courseId: null, //课程ID
    openVideo: false, //是否开始播放课程视频
    videoSource: null, //视频地址,
    wxparse_content: null,
    introduce: {},
    teacherInfo: {},
    curPlayIndex: null, //当前播放章节index,
    initialTime: 1,
    videoContext: null

  },




  /**
   * 继续观看
   */
  studyContinue(data) {
    var _that = this;
    curPlayTime = this.data.introduce.initial_time
    this.videoContext.seek(parseInt(this.data.introduce.initial_time))
    // this.videoContext.play()

  },

  /**
   * 更新观看记录
   */
  _updateRecord(even) {
    var integerPlayTime = Math.floor(even.detail.currentTime)
    var integerDuration = Math.floor(even.detail.duration)
    var percent = Math.floor(integerPlayTime / integerDuration * 100)
    const requestParams = {
      apiUrl: '/Course/study_record',
      requestData: {
        courseid: this.data.courseId,
        time: integerPlayTime,
        percent: percent
      },
      isShowLoad: false
    }
    app.ajax(requestParams);
  },

  /**
   * 视频播放中
   */
  videoPlaying(even) {
    var integerPlayTime = Math.floor(even.detail.currentTime)
    var integerDuration = Math.floor(even.detail.duration)

    if ((integerPlayTime - Math.floor(curPlayTime) >= 5) || (even.detail.currentTime == even.detail.duration)) {
      curPlayTime = even.detail.currentTime
      this._updateRecord(even)
    }

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var sectionId = null
    if (typeof options.id === 'undefined') {
      app.errorBack("非法操作")
      return
    };
    this.setData({
      courseId: options.id
    })
    this.videoContext = wx.createVideoContext("mainVideo")
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    const requestParams = {
      apiUrl: '/Course/detail',
      requestData: {
        id: this.data.courseId
      }
    }
    var myPromise = app.ajax(requestParams);
    myPromise.then(res => {
      //标签转换
      if (res.data.info.content) {
        WxParse.wxParse('wxparse_content', 'html', res.data.info.content, this)
      }

      //update data
      var curSectionIndex = 0;
      var updateData = {
        showPage: true,
        introduce: res.data.info,
        teacherInfo: res.data.teacherInfo
      }
      this.setData({...updateData})
      //update bar title
      wx.setNavigationBarTitle({
        title: res.data.info.title
      })

    })
  },


  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    clearInterval(timer)
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    clearInterval(timer)
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