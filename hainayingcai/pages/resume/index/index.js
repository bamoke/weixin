// pages/resume/index/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showPage: false,
    typeList: ["请选择", "在线简历", "附件简历"],
    curType: 1,
    resumeId: null,
    resumeAttachment: ''
  },

  /**
   * Action
   */
  createResume: function() {
    wx.redirectTo({
      url: '../base/index?type=create'
    })
  },
  bindTypeChange: function(e) {
    const index = parseInt(e.detail.value)
    var requestParams;
    if (index === 0) return;
    if (index == 2 && this.data.resumeAttachment == '') {
      wx.showToast({
        title: '附件简历未上传',
        image: '/static/images/icon-error.png'
      })
      return
    }

    requestParams = {
      apiUrl: "/Resume/save/type/base",
      requestData: { default_set:index},
      requestMethod:"post"
    }
    app.ajax(requestParams).then(res => {

      this.setData({
        curType: parseInt(e.detail.value)
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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
      apiUrl: '/Resume/index',
      isShowLoad: false
    }
    var res = app.ajax(requestParams)
    res.then(res => {
      if (res.data.info === null) {
        this.setData({
          showPage: true
        })
        return
      }
      var updateData = {
        showPage: true,
        resumeId: res.data.info.id,
        completion: res.data.info.completion,
        curType: parseInt(res.data.info.default_set)
      }

      if (res.data.info.attachment !== '') {
        updateData.resumeAttachment = res.data.info.attachment
      }
      this.setData({ ...updateData
      })
    })
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

  }
})