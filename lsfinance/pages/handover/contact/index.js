// pages/handover/contact/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showPage:true,
    info:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const curComInfo = wx.getStorageSync("curComInfo")
    let requestParams = {
      apiUrl:"/Handover/contact",
      requestData:{id:curComInfo.objectId}
    }
    app.ajax(requestParams).then(res=>{
      this.setData({
        showPage:true,
        info:res.info
      })
    })
  }



 
})