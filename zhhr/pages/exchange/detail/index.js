// pages/card/detail/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showPage: false,
    id: null,
    isFriend:false,
    isCollected: false,
    isLike: false,
    collectedTotal: 0,
    likeTotal: 0,
    cardInfo: {}
  },

  /**
   * verify
   */
  verify: function (e) {
    if (!e.target.dataset.status) return;
    const status = e.target.dataset.status
    let requestParams = {
      apiUrl: '/Exchange/verify',
      requestData: { id: this.data.exchangeId, status }
    }
    app.ajax(requestParams).then(res => {
      wx.showToast({
        title: '操作成功',
        icon:"success"
      })
      setTimeout(function(){
        wx.navigateBack({
          delta:1
        })
      },1000)
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: parseInt(options.cardid),
      exchangeId:parseInt(options.exchangeid)
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
    const requestParams = {
      apiUrl: "/Exchange/detail",
      requestData: {
        id: this.data.id
      }
    }
    app.ajax(requestParams).then(res => {
      this.setData({
        showPage: true,
        isFriend:res.data.isFriend,
        exchangeStatus:res.data.exchangeStatus,
        isCollected: res.data.isCollected,
        isLike: res.data.isLike,
        collectedTotal: res.data.collectedTotal,
        likeTotal: res.data.likeTotal,
        cardInfo: res.data.cardInfo
      })
    })
  }


})