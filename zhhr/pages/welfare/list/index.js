// pages/welfare/list/index.js
const app = getApp();
var amapFile = require('../../../libs/amap-wx.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showPage: true,
    type: 1,
    page: 1,
    total: 34,
    locationInfo: {},
    welfareList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var _that = this;
    var myAmapFun = new amapFile.AMapWX({
      key: '8d2304d0927601db4c4d5020bcd1f625'
    });
    var locationInfo;
    myAmapFun.getRegeo({
      success: function(data) {
        //成功回调
        const result = data[0];
        const addressInfo = result.regeocodeData.addressComponent
        console.log(result)
        locationInfo = {
          city: addressInfo.city,
          district: addressInfo.district,
          streetInfo: addressInfo.streetNumber.street + addressInfo.streetNumber.number,
          latitude: result.latitude,
          longitude: result.longitude
        }
        _that.setData({
          locationInfo
        })
      },
      fail: function(info) {
        //失败回调
        wx.showModal({
          title: '位置信息获取失败',
          content: '',
          showCancel: false,
          success(res) {
            if (res.confirm) {
              wx.navigateBack({
                delta: 1
              })
            }
          }

        })
      }
    })
    /*     wx.getLocation({
          type: 'wgs84',
          success(res) {
            console.log(res)
            const latitude = res.latitude
            const longitude = res.longitude
            const speed = res.speed
            const accuracy = res.accuracy
          }
        }) */
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})