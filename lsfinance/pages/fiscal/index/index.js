// pages/fiscal/index/index.js
import util from '../../../utils/util';
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showPage:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var curComInfo = wx.getStorageSync("curComInfo");
    const requestParams = {
      apiUrl: "/Fiscal/index",
      requestData: {
        comid: curComInfo.comId
      }
    }
    util.request(requestParams).then((data) => {
      wx.setStorageSync("orgInfo", data.orgInfo)
      wx.setStorageSync("subjectData", data.subjectInfo)
      wx.setStorageSync("staffData", data.staffInfo)
      this.setData({
        showPage: true
      })
    }).catch(function(msg) {
      wx.removeStorageSync("orgInfo")
      wx.removeStorageSync("subjectData")
      wx.removeStorageSync("staffData")
      setTimeout(function() {
        wx.navigateBack({
          delta: 1
        })
      }, 1000)
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

  }


})