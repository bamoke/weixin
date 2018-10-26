// pages/home/index/index.js
import util from '../../utils/util';
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageShow: true,
    news:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const requestParams = {
      apiUrl : '/Index/index'
    }
    util.request(requestParams).then(data=> {
        this.setData({
          pageShow:true,
          news:[
            {
              id:1,
              "title":'2018年国庆放假通知',
              "date":'09-29'
            }
          ]
        })
      })
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
    // console.log("show")
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