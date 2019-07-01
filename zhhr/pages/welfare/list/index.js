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
    pageInfo: {
      total: 0,
      page: 1,
      pageSize: 10,
      hasMore: false
    },
    locationInfo: {},
    welfareList: []
  },

  /**
   * handle
   */
  handleChangeType(e) {
    var type = e.target.dataset.type
    if (typeof e.target.dataset.type === 'undefined') return false;
    var locationInfo = this.data.locationInfo
    var requestParams = {
      apiUrl: "/welfare/vlist",
      requestData: {
        lat: locationInfo.latitude,
        lng: locationInfo.longitude,
        page: 1,
        type
      },
      showLoading: false
    }
    app.ajax(requestParams).then(res => {
      this.setData({
        pageInfo: res.data.pageInfo,
        welfareList: res.data.list,
        type
      })
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function(options) {
    var _that = this;
    var myAmapFun = new amapFile.AMapWX({
      key: '8d2304d0927601db4c4d5020bcd1f625'
    });
    var locationInfo;
    myAmapFun.getRegeo({
      success: data => {
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

        let requestParams = {
          apiUrl: "/welfare/vlist",
          requestData: {
            page: 1,
            type: 1,
            lat: locationInfo.latitude,
            lng: locationInfo.longitude
          }
        }
        _that.setData({
          locationInfo
        })
        app.ajax(requestParams).then(res => {
          _that.setData({
            pageInfo: res.data.pageInfo,
            welfareList: res.data.list
          })
        })

      },
      fail: function(info) {
        //失败回调
        console.log(info)
        wx.showModal({
          title: '位置信息获取失败',
          content: info,
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

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    var locationInfo = this.data.locationInfo
    var type = this.data.type
    var requestParams = {
      apiUrl: "/welfare/vlist",
      requestData: {
        lat: locationInfo.latitude,
        lng: locationInfo.longitude,
        page: 1,
        type
      },
      showLoading: false
    }
    app.ajax(requestParams).then(res => {
      this.setData({
        pageInfo: res.data.pageInfo,
        welfareList: res.data.list
      })
      wx.stopPullDownRefresh()
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    if(!this.data.pageInfo.hasMore) return;
    var locationInfo = this.data.locationInfo
    var type = this.data.type
    var requestParams = {
      apiUrl: "/welfare/vlist",
      requestData: {
        lat: locationInfo.latitude,
        lng: locationInfo.longitude,
        page: this.data.pageInfo.page + 1,
        type
      },
      showLoading: false
    }
    app.ajax(requestParams).then(res => {
      this.setData({
        pageInfo: res.data.pageInfo,
        welfareList: res.data.list
      })
    })
  }


})