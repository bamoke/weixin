// pages/ysyf/detail/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showPage: false,
    list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (typeof options.target === 'undefined' ||
      typeof options.month === 'undefined' ||
      typeof options.type === 'undefined') {
      app.errorBack({
        tips: "访问错误"
      })
    }

    var type = options.type
    var curTarget = options.target
    var curMonth = options.month
    var requestParams = {
      apiUrl: '/Ysyf/detail',
      requestData: {
        type: type,
        target: curTarget,
        month: curMonth
      }
    }
    app.ajax(requestParams).then(res=>{
      
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

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  }


})