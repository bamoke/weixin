// pages/service/yfyc/index.js
import util from '../../../utils/util';
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    amountTotal: '0.00',
    curPrepayIndex:null,
    prepayInfo:[]
  },


  confirmPrepay: function(e) {
    if(this.data.curPrepayIndex === null) return;
    const curItem = this.data.prepayInfo[this.data.curPrepayIndex]
    let formData = {
      title:curItem.title,
      comid:curItem.comid,
      amount:curItem.amount,
      ratio:curItem.ratio,
      old_amount:curItem.old_amount
    }
    const curComInfo = wx.getStorageSync("curComInfo");

    formData.comid = curComInfo.comId
    const requestParams = {
      apiUrl: "/Orders/dorecharge",
      requestData: formData,
      requestMethod: "POST"
    }
    util.request(requestParams).then((data) => {
      wx.requestPayment({
        timeStamp: data.timeStamp,
        nonceStr: data.nonceStr,
        package: data.package,
        signType: 'MD5',
        paySign: data.sign,
        success: function(res) {
          wx.showToast({
            title: '操作成功,结果或有延时',
            icon: "success"
          })
          setTimeout(function(){
            wx.navigateTo({
              url: '/pages/prepay/log/index',
            })
          },1000)

          
        },
        fail: function(res) {

        }
      })
    }).catch(function(msg) {
      console.log(msg)
    })

  },

  selectPrepayItem: function(e) {
    const curIndex = e.currentTarget.dataset.index
    const prepayInfo = this.data.prepayInfo
    prepayInfo.forEach((item, index) => {
      if (index == curIndex) {
        item.selected = true
      } else {
        item.selected = false
      }
    })
    this.setData({prepayInfo,curPrepayIndex:curIndex})
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var curComInfo = wx.getStorageSync("curComInfo");
    const requestParams = {
      apiUrl: "/Prepay/index",
      requestData: {
        comid: curComInfo.comId
      }
    }
    util.request(requestParams).then((data) => {
      this.setData({
        showPage: true,
        prepayInfo: data.info
      })
    }).catch(function(msg) {
      console.log(msg)
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  }


})