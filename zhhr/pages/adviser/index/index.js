// pages/adviser/index/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showPage: false,
    list: ['','',''],
    hasTalent: false
  },

  /**
   * handle
   */
  callAdviser(e) {
    const phone = e.currentTarget.dataset.phone
    if (!this.data.hasTalent) {
      wx.showModal({
        title: "没有人才卡或人才卡已过期",
        content: "现在就去申请金英人才卡？",
        success: function (result) {
          if (result.confirm) {
            wx.redirectTo({
              url: '/pages/talent/index/index',
            })
          }
        }
      })
      return
    }
    if (phone) {
      wx.makePhoneCall({
        phoneNumber: phone,
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },



  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    const requestParams = {
      apiUrl: "/Adviser/index"
    }
    app.ajax(requestParams).then(res => {
      if (!res.data.hasTalent) {
        wx.showModal({
          title: "没有人才卡或人才卡已过期",
          content: "现在就去申请金英人才卡？",
          success: function(result) {
            if (result.confirm) {
              wx.redirectTo({
                url: '/pages/talent/index/index',
              })
            }
          }
        })
      }
      this.setData({
        list: res.data.list,
        hasTalent: res.data.hasTalent
      })
    }, reject => {
      if (reject.code == 13009) {

      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },


})