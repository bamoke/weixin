// pages/card/detail/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showPage: false,
    id: null,
    exchangeStatus: 0,
    isCollected: false,
    isLike: false,
    collectedTotal: 0,
    likeTotal: 0,
    cardInfo: {}
  },

  /**
   * 
   */
  doExchange: function() {
    const requestParams = {
      apiUrl: "/Exchange/doexchange",
      requestData: {
        cardid: this.data.id
      }
    }
    const request = app.ajax(requestParams)
    request.then(res => {
      wx.showToast({
        title: '提交成功,请等待对方审核',
        icon: 'success'
      })
      setTimeout(function() {
        wx.navigateBack({
          delta: 1
        })
      }, 1000)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      id: options.id
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
    const requestParams = {
      apiUrl: "/Card/detail",
      requestData: {
        id: this.data.id
      }
    }
    app.ajax(requestParams).then(res => {
      this.setData({
        showPage: true,
        exchangeStatus: res.data.exchangeStatus,
        isCollected: res.data.isCollected,
        isLike: res.data.isLike,
        collectedTotal: res.data.collectedTotal,
        likeTotal: res.data.likeTotal,
        cardInfo: res.data.cardInfo
      })
    })
  }


})