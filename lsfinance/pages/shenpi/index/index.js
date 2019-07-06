// pages/work/fybx/index.js
const app = getApp();
const cateArr = [{
  name: "全部",
  type: "all"
}, {
  name: "待审批",
  type: "0"
}, {
  name: "审批通过",
  type: "1"
}, {
  name: "审批未通过",
  type: "2"
}]
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cateArr: cateArr,
    curNavIndex: 0,
    pageShow: true,
    pageInfo: {},
    list: []
  },

  /**
   * Methods
   */
  changeCate(e){
    const newIndex = parseInt(e.detail.index)
    const requestParams = {
      apiUrl: "/Shenpi/vlist",
      requestData: {
        comid: this.data.comId,
        sp_status: cateArr[newIndex].type
      }
    }
    app.ajax(requestParams).then((data) => {
      this.setData({
        curNavIndex: newIndex,
        list: data.list,
        pageInfo: data.pageInfo
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const curComInfo = wx.getStorageSync("curComInfo")
    const requestParams = {
      apiUrl: "/Shenpi/vlist",
      requestData: {
        comid: curComInfo.comId
      }
    }
    app.ajax(requestParams).then((data) => {
      this.setData({
        showPage: true,
        comId: curComInfo.comId,
        list: data.list,
        pageInfo: data.pageInfo
      })
    }).catch(function (msg) {
      /*       setTimeout(function() {
              wx.navigateBack({
                delta: 1
              })
            }, 1000) */
    })

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    const navIndex = this.data.curNavIndex
    const requestParams = {
      apiUrl: "/Shenpi/vlist",
      requestData: {
        comid: this.data.comId,
        sp_status: cateArr[navIndex].type
      }
    }
    app.ajax(requestParams).then((data) => {
      wx.stopPullDownRefresh();
      this.setData({
        list: data.list,
        pageInfo: data.pageInfo
      })
    })
  },
    /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    var oldList = this.data.list
    var pageInfo = this.data.pageInfo
    if (pageInfo.total <= (pageInfo.pageSize * pageInfo.page)) {
      return
    }
    const requestParams = {
      apiUrl: "/Expenses/vlist",
      requestData: {
        comid: this.data.comId,
        page: parseInt(pageInfo.page) + 1,
        sp_status: cateArr[this.data.curNavIndex].type
      }
    }
    app.ajax(requestParams).then((res) => {
      this.setData({
        list: oldList.concat(res.list),
        pageInfo: res.pageInfo
      })
    }).catch(function(msg) {
      /*       setTimeout(function() {
              wx.navigateBack({
                delta: 1
              })
            }, 1000) */
    })
  }

})