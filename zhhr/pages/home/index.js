// pages/home/index/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showPage:false,
    cardInfo:{}
  },
  /**
   * Action
   */
  getUserInfo: function (e) {
    if (typeof e.detail.userInfo === 'undefined') return;
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let requestParams = {
      apiUrl: '/Home/index',
      requestData: {}
    }
    app.ajax(requestParams).then(res => {
      this.setData({
        showPage: true,
        cardInfo:res.data.cardInfo
      })
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
  
  }

})