// pages/grants/list/index.js
const app =getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showPage:false,
    pageInfo:{},
    list:[],

  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const curCateId = options.cateid
    app.ajax({
      apiUrl:"/Grants/vlist"
    }).then(res=>{
      this.setData({
        showPage:true,
        list:res.data.list,
        pageInfo:res.data.pageInfo
      })
    })
  },





  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    app.ajax({
      apiUrl:"/Grants/vlist",
      requestData:{}
    }).then(res=>{
      wx.stopPullDownRefresh()
      this.setData({
        list:res.data.list,
        pageInfo:res.data.pageInfo
      })
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    const pageInfo = this.data.pageInfo
    if (pageInfo.total <= (pageInfo.pageSize * pageInfo.page)) return
    let requestParams = {
      apiUrl: '/Grants/vlist',
      requestData: {page: parseInt(pageInfo.page) + 1 }
    }
    app.ajax(requestParams).then(res => {
      this.setData({
        pageInfo:res.data.pageInfo,
        list: this.data.list.concat(res.data.list)
      })
    })
  }


})