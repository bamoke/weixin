// pages/video/detail/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showPage:false,
    curId:null,
    detail:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const id = options.id
    const params = {
      apiUrl: "/Article/detail",
      requestData:{id},
      requestMethod: "GET"
    }
    const ajaxRequest = app.ajax(params)
    ajaxRequest.then(res => {
      console.log(res)
      this.setData({
        showPage: true,
        curId:id,
        detail: res.data.info,
      })
    })
  }
})