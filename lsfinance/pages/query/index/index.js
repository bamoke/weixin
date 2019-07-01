// pages/query/index/index.js
const app =getApp()
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
  onLoad: function (options) {
    const curComInfo = wx.getStorageSync("curComInfo")
    const userInfo = wx.getStorageSync("userInfo")
    if(userInfo.userType == 3) {
      app.errorBack({tips:"此功能仅限企业管理人员查看"})
      return
    }
    this.setData({
      curComObjectId: curComInfo.objectId,
      showPage:true
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

  }

 
})