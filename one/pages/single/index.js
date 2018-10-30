const app = getApp()
import util from "../../utils/util"
// pages/single/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showPage:false,
    cate:[],
    curCid:null,
    list:[],
    curPage:1,
    hasMore:false
  },

_fetchData:function(cid){

},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let requestParams = {
      apiUrl: "/News/index",
      requestMethod: "GET"
    }
    const ajaxRequest = util.request(requestParams)
    ajaxRequest.then(res => {
      this.setData({
        showPage: true,
        curPage: res.data.page,
        hasMore: res.data.hasMore,
        list: res.data.list,
        cate:res.data.cate
      })
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
    if (!this.data.hasMore) return;
    const filter = this.data.filter
    let postData = {
      p: this.data.curPage + 1
    }
    if(this.data.curCid) {
      postData.cid = this.data.curCid
    }
    const requestParams = {
      apiUrl: "/News/vlist",
      requestMethod: "GET",
      requestData: postData
    }
    const ajaxRequest = util.request(requestParams)
    ajaxRequest.then(res => {
      this.setData({
        hasMore: res.data.hasMore,
        list: this.data.list.concat(res.data.list),
        curPage: res.data.page
      })
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})