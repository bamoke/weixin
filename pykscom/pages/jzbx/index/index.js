// pages/work/fybx/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageShow:false,
    curPage:1,
    list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var list = [
      {
        "num":"BX0001",
        "description":"6月伙食费5w44酒啊就开始网站备案域名核验要求通知",
        "status":"未审核",
        "time":"2018-07-01",
        "amount":"20158.47"
      },
      {
        "num": "BX0002",
        "description": "5月伙食费",
        "status": "已审核",
        "time": "2018-06-01",
        "amount": "981.04"
      },
    ]
    this.setData({
      pageShow:true,
      list:list
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