// pages/article/list/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showPage: false,
    curCid:null,
    cateInfo:{},
    page: 1,
    hasMore: false,
    total: 0,
    list: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const cid = options.cid
    this.setData({
      curCid:cid
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
    let requestParams = {
      apiUrl: '/News/index',
      requestData: {cid:this.data.curCid}
    }

    app.ajax(requestParams).then(res => {
      this.setData({
        showPage: true,
        list: res.data.list,
        total: res.data.total,
        hasMore: res.data.hasMore,
        cateInfo:res.data.cateInfo
      })
      wx.setNavigationBarTitle({
        title: res.data.cateInfo.name
      })
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
      if (!this.data.hasMore) return
      let requestParams = {
        apiUrl: '/News/vlist',
        requestData: {
          page: parseInt(this.data.page) + 1,
          cid:this.data.cid
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
  onShareAppMessage: function () {

  }
})