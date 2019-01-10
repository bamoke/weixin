// pages/course/list/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showPage: false,
    list: [],
    page: 1,
    hasMore: false,
    curTag: 'hot'
  },
  changeTag: function(e) {
    const tag = e.currentTarget.dataset.tag
    const requestParams = {
      apiUrl: '/Course/vlist',
      requestData: {
        tag
      }
    }
    this.setData({curTag:tag})
    app.ajax(requestParams).then(res => {
      this.setData({
        
        list: res.data.list,
        page: res.data.page,
        hasMore: res.data.hasMore
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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
    const requestParams = {
      apiUrl: '/Course/vlist',
      requestData: {
        page: this.data.page
      }
    }
    app.ajax(requestParams).then(res => {
      this.setData({
        showPage: true,
        curTag:'hot',
        list: res.data.list,
        page: res.data.page,
        hasMore: res.data.hasMore
      })
    })
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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  }


})