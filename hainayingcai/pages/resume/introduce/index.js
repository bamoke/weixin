// pages/resume/introduce/index.js
import util from '../../../utils/util';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isSubmiting: false,
    content: ''
  },

  /**
   * Action
   */
  bindContentChange: function(e) {
    const value = e.detail.value
    this.setData({
      content: value
    })
  },
  // submit
  submitForm: function(e) {
    if (this.data.isSubmiting) return;
    if (this.data.content == '') {
      wx.showToast({
        title: "内容不能为空",
        image: "/static/images/icon-error.png"
      })
      return
    }
    const requestParams = {
      apiUrl: "/Resume/save/type/introduce",
      requestMethod: "POST",
      requestData: {
        introduce: this.data.content
      }
    }
    this.setData({
      isSubmiting: true
    })
    const ajaxRequest = util.request(requestParams)
    ajaxRequest.then(res => {
      wx.showToast({
        title: '保存成功',
      })
      setTimeout(function () {
        wx.navigateBack()
      }, 500)

    }).catch(error=>{
      this.setData({
        isSubmiting:false
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const info = wx.getStorageSync("getResumeData")
    this.setData({
      content: info.introduce
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