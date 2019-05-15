// pages/article/list/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showPage:false,
    pageInfo:{
      page:1,
      pageSize:10,
      total:0,
      hasMore:false
    },
    list:[]
  },

  /**
   * Handle
   */


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var requestParams = {
      apiUrl: "/Article/vlist",
      requestData: { page: 1, cate: 0 }
    }
    app.ajax(requestParams).then(res => {
      this.setData({
        pageInfo: res.data.pageInfo,
        list: res.data.list,
        showPage: true
      })
    })
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

  }

 
})