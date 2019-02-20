// pages/test/list/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showPage: false,
    page: 1,
    hasMore: false,
    total: 0,
    list: [],
    keywords: "",
    searchFocus: false
  },
  setFocus: function() {
    this.setData({
      searchFocus: true
    })
  },
  clearSearch: function() {
    let requestParams = {
      apiUrl: '/Test/vlist',
      showLoading:false,
      requestData: {}
    }

    app.ajax(requestParams).then(res => {
      this.setData({
        list: res.data.list,
        total: res.data.total,
        hasMore: res.data.hasMore,
        searchFocus: false,
        keywords: ""
      })
    })
  },
  doSearch: function(e) {
    const keywords = e.detail.value
    let requestParams = {
      apiUrl: '/Test/vlist',
      showLoading: false,
      requestData: {keywords}
    }

    app.ajax(requestParams).then(res => {
      this.setData({
        list: res.data.list,
        total: res.data.total,
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
    let requestParams = {
      apiUrl: '/Test/vlist',
      requestData: {}
    }

    app.ajax(requestParams).then(res => {
      this.setData({
        showPage: true,
        list: res.data.list,
        total: res.data.total,
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
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onReachBottom: function() {
    if (!this.data.hasMore) return
    let requestParams = {
      apiUrl: '/Test/vlist',
      requestData: {
        page: parseInt(this.data.page) + 1,
        keywords: this.data.keywords
      }
    }
    app.ajax(requestParams).then(res => {
      this.setData({
        page: res.data.page,
        total: res.data.total,
        hasMore: res.data.hasMore,
        list: this.data.list.concat(res.data.list)
      })
    })

  },



  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})