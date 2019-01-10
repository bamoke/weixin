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
    sectionPage: 1,//当前章节页
    commentPage: 1,//当前评论页
    openVideo: false,//是否开始播放课程视频
    videoSource: null,//视频地址,
    hasCourse: false,//是否已购买此课程
    showShare: false,
    giftKey: null,//礼品包激活码
    wxparse_content: null,
    introduce: {},
    orgInfo:{},
    section: [],
    commentList: [],
    preferTimeInfo:{
      day:"00",
      hour:"00",
      minute:"00",
      second:"00"
    },//优惠时间信息,
    curPlayIndex:null
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
      if (this.data.section.length > 0) {
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
   */
  
  studyStart: function (data) {

    var index = data.currentTarget.dataset.index;
    var sectionId = this.data.section[index].id;
    var source = this.data.section[index].video;
    var _that = this;
    if (!this.data.hasCourse && this.data.introduce.isfree == 0) {
      wx.showModal({
        title: '提示',
        content: '你还未购买此课程，现在购买？',
        success: function (res) {
          if (res.confirm) {
            wx.navigateTo({
              url:'/pages/orders/confirm/index?type=2&proid='+_that.data.courseId
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })

    }else {
      // 每点击一次增加一次课程学习人次
      const requestParams = {
        apiUrl: '/Course/study',
        requestData: { courseid: this.data.courseId,sectionid:sectionId}
      }
      var myPromise = app.ajax(requestParams);
      this.setData({
        openVideo: true,
        videoSource: source,
        curPlayIndex: index
      })

    }

  },
  goOrderConfirm:function(){
    wx.navigateTo({
      url:"/pages/orders/confirm/index?type=2&proid="+this.data.courseId
    })
  },
  _preferTimer:function(){
    //优惠时间定时器
    const _that = this
    const deadline = this.data.introduce.yh_limit
    const deadlineMilSec = Date.parse(deadline.replace(/-/g, '/'));
    timer = setInterval(function(){
      const curDate = Date.now();
      let differ = deadlineMilSec - curDate
      let preferTimeInfo = null;
      if (differ > 0) {
        preferTimeInfo = {}
        let day = Math.floor(differ / (1000 * 60 * 60 * 24))
        differ -= day * (1000 * 60 * 60 * 24)
        let hour = Math.floor(differ / (1000 * 60 * 60))
        differ -= hour * (1000 * 60 * 60)
        let minute = Math.floor(differ / (1000 * 60))
        differ -= minute * (1000 * 60)
        let second = Math.ceil(differ / 1000)
        preferTimeInfo.day = day
        preferTimeInfo.hour = hour
        preferTimeInfo.minute = minute
        preferTimeInfo.second = second
        _that.setData({ preferTimeInfo })
      } else {
        clearInterval(timer)
        let introduce = _that.data.introduce
        introduce.has_yh = 0
        _that.setData({ introduce })
      }
      
    },1000)

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
        orgInfo:res.data.orgInfo,
        isCollected: res.data.isCollected,
        hasCourse: res.data.isHas
      })
      //update bar title
      wx.setNavigationBarTitle({
        title: res.data.info.title
      })
      if (res.data.info.has_yh==1) {
        this._preferTimer(res.data.info.yh_limit)
      }
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