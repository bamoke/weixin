// pages/class/member/index.js
import util from "../../../utils/util"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    typeArr:["成员","班长","副班长","组长"],
    classId:null,
    showPage:false,
    hasMore:false,
    curPage:1,
    list:[],
    keywords:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const classId = options.classid
    const params = {
      apiUrl: "/Class/member",
      requestData:{class_id:classId},
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

  setkeywords:function(e){
    const value = e.detail.value
    this.setData({
      keywords:value
    })
  },
  gosearch:function(){
    let postData = {
      class_id: this.data.classId
    }
    if (this.data.keywords) {
      postData.keywords = this.data.keywords
    }
    const params = {
      apiUrl: "/Class/member",
      requestData: postData,
      requestMethod: "GET"
    }
    const ajaxRequest = util.request(params)
    ajaxRequest.then(res => {
      this.setData({
        list: res.data.list,
        hasMore: res.data.hasMore
      })
    })
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
    if (this.data.keywords){
      postData.keywords = this.data.keywords
    }
    const requestParams = {
      apiUrl: "/Class/member",
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