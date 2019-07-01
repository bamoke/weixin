// pages/home/profile/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const requestParams = {
      apiUrl: "/Home/profile"
    }
    app.ajax(requestParams).then(res => {
      this.setData({
        showPage: true,
        ...res
      })
    })
  }




})