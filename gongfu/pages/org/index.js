// pages/org/index.js
const app = getApp()
const WxParse = require('../../wxParse/wxParse.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showPage:false,
    orgInfo:{},
    courseInfo:{},
    bookingInfo:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(!options.id) {
      wx.navigateBack({
        detal:1
      })
      return
    }
    this.setData({
      orgId:options.id
    })
  },

  phoneCall: function () {
    const phone = this.data.orgInfo.tel
    wx.makePhoneCall({
      phoneNumber: phone
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
    let requestParams = {
      apiUrl: '/Org/detail',
      requestData: {id:this.data.orgId}
    }
    app.ajax(requestParams).then(res => {
      if (res.data.baseInfo.introduce) {
        WxParse.wxParse('wxparse_content', 'html', res.data.baseInfo.introduce, this)
      }
      this.setData({
        showPage: true,
        orgInfo: res.data.baseInfo,
        courseInfo: res.data.courseInfo,
        bookingInfo: res.data.bookingInfo
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