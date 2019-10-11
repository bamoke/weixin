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
  handleNavigate(e){
    const index = e.currentTarget.dataset.index
    let curItem = this.data.welfareList[index]
    wx.openLocation({
      latitude: parseFloat(curItem.latitude),
      longitude: parseFloat(curItem.longitude),
      address:curItem.addr,
      name: curItem.title
    })
  },
  handleCall(e){
    const phone = e.currentTarget.dataset.phone
    wx.makePhoneCall({
      phoneNumber: phone,
    })
  },
  handleClick(e){
    const index = e.currentTarget.dataset.index
    let newList = this.data.welfareList
    newList[index].show = typeof newList[index].show == 'undefined' ? true : !newList[index].show
    this.setData({
      welfareList:newList
    })
  },
  handleChangeType(e) {
    var type = e.target.dataset.type
    if (typeof e.target.dataset.type === 'undefined') return false;
    var locationInfo = this.data.locationInfo
    var requestParams = {
      apiUrl: "/welfare/vlist",
      requestData: {
        lat: locationInfo.latitude || '',
        lng: locationInfo.longitude || '',
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

  _fetchData() {
    var _that = this;
    var myAmapFun = new amapFile.AMapWX({
      key: '8d2304d0927601db4c4d5020bcd1f625'
    });
    var locationInfo;
    myAmapFun.getRegeo({
      success: mapdata => {
        //成功回调
        const result = mapdata[0];
        const addressInfo = result.regeocodeData.addressComponent
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
        let requestParams = {
          apiUrl: "/welfare/vlist",
          requestData: {
            page: 1,
            type: 1,
            lat: locationInfo.latitude,
            lng: locationInfo.longitude
          }
        }
        app.ajax(requestParams).then(res => {
          // console.log(res)
          _that.setData({
            pageInfo: res.data.pageInfo,
            welfareList: res.data.list
          })
        })
      },
      fail: function(info) {
        //失败回调

        wx.showToast({
          title: '位置信息获取失败',
          icon:"none"
        })
        let requestParams = {
          apiUrl: "/welfare/vlist",
          requestData: {
            page: 1,
            type: 1
          }
        }
        app.ajax(requestParams).then(res => {
          _that.setData({
            pageInfo: res.data.pageInfo,
            welfareList: res.data.list
          })
        })
      }
    })

  },
  onLoad: function() {

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function() {
    const _that =this
    wx.getSetting({
      success(res) {
        
        if (res.authSetting['scope.userLocation'] != undefined && res.authSetting['scope.userLocation'] != true) {
          wx.showModal({
            title: '是否授权当前位置',
            content: '需要获取您的地理位置，请确认授权，否则地图功能将无法使用',
            success: function (result) {
              if (result.confirm) {
                wx.openSetting({
                  success: function (data) {
                    if (data.authSetting['scope.userLocation']) {
                      _that._fetchData()
                    }
                  }
                })
              }
            }
          })
        }
      }
    })

    this._fetchData()



  },
  onReady:function(){
    // console.log("ready")
    const _that = this

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
        lat: locationInfo.latitude || '',
        lng: locationInfo.longitude || '',
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
    if (!this.data.pageInfo.hasMore) return;
    var locationInfo = this.data.locationInfo
    var type = this.data.type
    var requestParams = {
      apiUrl: "/welfare/vlist",
      requestData: {
        lat: locationInfo.latitude || '',
        lng: locationInfo.longitude || '',
        page: this.data.pageInfo.page + 1,
        type
      },
      showLoading: false
    }
    app.ajax(requestParams).then(res => {
      this.setData({
        pageInfo: res.data.pageInfo,
        welfareList: this.data.welfareList.concat(res.data.list)
      })
    })
  }


})