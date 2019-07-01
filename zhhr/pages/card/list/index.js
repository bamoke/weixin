// pages/card/list/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showPage: false,
    keywords: '',
    page: 1,
    hasMore: false,
    list: []
  },
  setKeywords(e) {
    this.setData({
      keywords: e.detail.value
    })
  },
  search:function(e){
    const keywords = e.detail.value || this.data.keywords
    let requestParams = {
      apiUrl: '/Card/vlist',
      requestData: {keywords}
    }
    app.ajax(requestParams).then(res => {
      this.setData({
        keywords,
        page: res.data.page,
        total: res.data.total,
        hasMore: res.data.hasMore,
        list: res.data.list
      })
    })
  },
  /**
   * 
   */
  doExchange:function(e){
    const index = e.currentTarget.dataset.index
    let list = this.data.list
    let requestParams = {
      apiUrl: '/Exchange/doexchange',
      requestData: { cardid: list[index].id},
      isShowLoad:false
    }
    app.ajax(requestParams).then(res => {
      list[index].exchange_status = 1
      wx.showToast({
        title: '等待对方同意',
        icon:'none',
        duration:1000
      })
      this.setData({list})
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
      apiUrl: '/Card/vlist',
      requestData: {}
    }
    app.ajax(requestParams).then(res => {
      this.setData({
        showPage:true,
        page: res.data.page,
        total:res.data.total,
        hasMore:res.data.hasMore,
        list:res.data.list
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
  onReachBottom: function () {
    if(!this.data.hasMore) return
    let requestParams = {
      apiUrl: '/Card/vlist',
      requestData: { page: parseInt(this.data.page)+1,keywords:this.data.keywords}
    }
    app.ajax(requestParams).then(res => {
      this.setData({
        page: res.data.page,
        total: res.data.total,
        hasMore: res.data.hasMore,
        list: this.data.list.concat(res.data.list)
      })
    })
 
  }


})