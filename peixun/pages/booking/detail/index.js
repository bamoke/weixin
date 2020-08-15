// pages/course/detail/index.js
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
    hasCourse: false,//是否已购买此课程
    wxparse_content: null,
    introduce: {},
    orgInfo:{},
    enrollEnd:0,
    preferTimeInfo: {
      day: "00",
      hour: "00",
      minute: "00",
      second: "00"
    }//优惠时间信息,
  },

  /**
   * tab
   */

  /**
   * 开始学习课程
   */
  

  goOrderConfirm:function(){
    wx.navigateTo({
      url:"/pages/orders/confirm/index?type=3&proid="+this.data.courseId
    })
  },
  _preferTimer:function(){
    //优惠时间定时器
    const _that = this
    const deadline = this.data.introduce.yh_limit
    const deadlineMilSec = Date.parse(deadline.replace(/-/g, '\/'));
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

  doCollect:function(){
    const requestParams = {
      apiUrl: '/Collection/docollect',
      requestData: { type:3,proid: this.data.courseId }
    }
    var myPromise = app.ajax(requestParams); 
    myPromise.then(res=>{
      this.setData({
        isCollected:!this.data.isCollected
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
      apiUrl : '/Booking/detail',
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
        hasCourse: res.data.isHas,
        enrollEnd:res.data.enrollEnd
      })
      //update bar title
      wx.setNavigationBarTitle({
        title: res.data.info.title
      })
      if (res.data.info.has_yh) {
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