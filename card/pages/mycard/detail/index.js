// pages/card/detail/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showPage: false,
    type:null,// 判断是否是通过分享进入
    id: null,
    isCollected: false,
    isLike: false,
    collectedNum: 0,
    viewNum: 0,
    likeNum: 0,
    cardInfo: {}
  },


  phoneCall:function(){
    const phone = this.data.cardInfo.phone
    wx.makePhoneCall({
      phoneNumber: phone 
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let updateData = {
      id: options.id
    }
    if (options.type) {
      type: options.type
    }
    this.setData({ ...updateData
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
      apiUrl: "/Mycard/detail",
      requestData: {
        id: this.data.id
      }
    }
    app.ajax(requestParams).then(res => {
      this.setData({
        showPage: true,
        isCollected: res.data.isCollected,
        isLike: res.data.isLike,
        collectedTotal: res.data.collectedTotal,
        likeTotal: res.data.likeTotal,
        cardInfo: res.data.cardInfo
      })
    })
  }


})