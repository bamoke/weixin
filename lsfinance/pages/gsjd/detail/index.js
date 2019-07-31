// pages/gsjd/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showPage: true,
    curId: null,
    contractInfo: {},
    progressInfo: []
  },
  callPhone(e){
    const phone = e.currentTarget.dataset.phone
    wx.makePhoneCall({
      phoneNumber: phone
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const curId = options.id
    this.setData({
      curId
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
      apiUrl: "/Gsjd/detail",
      requestData: {
        objectid: this.data.curId
      }
    }
 
    app.ajax(requestParams).then((res) => {
      this.setData({
        showPage: true,
        contractInfo: res.base,
        progressInfo: res.progress
      })

    })
  },


})