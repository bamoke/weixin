// pages/home/index/index.js
import util from '../../utils/util';
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageShow: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var serverId;
    if (typeof options.serverid !== 'undefined'){
      wx.setStorageSync('serverid', options.serverid);
      serverId = options.serverid
    }else {
      serverId = wx.getStorageSync("serverid");
    }
    const apiUrl = '/Index/index';
    util.request(apiUrl).then(data=> {
        this.setData({
          pageShow:true
        })
      }).catch(data=> {
        var callBack,content;
        if(data.Code == '10002' || data.Code == '10001'){
          content = '点击确认登陆';
          callBack = function () {
            app.login();
          }
          
        }else if(data.Code == '10003'){
          content = '前去绑定我的账号';
          callBack = function(){
            wx.navigateTo({
              url: '/pages/bind/index',
            })
          }
        }
        wx.showModal({
          title: data.Msg,
          content: content,
          showCancel:false,
          success: function (res) {
            if (res.confirm) {
              callBack();
            }
          }
        })

      })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // console.log("ready")
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // console.log("show")
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