// pages/home/index/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageShow: true,
    news:[],
    curComInfo:{},
    comList:[]
  },

  bindComChange:function(e){
    const value = e.detail.value
    var curComInfo = this.data.comList[value]
    wx.setStorageSync("curComInfo", curComInfo)
    this.setData({ curComInfo})
  },
  _fetchData(afterFun){
    const requestParams = {
      apiUrl: '/Index/index',
      isShowLoad: false
    }
    // wx.showNavigationBarLoading();
    app.ajax(requestParams).then(data => {
      wx.hideNavigationBarLoading();
      this.setData({
        curComInfo: data.curComInfo,
        pageShow: true,
        news: data.notice
      })
      if(typeof afterFun !== 'undefined') {
        afterFun()
      }
    },rejet=>{
      wx.stopPullDownRefresh()
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
    // console.log("ready")
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this._fetchData()
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
    var afterFunction = function(){
      wx.stopPullDownRefresh()
    }
    this._fetchData(afterFunction)
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