// pages/discuss/content/detail/index.js
const app = getApp()
import util from "../../../../utils/util"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showPage:false,
    contentId:null,
    mainInfo:{},
    comments:[],
    hasMore:false,
    curPage:1,
    commentContent:""
  },
  changeComment:function(e){
    this.setData({
      commentContent: e.detail.value
    })
  },
  saveComment: function () {
    if (this.data.commentContent == '') return;
    const params = {
      apiUrl: "/Discuss/savecomment",
      requestData: {
        contentid: this.data.contentId,
        content: this.data.commentContent
      },
      requestMethod: "POST"
    }
    const ajaxRequest = util.request(params)
    ajaxRequest.then(res => {
      let commentList = this.data.comment
      commentList.unshift(res.data.info)
      this.setData({
        comment:commentList
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const contentId = options.id
    const params = {
      apiUrl: "/Discuss/content",
      requestData: {
        contentid: contentId,
      }
    }
    const ajaxRequest = util.request(params)
    ajaxRequest.then(res => {
      this.setData({
        showPage:true,
        contentId,
        mainInfo: res.data.content,
        comment: res.data.comment,
        hasMore:res.data.hasMore
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
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  }

})