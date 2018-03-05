// pages/booking/enter/index.js
import { siteConf } from "../../../static/js/common";
//获取应用实例
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sourceUrl: siteConf.sourceUrl,
    showPage: false,
    bid: null,
    id: null,
    errorStatus: false,
    errorMsg: "cuowu",
    dayIndex: 0,
    dayArray: ["请选择"]
  },

  //选择日期
  dayChange: function (e) {
    this.setData({
      dayIndex: e.detail.value
    })
  },

  formSubmit: function (e) {
    var formData = e.detail.value;
    var _that = this;
    //validate
    if (formData.realname == '') {
      this._setError("请填写您的姓名")
      return;
    }
    if (formData.gender == '') {
      this._setError("请选择性别")
      return;
    }
    if (formData.phone == '') {
      this._setError("请填写您的手机号")
      return;
    }
    if (formData.day == 0) {
      this._setError("请选择上课日期")
      return;
    }
    this.setData({
      errorStatus:false
    })
    formData.day = this.data.dayArray[formData.day]
    formData.id = this.data.id;
    formData.bid = this.data.bid;
    console.log(formData);

    //提交表单
    var apiUrl = '/Booking/enroll'
    var myPromise;
    myPromise = app._getApiData(apiUrl, formData,"POST");
    myPromise.then(data => {
      wx.hideLoading();
         wx.showModal({
           title: '提交成功',
           content: '感谢提交预约信息，稍后我们的工作人员将会与您取得联系！',
           showCancel:false,
           success:function(){
             wx.switchTab({
               url: '/pages/index/index',
             })
           }
         })      
    }, err => {
      wx.hideLoading();
      console.log(err)
      _that._setError(err)
    })

  },
  //==
  _setError: function (msg) {
    this.setData({
      errorStatus: true,
      errorMsg: msg
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.bid) {
      this.setData({
        bid: options.bid,
        id: options.id
      })
    }
    var id = options.id;
    var _that = this;
    var apiUrl = '/Booking/phase'
    var requestData = { id: id }
    var myPromise;
    myPromise = app._getApiData(apiUrl, requestData);
    myPromise.then(data => {
      wx.hideLoading();
      _that.setData({
        showPage: true,
        dayArray: _that.data.dayArray.concat(data.info.lesson_day)
      })
    }, reject => {
      console.log(reject)
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
  onShareAppMessage: function () {

  }
})