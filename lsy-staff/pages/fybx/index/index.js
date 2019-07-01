// pages/work/fybx/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageShow: true,
    pageInfo: {},
    list: []
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
        showPage:true,
        list: data.list,
        pageInfo: data.pageInfo
      })
    }).catch(function(msg) {
      /*       setTimeout(function() {
              wx.navigateBack({
                delta: 1
              })
            }, 1000) */
    })

  },
  onReachBottom: function() {
    var oldList = this.data.list
    var pageInfo = this.data.pageInfo
    if (pageInfo.total <= (pageInfo.pageSize * pageInfo.page)) {
      return
    }
    const requestParams = {
      apiUrl: "/Expenses/vlist",
      requestData: {
        page: parseInt(pageInfo.page) + 1
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