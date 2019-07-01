// pages/draft/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type:null,
    toUrl:"",
    showPage:false,
    pageInfo:{},
    list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (!options.type) {
      app.errorBack("访问参数错误")
    }
    this.setData({
      type:options.type
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
    const type = this.data.type;
    const toUrl = this.data.type == 1 ? "/pages/fybx/new/index?" : "/pages/fyzc/new/index?"
    const apiUrl = "/StaffDraft/vlist"
    const requestParams = {
      apiUrl,
      requestData: {
        type
      }
    }
    app.ajax(requestParams).then((res) => {
      this.setData({
        type,
        toUrl,
        showPage: true,
        pageInfo:res.pageInfo,
        list: res.list
      })

    })
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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var oldList = this.data.list
    const type = this.data.type;
    const apiUrl = "/StaffDraft/vlist"
    const requestParams = {
      apiUrl,
      requestData: {
        type,
        page: parseInt(this.data.pageInfo.page) + 1
      }
    }
    app.ajax(requestParams).then((res) => {
      this.setData({
        pageInfo: res.pageInfo,
        list: oldList.concat(res.list)
      })

    })
  }
})