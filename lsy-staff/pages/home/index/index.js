// pages/home/index/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    staffInfo: {},
    hasUserInfo: false,
    accountInfo: {},
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  /**
   * Action
   */
  getUserInfo: function(e) {
    if (typeof e.detail.userInfo === 'undefined') return;
    const avatarUrl = e.detail.userInfo.avatarUrl
    let oldStaffInfo = this.data.staffInfo
    const requestParams = {
      apiUrl: "/Account/updateUserinfo",
      requestData: { avatar: avatarUrl},
      requestMethod:"POST"
    }
    app.ajax(requestParams).then(res => {
      oldStaffInfo.avatar = avatarUrl
      this.setData({ staffInfo: oldStaffInfo})
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    // account info
    const requestParams = {
      apiUrl: "/Home/index"
    }
    app.ajax(requestParams).then(res => {
      this.setData({
        staffInfo: res.staffInfo
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

  }


})