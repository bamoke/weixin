// miniprogram/pages/index/index.js
const App = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showPage: false,
    cateList: [],
    proList: [],
    pageInfo:{}
  },
  /**
   * 
   * @param {*} options 
   */
  updateList(e){
    let {newItem,index} = {...e.detail}
    let list = this.data.proList
    list[index] = newItem
    this.setData({
      proList:list
    })
  },

  handleGotoProduct(e){
    const cateFullName = e.currentTarget.dataset.fullname
    wx.setStorageSync('curCate', cateFullName)
    wx.switchTab({
      url: '/pages/product/list/list'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function (options) {
    App.ajax({
      apiUrl: '/Index/index',
      requestMethod: "get"
    }).then(res => {
      this.setData({
        showPage: true,
        proList: App.compare(res.data.proList),
        bannerList: res.data.banner,
        cateList: res.data.cateList,
        pageInfo:res.data.pageInfo
      })
    }, reject => {

    })

  },



  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    App.ajax({
      apiUrl: '/Index/index',
      requestMethod: "get"
    }).then(res => {
      wx.stopPullDownRefresh()
      this.setData({
        proList: App.compare(res.data.proList),
        bannerList: res.data.banner,
        cateList: res.data.cateList,
        pageInfo:res.data.pageInfo
      })
    }, reject => {

    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var oldList = this.data.proList
    var pageInfo = this.data.pageInfo
    // App.ajax({
    //   apiUrl: '/Product/vlist',
    //   requestData: { page: parseInt(pageInfo.page) + 1 },
    //   requestMethod: "get"
    // }).then(res => {
    //   this.setData({
    //     proList: oldList.concat(res.data.proList),
    //     pageInfo:res.data.pageInfo
    //   })
    // }, reject => {

    // })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})