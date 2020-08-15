// pages/home/index/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showPage:false,
    userInfo:{},
    recordList:[]
  },
  /**
   * Action
   */
  getUserInfo: function (e) {
    if (typeof e.detail.userInfo === 'undefined') return;
    const mpUserInfo = e.detail.userInfo
    app.globalData.userInfo = mpUserInfo
    let userInfo = this.data.userInfo

    if (userInfo.avatar === mpUserInfo.avatarUrl) return false;
    userInfo.avatar = mpUserInfo.avatarUrl
    userInfo.nickname = mpUserInfo.nickName
    app.ajax({
      apiUrl: "/Account/updateUserinfo",
      requestMethod:"POST",
      requestData: { avatar: mpUserInfo.avatarUrl}
    }).then(res => {
      this.setData({
        userInfo
      })
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
    const params = {
      apiUrl: "/Home/index",
      requestMethod: "GET"
    }
    const ajaxRequest = app.ajax(params)
    ajaxRequest.then(res => {
      this.setData({
        showPage: true,
        userInfo: res.data.userInfo,
        recordList: res.data.recordList
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
  
  }

})