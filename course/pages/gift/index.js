// pages/gift/index.js
import {
  siteConf
} from '../../static/js/common';
import util from "../../utils/util"
//获取应用实例
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showPage: false,
    sourceUrl: siteConf.sourceUrl + "thumb/",
    id: null,
    proType: null,
    content: {}
  },

  /**
   * 收下礼包操作
   */
  acceptGift: function() {
    var _that = this;
    
    const requestParams = {
      apiUrl: "/Gift/acceptance",
      requestData: {
        id: this.data.id
      }
    }
    var myPromise = util.request(requestParams);
    var jumpUrl = this.data.proType == 1 ? "/pages/column/column-detail/index" : "/pages/course/detail/index";
    myPromise.then(data => {
      wx.hideLoading();
      wx.showModal({
        title: '领取成功',
        content: '恭喜您成功领取好友送你的礼包，点击确定立即体验礼品内容',
        showCancel: false,
        success: function(res) {
          if (res.confirm) {
            wx.redirectTo({
              url: jumpUrl + "?id=" + _that.data.content.proid,
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }, reject => {
      wx.hideLoading();
      console.log(reject)
      wx.showModal({
        title: '领取失败',
        content: reject,
        showCancel: false,
        confirmText: "返回首页",
        success: function(res) {
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
  onLoad: function(options) {
    const requestParams = {
      apiUrl: "/Gift/index",
      requestData: {
        key: options.key
      }
    }

    var myPromise = util.request(requestParams);
    myPromise.then(data => {
      this.setData({
        showPage: true,
        id: data.info.id,
        proType: data.info.proType,
        content: data.info.content
      })
    }, reject => {
      console.log(reject)
    })

  },
  onReady: function() {


  }
})