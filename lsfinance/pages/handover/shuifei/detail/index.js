// pages/handover/shebao/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showPage: false,
    curComInfo: null,
    base: {},
    list: [],
    noData:false
  },


  handleSubmit() {
    let base = this.data.base;
    const requestParams = {
      apiUrl: "/Handover/shenbao_save",
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
        type: "sf"
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