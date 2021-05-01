// pages/welfare/detail/index.js
const app = getApp()
import * as WxParse from '../../../wxParse/wxParse.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageShow: false,
    detail: {},
    curId: null,
    hideCouponList: true
  },
  handleNavigate(e) {
    let curItem = this.data.detail
    wx.openLocation({
      latitude: parseFloat(curItem.latitude),
      longitude: parseFloat(curItem.longitude),
      address: curItem.addr,
      name: curItem.title
    })
  },
  handleShowCoupon(){
    this.setData({
      hideCouponList:false
    })
  },
  handleCall(e) {
    const phone = e.currentTarget.dataset.phone
    wx.makePhoneCall({
      phoneNumber: phone,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if(typeof options.id == 'undefined') {
      wx.showToast({
        title: '非法请求',
        image: "/static/images/icon-error.png"
      })
      setTimeout(function(){
        wx.navigateBack({
          delta: 1,
        })
      },1000)
      return false
    }
    const curId = options.id
    let requestParams = {
      apiUrl: "/Welfare/detail",
      requestMethod: "GET",
      requestData:{id:curId}
    }
    const ajaxRequest = app.ajax(requestParams)
    ajaxRequest.then(res => {
      if (res.data.info.content) {
        WxParse.wxParse('wxparse_content', 'html', res.data.info.content, this)
      }
      this.setData({
        showPage: true,
        detail: res.data.info,
        curId
      })
    })

   
  },

  

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})