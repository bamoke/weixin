// pages/draft/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type:null,
    toUrl:"",
    showPage:false,
    page:1,
    hasMore:false,
    list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (!options.type) {
      wx.showToast({
        title: '访问数据错误',
        image: "/static/images/icon-error.png"
      })
      setTimeout(function () {
        wx.navigateBack({
          delta: 1
        })
      }, 1000)
      //==//
    }
    this.setData({
      type:options.type
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
    const type = this.data.type;
    const comInfo = wx.getStorageSync("curComInfo")
    const apiUrl = "/Draft/vlist"
    const requestParams = {
      apiUrl,
      requestData: {
        type,
        comid: comInfo.comId
      }
    }
    app.ajax(requestParams).then((res) => {
      const toUrl = type == 1 ? "/pages/fybx/new/index?" : type == 2 ? "/pages/fyzc/new/index?" : "/pages/handover/jjd/new/index?"
      this.setData({
        type,
        toUrl,
        showPage: true,
        page: res.page,
        hasMore: res.hasMore,
        list: res.list
      })

    })
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

  }
})