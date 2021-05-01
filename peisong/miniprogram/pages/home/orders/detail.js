// pages/home/orders/detail.js
const App = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showPage:true,
    baseInfo:{},
    goods:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(typeof options.id === 'undefined') {
      App.errorBack({tips:'非法请求'});
    }
    const id = options.id
    App.ajax({
      apiUrl: '/Orders/detail',
      requestData:{id},
      requestMethod: "get"
    }).then(res => {
      this.setData({
        baseInfo: res.data.base,
        goods: res.data.goods,
        showPage:true
      })
    }, reject => {

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