// pages/home/mycompany/list/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    comList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const myCom = wx.getStorageSync("myCom")
    if(myCom.length == 1){
      wx.redirectTo({
        url: '/pages/home/mycompany/detail/index?id='+myCom[0].objectId,
      })
      return
    }
    this.setData({ comList: myCom })
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

  }

  
})