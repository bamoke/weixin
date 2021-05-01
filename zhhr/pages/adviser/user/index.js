// pages/adviser/user/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showPage: false,
    curCateId: null,
    list: [],
    pageInfo:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(typeof options.cateid === 'undefined'){
      app.errorBack({tips:'参数错误'})
      return
    }
    const cateId = parseInt(options.cateid)
    let requestParams = {
      apiUrl:"/Adviser/user",
      requestData:{cateid:cateId}
    }
    app.ajax(requestParams).then(res => {
      this.setData({
        pageInfo: res.data.pageInfo,
        list: res.data.list,
        curCateId:cateId,
        showPage:true
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