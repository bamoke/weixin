 // pages/service/index/index.js
import util from '../../../utils/util';
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    curCompanyName: '',
    comList: []
  },
  /**
   * 切换公司
   */
  bindComChange: function (e) {
    var index = e.detail.value;
    var comList = this.data.comList;
    var curCom = wx.getStorageSync("curCom");
    if (comList[index].comId != curCom.comId) {
      wx.setStorageSync("curCom", comList[index]);
      this.setData({
        curCompanyName: comList[index].comShortName
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var curCom = wx.getStorageSync("curCom");
    var comList = [];
    var apiUrl = '/Account/getcompany';
    var curCompanyName;
    util.request(apiUrl).then(data => {
      comList = data.comList
      if (curCom == '') {
        wx.setStorageSync("curCom", { "id": comList[0]['comId'], "comShortName": comList[0]['comShortName'], "comName": comList[0]['comName'] });
        curCompanyName = comList[0]['comShortName'];
      } else {
        curCompanyName = curCom.comShortName
      }
      this.setData({
        curCompanyName: curCompanyName,
        comList: comList
      })
    }).catch(reject => {
      console.log(reject);
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