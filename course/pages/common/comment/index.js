// pages/common/comment/index.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showPage: true,
    proId: null,
    commentType: null,
    title: "ss"
  },

  /**
   * 提交评论
   */
  formSubmit: function (data) {
    var requestData = {
      pro_title: this.data.title,
      pro_id: this.data.proId,
      type: this.data.commentType
    }
    var apiUrl = '/Comment/index';
    var myPromise;
    if (data.detail.value.content == '') {
      wx.showToast({
        title: '请输入评论内容',
        image: '/static/images/warning.png'        
      })
      return;
    }
    requestData.content = data.detail.value.content;
    myPromise = app._getApiData(apiUrl, requestData,"POST");
    myPromise.then(function(){
      wx.hideLoading();
      wx.showModal({
        title:'提交成功',
        content:'评论将在通过审核后显示，感谢您的参与！',
        showCancel: false,
        success:function(){
        wx.navigateBack({
          delta:1
        })
        }
      })
    },function(reject){
      wx.hideLoading();
      wx.showToast({
        title: reject,
        image: '/static/images/warning.png'
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      title:options.title,
      proId:options.proid,
      commentType:options.type

    })
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