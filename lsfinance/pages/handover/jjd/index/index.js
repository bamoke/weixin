// pages/work/fybx/index.js
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
    pageShow: true,
    curPage: 1,
    list: [],
    curMonth: "",
    curStatus: "",
    statusArr: ["全部", "已审核", "未审核"],
  },

  /**Methods */
  handleStatusChange(e) {
    var statusIndex = e.detail.value
    var curStatus = statusIndex == 0 ? "" : this.data.statusArr[statusIndex]
    const requestParams = {
      apiUrl: "/Voucher/vlist",
      requestData: {
        status: curStatus,
        month: this.data.curMonth,
        comid: this.data.comId
      }
    }
    app.ajax(requestParams).then((res) => {
      this.setData({
        list: res.list,
        pageInfo: res.pageInfo,
        curStatus: curStatus
      })
    })
  },
  handleMonthChange(e) {
    var newMonth = e.detail.value
    const requestParams = {
      apiUrl: "/Voucher/vlist",
      requestData: {
        status: this.data.curStatus,
        month: newMonth,
        comid: this.data.comId
      }
    }
    app.ajax(requestParams).then((res) => {
      this.setData({
        list: res.list,
        pageInfo: res.pageInfo,
        curMonth: newMonth
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const curComInfo = wx.getStorageSync("curComInfo")
    if (!curComInfo) {
      app.errorBack("参数错误")
    }
    this.setData({
      comId: curComInfo.comId
    })


  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    const requestParams = {
      apiUrl: "/Voucher/vlist",
      requestData: {
        comid: this.data.comId
      }
    }
    app.ajax(requestParams).then((res) => {
      this.setData({
        list: res.list,
        pageInfo: res.pageInfo
      })
    })

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    var curMonth = this.data.curMonth
    var curStatus = this.data.curStatus
    var requestParams = {
      apiUrl: "/Voucher/vlist",
      requestData: {
        status: curStatus,
        comid: this.data.comId,
        month: curMonth
      }
    }
    app.ajax(requestParams).then(res => {
      wx.stopPullDownRefresh()
      this.setData({
        list: res.list,
        pageInfo: res.pageInfo
      })
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    var curMonth = this.data.curMonth
    var curStatus = this.data.curStatus
    const pageInfo = this.data.pageInfo
    var oldList = this.data.list
    var page = parseInt(pageInfo.page) + 1
    var requestParams = {
      apiUrl: "/Voucher/vlist",
      requestData: {
        status: curStatus,
        comid: this.data.comId,
        month: curMonth,
        page
      }
    }
    if (pageInfo.total <= pageInfo.page * pageInfo.pageSize) return
    app.ajax(requestParams).then(res => {
      wx.stopPullDownRefresh()
      this.setData({
        list: oldList.concat(res.list),
        pageInfo: res.pageInfo
      })
    })
  }

})