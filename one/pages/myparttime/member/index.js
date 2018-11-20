// pages/class/member/index.js
import util from "../../../utils/util"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    typeArr:["","成员","管理员"],
    parttimeId:null,
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
    const parttimeId = options.parttimeid
    const params = {
      apiUrl: "/ParttimeMy/member",
      requestData: { parttimeid: parttimeId},
      requestMethod: "GET"
    }
    const ajaxRequest = util.request(params)
    ajaxRequest.then(res => {
      this.setData({
        parttimeId,
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
      parttimeid: this.data.parttimeId
    }
    if (this.data.keywords) {
      postData.keywords = this.data.keywords
    }
    const params = {
      apiUrl: "/ParttimeMy/member",
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
      parttimeid: this.data.parttimeId
    }
    if (this.data.keywords){
      postData.keywords = this.data.keywords
    }
    this.setData({onLoading:true})
    const requestParams = {
      apiUrl: "/ParttimeMy/member",
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