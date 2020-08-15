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
    sectionId: null, //sectionID
    currentTab: 0, //当前tab's index
    sectionPage: {},
    isStudent: false,
    openVideo: false, //是否开始播放课程视频
    videoSource: null, //视频地址,
    showShare: false,
    wxparse_content: null,
    introduce: {},
    teacherInfo: {},
    sectionList: [],
    curPlayIndex: null, //当前播放章节index,
    initialTime: 0,
    videoContext: null

  },

  /**
   * tab
   */
  swichNav: function(e) {
    var index = parseInt(e.target.dataset.index);
    var myPromise, curApiUrl, curModule;
    var curRequestData;
    var _that = this;
    var updateData = {
      currentTab: index
    }
    this.setData(updateData)


  },
  /**
   * 开始学习课程
   * 观看
   */

  studyStart: function(data) {

    var index = data.currentTarget.dataset.index;
    var sectionId = this.data.sectionList[index].id;
    var source = this.data.sectionList[index].video;
    var _that = this;
    curPlayTime = 0;
    this.setData({
      openVideo: true,
      videoSource: source,
      curPlayIndex: index,
      initialTime: 0
    })

  },

  /**
   * 继续观看
   */
  studyContinue(data) {
    var index = data.currentTarget.dataset.index;
    var curSection = this.data.sectionList[index];
    var _that = this;
    curPlayTime = curSection.initial_time
    this.setData({
      openVideo: true,
      initialTime: curSection.initial_time,
      videoSource: curSection.video,
      curPlayIndex: index
    })
    this.videoContext.seek(parseInt(curSection.initial_time))
    // this.videoContext.play()

  },

  /**
   * 更新观看记录
   */
  _updateRecord(sectionIndex, even) {
    var integerPlayTime = Math.floor(even.detail.currentTime)
    var integerDuration = Math.floor(even.detail.duration)
    var percent = Math.floor(integerPlayTime / integerDuration * 100)
    const curSectionInfo = this.data.sectionList[sectionIndex]
    const requestParams = {
      apiUrl: '/Course/study_record',
      requestData: {
        courseid: this.data.courseId,
        sectionid: curSectionInfo.id,
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
      this._updateRecord(this.data.curPlayIndex, even)
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
    if (typeof options.sid !== 'undefined') {
      sectionId = options.sid
    }
    this.setData({
      courseId: options.id,
      sectionId
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
        teacherInfo: res.data.teacherInfo,
        sectionList: res.data.sectionList,
      }
      if (this.data.sectionId) {
        for (let i = 0; i < res.data.sectionList.length; i++) {
          if (res.data.sectionList[i].id == this.data.sectionId) {
            updateData = Object.assign(updateData, {
              currentTab:1,
              openVideo: true,
              videoSource: res.data.sectionList[i].video,
              curPlayIndex: i,
              initialTime: parseInt(res.data.sectionList[i].initial_time)
            })
            this.videoContext.seek(parseInt(res.data.sectionList[i].initial_time))
            break;
          }
        }
      }
      this.setData({...updateData})
      //update bar title
      wx.setNavigationBarTitle({
        title: res.data.info.title
      })

    })
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function(res) {
    var _that = this;
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }

  }
})