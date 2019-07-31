// pages/home/childaccount/list/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showPage:false,
    memberList:[]
  },
  onLoad(){
    const curComInfo = wx.getStorageSync("curComInfo")
    this.setData({
      curComInfo
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.showNavigationBarLoading()
    const requestParams = {
      apiUrl: "/ChildAccount/vlist",
      requestData:{comid:this.data.curComInfo.comId},
      isShowLoad:false
    }
    app.ajax(requestParams).then(res => {
      wx.hideNavigationBarLoading()
      this.setData({
        showPage:true,
        memberList:res.list
      })
    })
  }
})