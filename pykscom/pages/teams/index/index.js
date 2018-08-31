// pages/teams/index/index.js
const users = [
  {
    id: 1,
    avatar: '',
    realname: '刘琦',
    position: '总经理',
    sex: 1
  },
  {
    id: 2,
    avatar: '',
    realname: '文娟',
    position: '办公室主任',
    sex: 1
  },
  {
    id: 1,
    avatar: '',
    realname: '胡晓辉',
    position: '文员',
    sex: 0
  }
]
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showPage:true,
    userList: [],
    avatarDefault: 'http://www.xinzhinetwork.com/Upload/avatar/default.png'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("s")
    this.setData({
      userList: [
        {
          id: 1,
          avatar: '',
          nickname: '欧文看*73计算',
          position: '文员',
          sex: 1
        },
        {
          id: 2,
          avatar: '',
          nickname: '文娟',
          position: '办公室主任',
          sex: 1
        },
        {
          id: 1,
          avatar: '',
          nickname: '胡晓辉',
          position: '总经理',
          sex: 0
        }
      ]
    })
  },

/**
 * add member
 */
  addMember:function(){
    wx.navigateTo({
      url: '../add/index',
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