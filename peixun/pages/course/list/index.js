// pages/course/list/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showPage: false,
    list: [],
    curNavIndex: 0,
    pageInfo: {
      page:1,
      total:0
    }
  },
  changeCate: function(e) {
    const index = e.detail.index

    const seletedItem = this.data.cateList[index]

    const requestParams = {
      apiUrl: '/Course/vlist',
      requestData: {
        cid: seletedItem.id
      }
    }
    this.setData({ curNavIndex:index})
    app.ajax(requestParams).then(res => {
      this.setData({
        list: res.data.list,
        pageInfo: res.data.pageInfo
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const requestParams = {
      apiUrl: '/Course/vlist'
    }
    app.ajax(requestParams).then(res => {
      var cl = res.data.cateList
      cl.unshift({name:"全部",id:0})
      this.setData({
        showPage: true,
        cateList: cl,
        list: res.data.list,
        pageInfo: res.data.pageInfo,
      })
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

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    const curCate = this.data.cateList[this.data.curNavIndex]
    console.log(curCate)
    const requestParams = {
      apiUrl: '/Course/vlist',
      isShowLoad:false,
      requestData:{cid:curCate.id}
    }
    app.ajax(requestParams).then(res => {
      wx.stopPullDownRefresh()
      this.setData({
        list: res.data.list,
        pageInfo: res.data.pageInfo,
      })
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  }


})