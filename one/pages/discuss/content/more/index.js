// pages/discuss/content/more/index.js
const app = getApp()
import util from "../../../../utils/util"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showPage:false,
    nodeId:null,
    discussId:null,
    nodeInfo:{},
    contentList:[],
    curPage:1,
    hasMore:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      discussId:options.discussid,
      nodeId:options.nodeid
    })
  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const params = {
      apiUrl: "/Discuss/content_list",
      requestMethod: "GET",
      requestData: { nodeid: this.data.nodeId}
    }
    const ajaxRequest = util.request(params)
    ajaxRequest.then(res => {
      this.setData({
        showPage: true,
        nodeInfo:res.data.nodeInfo,
        contentList: res.data.list,
        curPage:res.data.page,
        hasMore:res.data.hasMore
      })
    }).catch(reject => {
      console.log("s")
    })
  },




  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  }

})