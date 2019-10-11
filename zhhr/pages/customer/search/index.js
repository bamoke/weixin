// pages/customer/search/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isFocus:false,
    result: []
  },

  /**
   * Methods
   */
  search: function (value) {
    if(value == '') return
    var requestParams = {
      apiUrl:"/CustomerService/search_result",
      requestData:{keyword:value}
    }
    return new Promise((resolve,reject)=>{
      app.ajax(requestParams).then(res => {
        resolve(res.data.list)
      })
    })

  },
  selectResult: function (e) {
    const item = e.detail.item
    wx.navigateTo({
      url: `../result/index?id=${item.value}`,
    })
  },
  geFirst(){
    wx.navigateBack({
      delta: 1,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var requestParams
    var updateData = {
      search: this.search.bind(this),
      isFocus: true
    }
    if(typeof options.keyword !== 'undefined') {
      requestParams = {
        apiUrl: "/CustomerService/search_result",
        requestData: { keyword: options.keyword }
      }
      app.ajax(requestParams).then(res => {
        updateData.keyword = options.keyword
        updateData.result = res.data.list
        this.setData({ ...updateData })
      })
    }else {
      this.setData({ ...updateData })

    }


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