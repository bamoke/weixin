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
    const userInfo = wx.getStorageSync("userInfo")
    if (userInfo.userType == 3) {
      app.errorBack({ tips: "此功能仅限企业管理人员查看" })
      return
    }
    const requestParams = {
      apiUrl: "/Fiscal/index",
      requestData: {
        comid: curComInfo.comId
      }
    }
    util.request(requestParams).then((data) => {
      wx.setStorageSync("orgInfo", data.orgInfo)
      wx.setStorageSync("subjectData", data.subjectInfo)//会计科目
      wx.setStorageSync("staffData", data.staffInfo)//员工
      wx.setStorageSync("departmentData", data.department)//部门
      wx.setStorageSync("capitalData", data.capitalAccount)//资金账户
      this.setData({
        showPage: true
      })
    }).catch(function(msg) {
      wx.removeStorageSync("orgInfo")
      wx.removeStorageSync("subjectData")
      wx.removeStorageSync("staffData")
      wx.removeStorageSync("partmentData")
      wx.removeStorageSync("capitalData")
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