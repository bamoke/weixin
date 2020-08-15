// pages/home/mycourse/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showPage: false,
    pageInfo: {
      page: 0,
      total: 0
    },
    list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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
    let requestParams = {
      apiUrl: '/Home/mycourse'
    }
    app.ajax(requestParams).then(res => {
      this.setData({
        showPage: true,
        pageInfo: res.data.pageInfo,
        list: res.data.list
      })
    })
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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    const pageInfo = this.data.pageInfo
    let requestParams = {
      apiUrl: '/Home/mycourse',
      requestData: {
        page: parseInt(pageInfo.page) + 1
      }
    }
    var oldList =this.data.list
    if (pageInfo.total > pageInfo.page * pageInfo.pageSize) {
      app.ajax(requestParams).then(res => {
        this.setData({
          pageInfo:res.data.pageInfo,
          list: oldList.concat(res.data.list)
        })
      })
    }
  }


})