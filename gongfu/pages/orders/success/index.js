// pages/orders/success/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showPage: false,
    orderNo: null,
    goodsInfo: {},
    favourable: null,
    coupon: {},
    orderInfo: {}
  },
  goBack: function() {
    wx.navigateBack({
      delta:1
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      orderNo: options.orderno
    })
    console.log(this.data)
  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    const requestParams = {
      apiUrl: "/Orders/detail",
      requestData: {
        orderno: this.data.orderNo
      }
    }
    app.ajax(requestParams).then(res => {
      this.setData({
        showPage: true,
        goodsInfo: res.data.goodsInfo,
        orderInfo: res.data.orderInfo,
        derateInfo: res.data.derateInfo //减免信息
      })
    })
  }
})