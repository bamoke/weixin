// pages/gsjd/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showPage:true,
    curComInfo:{},
    page:1,
    hasMore:false,
    list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let curComInfo = wx.getStorageSync("curComInfo")
    this.setData({curComInfo})
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
    const comInfo = this.data.curComInfo;
    const requestParams = {
      apiUrl:"/Gsjd/vlist",
      requestData: {
        comid: comInfo.comId
      }
    }
    app.ajax(requestParams).then((res) => {
      console.log(res)
      this.setData({
        showPage: true,
        hasMore: res.hasMore,
        list: res.list,
        page:res.page
      })

    })
  },

 
})