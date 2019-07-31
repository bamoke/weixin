// pages/home/mycompany/list/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    comList: []
  },
  /**
   * 
   */
  radioChange(e) {
    var newComId = e.detail.value
    this.setData({
      newComId
    })
  },
  handleChangeCom() {
    const requestParams = {
      apiUrl: "/Mycom/change_cur_com",
      requestData: {
        newcomid: this.data.newComId
      }
    }
    app.ajax(requestParams).then(res => {
      wx.clearStorageSync();
      wx.showModal({
        content: '操作成功,请重新登录',
        showCancel: false,
        success: function(result) {
          if (result.confirm) {
            wx.redirectTo({
              url: '/pages/mplogin/index',
            })
          }
        }
      })

    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const requestParams = {
      apiUrl: "/Mycom/vlist"
    }
    app.ajax(requestParams).then(res => {
      this.setData({
        comList: res.list
      })
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