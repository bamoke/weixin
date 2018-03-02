// pages/order/index.js
import {siteConf} from '../../../static/js/common';
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    showPage: false,
    sourceUrl: siteConf.sourceUrl,
    hasMore: false,
    curPage:1,
    orderStatusText: ['','未支付','已支付'],
    orderStatusStyle: ['', 'text-danger', 'text-success', 's-c-secondary', 's-c-import', 's-c-default', 's-c-default', 's-c-default'],
    orders:[]
  },

/**
 * 取消订单
 */
  cancelOrder:function(data){
    var index = data.target.dataset.index;
    var ordersList = this.data.orders;
    var id = ordersList[index].id;

    var _that = this;
    var apiUrl = '/Orders/cancel_order';
    var requestData = {
      id: id
    }
    var myPromise = app._getApiData(apiUrl, requestData)
    myPromise.then(function () {
      wx.hideLoading();
      ordersList.splice(index, 1)
      _that.setData({
        orders: ordersList
      })
    })

  },

  /**
 * 重新支付订单
 */
  rePay: function (data) {
    var index = data.target.dataset.index;
    var ordersList = this.data.orders;
    var id = ordersList[index].id;
    var _that = this;
    var apiUrl = '/Orders/repay';
    var requestData = {
      id: id
    }
    var myPromise = app._getApiData(apiUrl, requestData)

    myPromise.then((backdata) => {
      var info = backdata.info
      var nonceStr = info.nonceStr;
      var pkg = info.package;
      var timeStamp = info.timeStamp;
      var paySign = info.sign;
      wx.requestPayment({
        timeStamp: timeStamp,
        nonceStr: nonceStr,
        package: pkg,
        signType: 'MD5',
        paySign: paySign,
        success: function (res) {
          wx.hideLoading();          
          ordersList[index].status = 2;
          _that.setData({
            orders: ordersList
          })
        },
        fail: function (res) {
          wx.hideLoading();
          wx.showModal({
            title: '提示',
            content: res,
          })
          console.log(res)
        }
      })
    }, (rej) => {
      wx.hideLoading();
        wx.showModal({
          title: '提示',
          content: rej,
        })
    })
  },



  /**
* 删除订单
*/
  delOrder: function (data) {
    var index = data.target.dataset.index;
    var ordersList = this.data.orders;
    var id = ordersList[index].id;
    
    var _that = this;
    var apiUrl = '/Orders/del_order';
    var requestData = {
      id:id
    }
    var myPromise = app._getApiData(apiUrl,requestData)
    myPromise.then(function () {
      wx.hideLoading();
      ordersList.splice(index, 1)
      _that.setData({
        orders: ordersList
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var apiUrl = '/Home/myorders';
    var requestData = {type:0,page:1};
    var _that =this;
    var getApiData = app._getApiData(apiUrl,requestData);
    var newData;
    getApiData.then(data => {
      wx.hideLoading();
      newData = {
        showPage: true,
        orders:data.list
      };
      if (data.total > 15) {
        newData.hasMore = true;
      }
      _that.setData(newData);
    }, reject => {
      console.log(reject)
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
    if(this.data.enRefresh){
      this._loadData();
    }

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if(this.data.hasMore == false) return;
    /***获取数据** */
    var that = this;
    var newPage = parseInt(that.data.curPage) + 1;
    var promise = new Promise((resolve, reject) => {
      wx.request({
        url: siteConf.apiUrl + '/Home/myorder/type/'+that.data.pageType+'/page/' + newPage,
        method: "GET",
        header: {
          'content-type': 'application/x-www-form-urlencoded',
          "session-id": wx.getStorageSync('sessionId')
        },
        success: function (res) {
          // console.log(res);
          if (res.data.errorCode != 10000) {
            reject(res.data.errorMsg)
          } else {
            resolve(res.data.info)
          }
        }
      })
    })

    promise.then(function (list) {
      if(list.length > 0){
        var orderList = that.data.orders;
        var newOrderList = orderList.concat(list);
        var newData = {
          orders: newOrderList,
          curPage: newPage
        };
        if (list.length < 10 ){
          newData.hasMore = false
        }
        wx.hideLoading();
        that.setData(newData);
      }else {
        that.setData({
          hasMore:false
        })
      }
    })

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})