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
    const avatarUrl = e.detail.userInfo.avatarUrl
    let newUserInfo = this.data.userInfo
    const requestParams = {
      apiUrl: "/Account/updateUserinfo",
      requestData: { avatar: avatarUrl},
      requestMethod:"POST"
    }
    app.ajax(requestParams).then(res => {
      newUserInfo.avatar = avatarUrl
      this.setData({userInfo:newUserInfo})
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
    const requestParams = {
      apiUrl:"/Home/index"
    }
    app.ajax(requestParams).then(res=>{
      this.setData({
        userInfo:{avatar:res.info.avatar,realname:res.info.realname},
        userType:res.userType,
        userTypeName: res.userType == 1 ? "企业经理人" : res.userType == 2?"财务助理":"员工"
      })
    })
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