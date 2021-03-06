// pages/fiscal/index/index.js

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
    const requestParams = {
      apiUrl: "/Fiscal/index"
    }
    app.ajax(requestParams).then((data) => {
      wx.setStorageSync("subjectData", data.subjectInfo)//会计科目
      wx.setStorageSync("staffData", data.staffInfo)//员工
      wx.setStorageSync("departmentData", data.department)//部门
      wx.setStorageSync("capitalData", data.capitalAccount)//资金账户
      this.setData({
        showPage: true
      })
    }).catch(function(msg) {
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