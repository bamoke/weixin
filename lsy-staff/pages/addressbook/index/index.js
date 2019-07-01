// pages/teams/index/index.js

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showPage: false,
    list: []
  },

  /**
   * phone call
   */
  phoneCall(e) {
    const phone = e.currentTarget.dataset.phone
    if(!phone) return;
    wx.makePhoneCall({
      phoneNumber: phone
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function(options) {
    const requestParams = {
      apiUrl: "/Team/vlist",
      requestData: {
        page: 1
      },
      method: "get"
    }
    app.ajax(requestParams).then(res => {
      this.setData({
        showPage: true,
        pageInfo: res.pageInfo,
        list: res.list
      })
    }, reject => {
      if (reject.code === 13009) {
        app.errorBack(reject.msg)
      }
    })
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },


  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    const requestParams = {
      apiUrl: "/Team/vlist",
      requestData: {
        page: 1
      },
      method: "get"
    }
    app.ajax(requestParams).then(res => {
      this.setData({
        pageInfo: res.pageInfo,
        list: res.list
      })
      wx.stopPullDownRefresh()
    }, reject => {
      if (reject.code === 13009) {
        app.errorBack(reject.msg)
      }
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  }


})