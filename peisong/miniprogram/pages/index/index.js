// miniprogram/pages/index/index.js
const App = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showPage: false,
    cateList: [],
    proList: []
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    App.ajax({
      apiUrl: '/Index/index',
      requestMethod: "get"
    }).then(res => {
      this.setData({
        showPage: true,
        proList: res.data.prolist,
        bannerList: res.data.banner,
        cateList: res.data.catelist
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
        proList: res.data.prolist,
        bannerList: res.data.banner,
        cateList: res.data.catelist
      })
    }, reject => {

    })
  },



  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})