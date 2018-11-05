// pages/class/member/index.js
import util from "../../../utils/util"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    typeArr:["","成员","组长","副班长","班长"],
    courseId:null,
    showPage:false,
    hasMore:false,
    curPage:1,
    list:[],
    keywords:'',
    onLoading:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const courseId = options.courseid
    const params = {
      apiUrl: "/Myclass/member",
      requestData: { courseid: courseId},
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
      console.log(this.data)
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
      courseid: this.data.courseId
    }
    if (this.data.keywords) {
      postData.keywords = this.data.keywords
    }
    const params = {
      apiUrl: "/Myclass/member",
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
    if(!this.data.onLoading) return
    let postData = {
      p: this.data.curPage + 1,
      courseid: this.data.courseId
    }
    if (this.data.keywords){
      postData.keywords = this.data.keywords
    }
    this.setData({onLoading:true})
    const requestParams = {
      apiUrl: "/Myclass/member",
      requestMethod: "GET",
      requestData: postData
    }
    const ajaxRequest = util.request(requestParams)
    ajaxRequest.then(res => {
      this.setData({
        hasMore: res.data.hasMore,
        list: this.data.list.concat(res.data.list),
        curPage: res.data.page,
        onLoading:false
      })
    })
  }

})