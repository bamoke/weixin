// pages/home/index/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userStorage: {},
    userInfo: {},
    hasUserInfo: false,
    accountInfo: {},
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  /**
   * Action
   */
  getUserInfo: function(e) {
    if (typeof e.detail.userInfo === 'undefined') return;
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  logout: function() {
    wx.clearStorageSync();
    wx.reLaunch({
      url: 'index'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      accountInfo: wx.getStorageSync("userInfo")
    })
    // User info
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true,
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
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
    const userStorage = wx.getStorageSync("user")
    if (userStorage) {
      this.setData({
        userStorage
      })
    }
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