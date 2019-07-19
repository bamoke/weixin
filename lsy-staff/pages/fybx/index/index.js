// pages/work/fybx/index.js
const app = getApp();
const cateArr = [{
  name: "全部",
  type: "0"
}, {
  name: "待审批",
    type: "待审批"
}, {
  name: "审批通过",
  type: "通过"
}, {
  name: "审批未通过",
  type: "未通过"
}]
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageShow: true,
    pageInfo: {},
    cateArr,
    curNavIndex: 0,
    list: []
  },

  /**
    * Methods
    */
  changeCate(e) {
    const newIndex = parseInt(e.detail.index)
    const requestParams = {
      apiUrl: "/Expenses/vlist",
      requestData: {
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
  onLoad: function(options) {},


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    const requestParams = {
      apiUrl: "/Expenses/vlist"
    }
    app.ajax(requestParams).then((data) => {
      this.setData({
        showPage: true,
        list: data.list,
        pageInfo: data.pageInfo
      })
    })

  },

  /**
   * 下拉刷新
   */
  onPullDownRefresh:function(){
    var requestData = {}
    if (parseInt(this.data.curNavIndex) !== 0) {
      requestData.sp_status = cateArr[this.data.curNavIndex].type
    }
    const requestParams = {
      apiUrl: "/Expenses/vlist",
      requestData
    }
    app.ajax(requestParams).then((data) => {
      wx.stopPullDownRefresh()
      this.setData({
        list: data.list,
        pageInfo: data.pageInfo
      })
    })
  },

  /***
   * 加载更多
   */
  onReachBottom: function() {
    var oldList = this.data.list
    var pageInfo = this.data.pageInfo
    if (pageInfo.total <= (pageInfo.pageSize * pageInfo.page)) {
      return
    }
    var requestData = {
      page: parseInt(pageInfo.page) + 1
    }
    if (parseInt(this.data.curNavIndex) !== 0) {
      requestData.sp_status = cateArr[this.data.curNavIndex].type
    }
    const requestParams = {
      apiUrl: "/Expenses/vlist",
      requestData
    }
    app.ajax(requestParams).then((res) => {
      this.setData({
        list: oldList.concat(res.list),
        pageInfo: res.pageInfo
      })
    })
  }

})