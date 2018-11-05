// pages/notes/index/index.js
import util from "../../../utils/util"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showPage:true,
    courseId:null,
    curPage:1,
    hasMore:false,
    list:[],
    newNotes:''//当前填写的
  },
  /**
   * methods
   */
  setValue:function(e){
    this.setData({
      newNotes:e.detail.value
    })
  },
  addNote:function(){
    if (this.data.newNotes == '') {
      wx.showToast({
        title: '内容不能为空',
        image:'/static/images/icon-error.png'
      })
      return
    }
    const courseId = this.data.courseId
    const params = {
      apiUrl: "/Myclass/addnote",
      requestData: { courseid: courseId, content: this.data.newNotes },
      requestMethod: "POST"
    }
    const ajaxRequest = util.request(params)
    ajaxRequest.then(res => {
      let newList = this.data.list
      newList.push(res.data.info)
      this.setData({
        newNotes:"",
        list: newList
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const courseId = options.courseid
    const params = {
      apiUrl: "/Myclass/notes",
      requestData: { courseid: courseId },
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
     * 页面上拉触底事件的处理函数
     */
  onReachBottom: function () {
    if (!this.data.hasMore) return;
    let postData = {
      p: this.data.curPage + 1,
      courseid: this.data.courseId
    }
    const requestParams = {
      apiUrl: "/Myclass/notes",
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