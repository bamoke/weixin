// pages/survey/index/index.js
import util from "../../../utils/util"
Page({

  /**
   * 页面的初始数据
   */
  data: {
  showPage:false,
  courseId:null,
  curPage:1, 
  hasMore:false,
  list:[],
  keywords:''
  },
  setkeywords:function(e){
    this.setData({
      keywords:e.detail.value
    })
  },
  gosearch(event){
    var keywords = this.data.keywords;
    const requestParams = {
      apiUrl: "/Survey/index",
      requestMethod: "GET",
      requestData:{}
    }
    if (keywords.trim()) {
      requestParams.requestData.keywords = keywords
    }
    const ajaxRequest = util.request(requestParams)
    ajaxRequest.then(res => {
      this.setData({
        hasMore: res.data.hasMore,
        list: res.data.list,
        keywords: keywords,
        curPage: 1
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const courseId = options.courseid || null
    let requestData = {}
    if(courseId) {
      requestData.courseid = courseId
    }
    const params = {
      apiUrl: "/Survey/index",
      requestData,
      requestMethod: "GET"
    }
    const ajaxRequest = util.request(params)
    ajaxRequest.then(res => {
      this.setData({
        courseId,
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
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  }

})