// pages/mycard/bind/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone:""
  },
  setPhone:function(e){
    this.setData({
      phone:e.detail.value
    })
  },
  checkPhone(e){
    const phone = this.data.phone
    const phoneRegexp = /^[1][35678][0-9]{9}$/
    if (phone == '') {
      this._showError('请填写手机号')
      return false
    }
    if (!phoneRegexp.test(phone)) {
      this._showError('手机号格式不正确')
      return false
    }
    const requestParams = {
      apiUrl:"/Mycard/bind",
      requestData: {phone}
    }
    const request = app.ajax(requestParams)
    request.then(res => {
      wx.showToast({
        title: '操作成功',
        icon: "success"
      })
      setTimeout(function () {
        wx.reLaunch({
          url: '/pages/index/index'
        })
      }, 500)
    })
  },
  _showError: function (msg) {
    wx.showToast({
      title: msg,
      image: "/static/images/icon-error.png"
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})