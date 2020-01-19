// pages/contact/index/index.js
const App = getApp()
Page({
  

  /**
   * 页面的初始数据
   */
  data: {
    showPage:false,
    list:[],
    showActionsheet: false,
    actionsGroups:[]
  },

  handleNavigate(e) {
    let lng = 113.513786
    let lat = 22.233766
    // 坐标转换
    let x_pi = (3.14159265358979324 * 3000.0) / 180.0;
    let x = lng - 0.0065;
    let y = lat - 0.006;
    let z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * x_pi);
    let theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * x_pi);
    let lngs = z * Math.cos(theta);
    let lats = z * Math.sin(theta);

    // console.log(lats, lngs)
    // return

    wx.openLocation({
      latitude: lats,
      longitude: lngs,
      address: "珠海市南湾北路32号.V12文化产业园.五栋B座",
      name: "珠海蓝思企业管理顾问有限公司"
    })
  },

  handleCallPhone(e){
    var index = e.currentTarget.dataset.index
    var curItem = this.data.list[index]
    this.setData({
      showActionsheet:true,
      actionsGroups:[
        {
          text: `电话：${curItem.tel}`,
          value: curItem.tel
        },
        {
          text: `手机：${curItem.phone}`,
          value: curItem.phone
        }
      ]
    })
    
  },
  handleDoCall(e){
    console.log(e)
    var tel = e.detail.value
    this.setData({
      showActionsheet:false
    })
    wx.makePhoneCall({
      phoneNumber: tel,
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
    App.ajax({
      apiUrl: '/Contact/index',
    }).then(res => {
      this.setData({
        showPage: true,
        list: res.data.list
      })
    })
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