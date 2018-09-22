// pages/home/collection/index.js
import util from '../../../utils/util'
import {
  eduArr,
  wagesArr
} from '../../../utils/data'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    wagesArr,
    eduArr,
    showPage: true,
    hasMore: false,
    list: [],
    curPage: 1,
    isLoading: false
  },
  /**
   * Action
   */
  _loadMore: function() {
    if (this.data.isLoading || !this.data.hasMore) return
    this.setData({
      isLoading: true
    })
    let requestData = {
      p: parseInt(this.data.curPage) + 1
    }
    const requestParams = {
      apiUrl: "/Collection/vlist",
      requestData,
      requestMethod: "GET"
    }
    const ajaxRequest = util.request(requestParams)
    ajaxRequest.then(res => {
      let newList = this.data.list.concat(res.info.list)
      let updateData = {
        list: newList,
        curPage: res.info.page,
        hasMore: res.info.hasMore
      }
      this.setData({
        isLoading: false,
        ...updateData
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const requestParams = {
      apiUrl: "/Collection/vlist",
      requestMethod: "GET"
    }
    const ajaxRequest = util.request(requestParams)
    ajaxRequest.then(res => {
      this.setData({
        list: res.info.list,
        hasMore: res.info.hasMore,
        curPage: res.info.page
      })
      console.log(this.data)
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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    this._loadMore()
  }
})