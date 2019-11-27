// pages/service/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var list = [
      {
        id:1,
        title:"公司注册",
        desc:"内资企业、外资、合资企业设立承办流程",
        thumb:"/static/images/service-pic-01.jpg"
      },
      {
        id: 2,
        title: "工商服务",
        desc: "内资企业、外资、合资企业设立承办流程",
        thumb: "/static/images/service-pic-02.jpg"
      },
      {
        id: 3,
        title: "财税代理",
        desc: "内资企业、外资、合资企业设立承办流程",
        thumb: "/static/images/service-pic-03.jpg"
      },
      {
        id: 4,
        title: "顾问服务",
        desc: "内资企业、外资、合资企业设立承办流程",
        thumb: "/static/images/service-pic-04.jpg"
      }
    ]
    this.setData({list})
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