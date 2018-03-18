// pages/gift/index.js
import { siteConf } from '../../static/js/common';
//获取应用实例
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showPage: false,
    id:null,
    price: "",
    type: ""
  },

  /**
   * 收下礼包操作
   */
  acceptGift:function(){
    var apiUrl = '/Gift/acceptance';
    var requestData = { id: this.data.id }
    var myPromise = app._getApiData(apiUrl, requestData);
    myPromise.then(data=>{
      wx.hideLoading();
      wx.showModal({
        title: '领取成功',
        content: '恭喜您成功领取好友送你的礼包，点击确定立即体验礼品内容',
        showCancel:false,
        success: function (res) {
          if (res.confirm) {
            wx.redirectTo({
              url: data.info.url,
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    },reject=>{
      wx.hideLoading();
      wx.showModal({
        title: '领取失败',
        content: reject,
        showCancel: false,
        confirmText:"返回首页",
        success: function (res) {
          if (res.confirm) {
            wx.reLaunch({
              url: '/pages/index/index'
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var apiUrl = '/Gift/index';
    var requestData = { key: options.key }
    var myPromise = app._fetchApiData(apiUrl, requestData);
    myPromise.then(data=>{
      wx.hideLoading();
      this.setData({
        showPage:true,
        id:data.info.id,
        price:data.info.value,
        type:data.info.pro_type == 1?"专栏":"课程"
      })
    },reject=>{
    console.log(reject)
    })
   
  },
  onReady:function(){

    
  }
})