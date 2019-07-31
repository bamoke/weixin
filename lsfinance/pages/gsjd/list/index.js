// pages/gsjd/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showPage:true,
    page:1,
    hasMore:false,
    list:[]
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
    const requestParams = {
      apiUrl:"/Gsjd/vlist"
    }
    app.ajax(requestParams).then((res) => {
      this.setData({
        showPage: true,
        hasMore: res.hasMore,
        list: res.list,
        page:res.page
      })

    })
  },

 
})