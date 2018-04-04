// pages/column/column-detail/index.js
//获取应用实例
var app = getApp()

//加载公用
import { siteConf } from '../../../static/js/common';
var WxParse = require('../../../wxParse/wxParse.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    showPage: false,
    sourceUrl: siteConf.sourceUrl,
    isOpened: false,
    giftKey:null,
    authStatus:0,//课程状态，0:未开通,1:已开通;2:已到期
    columnInfo: {},
    teacherInfo: {},
    articleList: []
  },

  /**
   * 开通专栏操作
   */
  buyColumnist: function (data) {
    var proid = data.target.dataset.id;
    var apiUrl = '/Orders/create';
    var requestData = {type:1,proid:proid}
    var promise = app._getApiData(apiUrl,requestData);

    promise.then((data) => {
      if (typeof data.info === 'undefined') {
        wx.redirectTo({
          url: '/pages/home/mycolumn/index',
        })
        return;
      }

      wx.requestPayment({
        timeStamp: data.info.timeStamp,
        nonceStr: data.info.nonceStr,
        package: data.info.package,
        signType: 'MD5',
        paySign: data.info.sign,
        success: function (res) {
          wx.redirectTo({
            url: '/pages/home/mycolumn/index',
          })
        },
        fail: function (res) {
          wx.hideLoading();
        }
      })
    }, (rej) => {
      console.log(rej)
    })

  },

/**
 * 免费订阅专栏
 */
  subscriber: function (data){
    var _that = this;
    var proid = data.target.dataset.id;
    var apiUrl = '/Columnist/subscriber';
    var requestData = {proid: proid }
    var promise = app._getApiData(apiUrl, requestData);
    promise.then(function(data){
      _this.setData({
        authStatus:1
      })

    },function(err){
      console.log(err)
    })
  },

  /**
   * 阅读文章
   */
  viewArticle:function(data){
    var url=data.currentTarget.dataset.url;
    if (this.data.authStatus == 1){
      wx.navigateTo({
        url: url,
      })
    }else {
      wx.showModal({
        title: '未订阅',
        content: '您还未订阅此专栏，请订阅后再浏览',
        showCancel:false
      })
    }

  },

  /**
   * 送好友
   */
  sendGift: function () {
    this.buyconfirm.show();
  },

  /**
   * giftBuyConfirm
   */
  giftBuyConfirm: function () {
    var _that = this;
    var apiUrl = '/Orders/buypresent';
    var columnId = this.data.columnInfo.id;
    var proType = 1;
    var requestData = { proid: columnId, protype: proType, type: 5 }
    var myPromise = app._getApiData(apiUrl, requestData, "POST");
    myPromise.then(data => {
      _that.buyconfirm.hide();
      _that.setData({
        giftKey: data.key
      })
      if (typeof data.payMent !== 'undefined') {
        wx.requestPayment({
          timeStamp: data.payMent.timeStamp,
          nonceStr: data.payMent.nonceStr,
          package: data.payMent.package,
          signType: 'MD5',
          paySign: data.payMent.sign,
          success: function (res) {
            _that.sharemodal.show()
          },
          fail: function (res) {

          }
        })
      } else {
        _that.sharemodal.show();
      }
    }, reject => {
      wx.showModal({
        title: '操作错误',
        content: reject,
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id;
    //获取数据   
    var myPromise = app._getApiData('/Columnist/detail/id/' + id)
    var _that = this;
    myPromise.then(function (data) {
      wx.hideLoading()
      //标签转换
      if (data.columnist.content) {
        WxParse.wxParse('wxparse_content', 'html', data.columnist.content, _that)
      }
      _that.setData({
        showPage: true,
        columnInfo: data.columnist,
        articleList: data.articleList,
        teacherInfo: data.teacherInfo,
        authStatus: data.hasColumnistStatus
      })
    }, function (err) {
      console.log(err)
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.buyconfirm = this.selectComponent("#buyconfirm")
    this.sharemodal = this.selectComponent("#shareModal")
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
  onShareAppMessage: function (res) {
    var _that = this;
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '送你一个课程礼品包',
      path: '/pages/gift/index?key=' + this.data.giftKey,
      imageUrl: siteConf.sourceUrl + "thumb/" + this.data.columnInfo.thumb,
      success: function (res) {
        // 转发成功
        _that.sharemodal.hide()
      },
      fail: function (res) {
        // 转发失败
        console.log("ss")
      }
    }
  }
})