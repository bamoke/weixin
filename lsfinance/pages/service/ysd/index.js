// pages/service/ysd/index.js
import util from '../../../utils/util';
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showPage:false,
    curPage:1,
    list:[],
    totalInfo:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var dataList = [
      {
        "ysNo":1,
        "ysTarget":'客户1',
        "amount":"1220",
        "name":"3月服务费",
        "time":"2018-03-27"
      },
      {
        "ysNo": 2,
        "ysTarget": '客户2',
        "amount": "220",
        "name": "5月文具采购",
        "time": "2018-06-10"
      },
      {
        "ysNo": 3,
        "ysTarget": '客户3',
        "amount": "6867",
        "name": "5月餐饮费",
        "time": "2018-06-21"
      },
      {
        "ysNo": 4,
        "ysTarget": '客户4',
        "amount": "365.23",
        "name": "6月酒水费用",
        "time": "2018-06-25"
      }
    ]
    var totalInfo ={
      "amount":"25,148.55",
      "num":8
    }
    this.setData({
      showPage:true,
      list:dataList,
      totalInfo: totalInfo
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