// pages/fiscal/subject/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    curTabIndex: 0,
    subjectInfo: [],
    cateList: []
  },

  /**
   * methods
   */

  selectCate:function(e){
    const index= e.currentTarget.dataset.index
    const item = this.data.cateList[index]
    wx.setStorageSync('curSelectedRwdjCate', item)
    wx.navigateBack({
      delta:1
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    let requestParams = {
      apiUrl:"/Voucher/cate"
      
    }
    app.ajax(requestParams).then(res=>{
      this.setData({
        cateList:res.list
      })
      wx.setStorageSync("rwdjCateData", res.list)
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