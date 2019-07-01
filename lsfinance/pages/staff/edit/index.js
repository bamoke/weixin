// pages/home/staff/edit/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showPage:false,
    id:null,
    info:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(!options.id) {
      app.errorBack({tips:'参数错误'})
      return false
    }
    this.setData({
      id:parseInt(options.id)
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
    const curComInfo = wx.getStorageSync("curComInfo")
    var requestParams = {
      apiUrl:"/Team/detail",
      requestData:{id:this.data.id,comid:curComInfo.comId}
    }
    app.ajax(requestParams).then(res=>{
      this.setData({
        showPage:true,
        info:res.info
      })
    })
  }


})