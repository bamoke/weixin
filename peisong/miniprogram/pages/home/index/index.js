// pages/home/index/index.js
const App =getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    curType:'',
    userInfo:{},
    orderList:[],
    pageInfo:{}
  },
  handleUnbind(){
    wx.showModal({
      title: '解除绑定',
      content: '确认解除用户账号绑定？',
      success (res) {
        if (res.confirm) {
          App.ajax({
            apiUrl: '/Unbind/index',
            requestMethod: "get"
          }).then(res => {
            wx.switchTab({
              url: '/pages/index/index',
            })
          }, reject => {
      
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  /**
   * 
   * @param {*} e 
   */
  handleGetUserInfo(e){
    var userInfo = this.data.userInfo
    if(e.detail.userInfo) {
      userInfo.avatar = e.detail.userInfo.avatarUrl
      this.setData({
        userInfo
      })
    }
  },
  /**
   * 
   * @param {*} options 
   */
  switchTab:function(e){
    var type= e.target.dataset.type
    App.ajax({
      apiUrl: '/Orders/vlist',
      requestData:{status:type},
      requestMethod: "get"
    }).then(res => {
      this.setData({
        pageInfo: res.data.pageInfo,
        orderList: res.data.orderList,
        curType:type
      })
    }, reject => {

    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function (options) {
    App.ajax({
      apiUrl: '/Home/index',
      requestMethod: "get"
    }).then(res => {
      this.setData({
        pageInfo: res.data.pageInfo,
        orderList: res.data.orderList,
        userInfo:res.data.userInfo
      })
    }, reject => {

    })
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
    var type= this.data.curType,pageInfo = this.data.pageInfo,oldList= this.data.orderList

    if(parseInt(pageInfo.total) < (parseInt(pageInfo.pageSize) * parseInt(pageInfo.page))) {
      return false
    }
    App.ajax({
      apiUrl: '/Orders/vlist',
      requestData:{status:type,page:parseInt(pageInfo.page) + 1},
      requestMethod: "get"
    }).then(res => {
      this.setData({
        pageInfo: res.data.pageInfo,
        orderList: oldList.concat(res.data.orderList)
      })
    }, reject => {

    })
  }


})