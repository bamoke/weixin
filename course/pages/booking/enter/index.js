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
    id:1,
    errorStatus:false,
    errorMsg:"cuowu",
    dayIndex: 0,
    dayArray: ["请选择", "01", "02", "11"]
  },

  //选择日期
  dayChange: function (e) {
    this.setData({
      dayIndex: e.detail.value
    })
  },

  formSubmit: function (e) {
    var formData = e.detail.value;
    //validate
    if (formData.realname == ''){
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
    formData.id = this.data.id;
    console.log(formData);
    //提交表单
  },
  _setError:function(msg){
    this.setData({
      errorStatus:true,
      errorMsg:msg
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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