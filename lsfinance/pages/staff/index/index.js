// pages/teams/index/index.js

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showPage: false,
    list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const curComInfo = wx.getStorageSync("curComInfo")
    this.setData({
      curComInfo
    })
  },

  /**
   * add member
   */
  addMember: function() {
    wx.navigateTo({
      url: '../add/index',
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
    const requestParams = {
      apiUrl: "/Team/vlist",
      requestData:{page:1,comid:this.data.curComInfo.comId},
      method: "get"
    }
    app.ajax(requestParams).then(res => {
      this.setData({
        showPage: true,
        ...res
      })
    }, reject => {
      if (reject.code === 13010) {
        app.errorBack(reject.msg)
      }
    })
  },



  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  }


})