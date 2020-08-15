// pages/course/detail/index.js
import { siteConf } from '../../../static/js/common';
const WxParse = require('../../../wxParse/wxParse.js')
var timer;
//获取应用实例
var app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    showPage: false,
    courseId: null,//课程ID
    currentTab: 0,//当前tab's index
    sectionPage: {},
    commentPage: {},//当前评论页
    isStudent: false,
    openVideo: false,//是否开始播放课程视频
    videoSource: null,//视频地址,
    studyStage: 0,//学习阶段0:未开始,1:学习中,2:已学完
    showShare: false,
    wxparse_content: null,
    introduce: {},
    teacherInfo:{},
    sectionList: [],
    commentList: [],
    preferTimeInfo:{
      day:"00",
      hour:"00",
      minute:"00",
      second:"00"
    },//优惠时间信息,
    curPlayIndex:null//当前播放章节index
 
  },

  /**
   * tab
   */
  swichNav: function (e) {
    var index = parseInt(e.target.dataset.index);
    var myPromise, curApiUrl, curModule;
    var curRequestData;
    var _that = this;
    var updateData = { currentTab: index }
    if (index == 1) {
      //查看目录
      if (this.data.sectionList.length > 0) {
        this.setData(updateData)
        return;
      }
      curApiUrl = '/Course/section';
      curRequestData = {
        page: this.data.sectionPage,
        courseid: this.data.courseId
      }
    } else if (index == 2) {
      //查看评论
      if (this.data.commentList.length > 0) {
        this.setData(updateData)
        return;
      }
      curApiUrl = '/Comment/vlist';
      curRequestData = {
        page:this.data.commentPage,
        type:2,
        proid:this.data.courseId
      }
    } else {
      this.setData(updateData)
      return;
    }
    //2.1 get data and then to update
    const requestParams = {
      apiUrl:curApiUrl,
      requestData: curRequestData
    }
    myPromise = app.ajax(requestParams);
    myPromise.then(res => {
      if (index == 1) {
        updateData.section = res.data.list
      } else if (index == 2) {
        updateData.commentList = res.data.list
      }
      this.setData(updateData)
    })
  },
  /**
   * 开始学习课程
   * 观看
   */
  
  studyStart: function (data) {

    var index = data.currentTarget.dataset.index;
    var sectionId = this.data.sectionList[index].id;
    var source = this.data.sectionList[index].video;
    var _that = this;
    const requestParams = {
      apiUrl: '/Course/study',
      requestData: { courseid: this.data.courseId, sectionid: sectionId }
    }
    var myPromise = app.ajax(requestParams);
    this.setData({
      openVideo: true,
      videoSource: source,
      curPlayIndex: index
    })

  },
  /**
   * 加入班级
   */
  joinStudy:function(){
    const requestParams = {
      apiUrl: '/Course/join_class',
      requestData: { courseid: this.data.courseId }
    }
    var myPromise = app.ajax(requestParams);
    myPromise.then(res => {
      this.setData({
        isStudent: true
      })
    })
  },
 

  /**
   * 发表评论
  */
  createComment: function () {
    wx.navigateTo({
      url: '/pages/common/comment/index?proid=' + this.data.courseId + '&type=2&title=' + this.data.introduce.title
    })
  },

  doCollect: function () {
    const requestParams = {
      apiUrl: '/Collection/docollect',
      requestData: { type: 2, proid: this.data.courseId }
    }
    var myPromise = app.ajax(requestParams);
    myPromise.then(res => {
      this.setData({
        isCollected: !this.data.isCollected
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (typeof options.id == 'undefined') return;
    this.setData({
      courseId:options.id
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
  onShow: function () {
    const requestParams = {
      apiUrl : '/Course/detail',
      requestData: { id: this.data.courseId }
    }
    var myPromise = app.ajax(requestParams);
    myPromise.then(res => {
      //标签转换
      if (res.data.info.content) {
        WxParse.wxParse('wxparse_content', 'html', res.data.info.content, this)
      }

      //update data
      this.setData({
        showPage: true,
        introduce: res.data.info,
        isCollected: res.data.isCollected,
        studyStage: res.data.studyStage,
        isStudent: res.data.isStudent,
        teacherInfo: res.data.teacherInfo,
        sectionList: res.data.sectionList,
        commentList: res.data.commentList
      })
      //update bar title
      wx.setNavigationBarTitle({
        title: res.data.info.title
      })

    })
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
    clearInterval(timer)
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    clearInterval(timer)
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
  onShareAppMessage: function (res) {
    var _that = this;
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }

  }
})