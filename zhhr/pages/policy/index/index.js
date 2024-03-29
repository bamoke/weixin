// pages/policy/index/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showPage:false,
    curTab:"jinwan",
    list:[]
  },

  switchTab(e){
    const name = e.currentTarget.dataset.name
    this.setData({
      curTab:name
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    var requestParams = {
      apiUrl: "/Policy/getcate"
    }
    app.ajax(requestParams).then(res => {
      this.setData({
        list: res.data.list,
        showPage:true
      })
    })
  }

})