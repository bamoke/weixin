// pages/orders/confirm/index.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showPage: false,
    goodsInfo: {},
    total: 0.00,
    favourable: 0.00,
    orderType: null,
    proId:null,
    couponId:null//优惠券id
  },

  goBuy: function() {
    let requestData = {
      type: this.data.orderType,
      proid: this.data.proId
    }
    if (this.data.couponId) {
      requestData.couponid = this.data.couponId
    }
    const requestParams = {
      apiUrl: '/Orders/create',
      requestData
    }

    var myPromise = app.ajax(requestParams);
    myPromise.then(res => {
      wx.requestPayment({
        timeStamp: res.data.timeStamp,
        nonceStr: res.data.nonceStr,
        package: res.data.package,
        signType: 'MD5',
        paySign: res.data.sign,
        success: function(payRes) {
          wx.redirectTo({
            url: '/pages/orders/success/index?orderno=' +res.data.orderNo,
          })
        },
        fail: function(res) {
          // wx.hideLoading();
          /*           wx.redirectTo({
                      url: '/pages/home/orders/index',
                    }) */
        }
      })
    }, err => {
      console.log(err)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const orderType = options.type
    const proId = options.proid
    const requestParams = {
      apiUrl: "/Orders/confirm",
      requestData: {
        type: orderType,
        proid: proId
      }
    }
    app.ajax(requestParams).then(res => {
      this.setData({
        showPage: true,
        goodsInfo: res.data.goodsInfo,
        favourable: res.data.favourable,
        total: res.data.total,
        orderType,
        proId
      })
      console.log(this.data)
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

  }
})