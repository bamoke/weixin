// pages/service/zjgl/index.js
// import util from '../../../utils/util';
const app = getApp();
const curDate = new Date();
const year = curDate.getFullYear();
var month = curDate.getMonth() + 1;
month = month < 10 ? "0" + month : month
var curMonth = [year, month].join("-")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    showPage: false,
    pageInfo: {
      page: 1
    },
    type: 1, //1:应收;2:应付
    list: [],
    curMonth: "",
    toMonth: curMonth

  },

  /**
   * 
   */
  switchType(e) {
    var type = e.currentTarget.dataset.type
    var requestParams = {
      apiUrl: "/Ysyf/vlist",
      requestData: {
        type: type,
        month: this.data.curMonth
      }
    }
    app.ajax(requestParams).then(res => {
      this.setData({
        list: res.list,
        totalInfo: res.totalInfo,
        pageInfo: res.pageInfo,
        type: type
      })
    })
  },
  handleMonthChange(e) {
    const newMonth = e.detail.value
    var type = this.data.type
    var requestParams = {
      apiUrl: "/Ysyf/vlist",
      requestData: {
        type: type,
        month: newMonth
      }
    }
    app.ajax(requestParams).then(res => {
      this.setData({
        list: res.list,
        totalInfo: res.totalInfo,
        pageInfo: res.pageInfo,
        curMonth: newMonth
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var curType = typeof options.type !== "undefined" ? parseInt(options.type) : 1
    var requestParams = {
      apiUrl: "/Ysyf/vlist",
      requestData: {
        type: curType,
        month: curMonth
      }
    }
    app.ajax(requestParams).then(res => {
      this.setData({
        showPage: true,
        list: res.list,
        totalInfo: res.totalInfo,
        pageInfo: res.pageInfo,
        type: curType,
        curMonth
      })
    })


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
    var curMonth = this.data.curMonth
    var type = this.data.type
    var requestParams = {
      apiUrl: "/Ysyf/vlist",
      requestData: {
        type: type,
        month: curMonth
      }
    }
    app.ajax(requestParams).then(res => {
      wx.stopPullDownRefresh()
      this.setData({
        list: res.list,
        totalInfo: res.totalInfo,
        pageInfo: res.pageInfo
      })
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    var curMonth = this.data.curMonth
    var type = this.data.type
    const pageInfo = this.data.pageInfo
    var odlList = this.data.list
    var page = parseInt(pageInfo.page) + 1
    var requestParams = {
      apiUrl: "/Ysyf/vlist",
      requestData: {
        type: type,
        month: curMonth,
        page
      }
    }
    if (pageInfo.total <= pageInfo.page * pageInfo.pageSize ) return
    app.ajax(requestParams).then(res => {
      wx.stopPullDownRefresh()
      this.setData({
        list: odlList.concat(res.list),
        totalInfo: res.totalInfo,
        pageInfo: res.pageInfo
      })
    })
  }


})