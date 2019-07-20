// pages/handover/shebao/index.js
const app = getApp();
const curDate = new Date();
const year = curDate.getFullYear();
var month = curDate.getMonth() + 1;
month = month < 10 ? "0" + month : month
var curMonth = [year, month].join("-")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showPage: false,
    curComInfo: null,
    base: {},
    list: [],
    noData:false,
    toMonth: curMonth,
    curMonth: curMonth
  },

  handleMonthChange(e) {
    var newMonth = e.detail.value
    const requestParams = {
      apiUrl: "/Handover/shenbao",
      requestData: {
        comid: this.data.curComInfo.comId,
        type: "sf",
        month: newMonth
      }
    }
    app.ajax(requestParams).then(res => {
      this.setData({
        base: res.base,
        list: res.list,
        noData: false,
        showPage: true,
        curMonth: newMonth
      })
    }, reject => {
      if (reject.code == 13009) {
        this.setData({
          showPage: true,
          noData: true
        })
      }
    })
  },

  handleSubmit() {
    let base = this.data.base;
    const requestParams = {
      apiUrl: "/Handover/shenbao_save/comid/" + this.data.curComInfo.comId,
      requestData: {
        type: "sf",
        base: JSON.stringify(this.data.base)
      },
      requestMethod: "POST"
    }
    app.ajax(requestParams).then(res => {
      wx.showToast({
        title: '操作成功',
        icon: "success"
      })

      setTimeout(function() {
        wx.navigateBack({
          detal: 1
        })
      }, 500)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const curComInfo = wx.getStorageSync("curComInfo")
    this.setData({
      curComInfo
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
    console.log(this.data)
    const requestParams = {
      apiUrl: "/Handover/shenbao",
      requestData: {
        comid: this.data.curComInfo.comId,
        type: "sf",
        month:this.data.curMonth
      }
    }
    app.ajax(requestParams).then(res => {
      this.setData({
        base: res.base,
        list: res.list,
        noData:false,
        showPage:true
      })
    },reject=>{
      if (reject.code == 13009) {
        this.setData({
          showPage: true,
          noData: true
        })
      }
    })
  }
})