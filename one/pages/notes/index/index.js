// pages/notes/index/index.js
import util from "../../../utils/util"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showPage:true,
    classId:null,
    curPage:1,
    hasMore:false,
    list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const classId = options.classid
    const params = {
      apiUrl: "/Notes/index",
      requestData: { class_id: classId },
      requestMethod: "GET"
    }
    const ajaxRequest = util.request(params)
    ajaxRequest.then(res => {
      this.setData({
        classId,
        showPage: true,
        list: res.data.list,
        hasMore: res.data.hasMore
      })
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

  },


  /**
     * 页面上拉触底事件的处理函数
     */
  onReachBottom: function () {
    if (!this.data.hasMore) return;
    let postData = {
      p: this.data.curPage + 1,
      class_id: this.data.classId
    }
    const requestParams = {
      apiUrl: "/Notes/index",
      requestMethod: "GET",
      requestData: postData
    }
    const ajaxRequest = util.request(requestParams)
    ajaxRequest.then(res => {
      this.setData({
        hasMore: res.data.hasMore,
        list: this.data.list.concat(res.data.list),
        curPage: res.data.page
      })
    })
  }


})