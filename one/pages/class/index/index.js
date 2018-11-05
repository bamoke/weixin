//index.js
//获取应用实例
const app = getApp()
import util from "../../../utils/util"

Page({
  data: {
    showPage: false,
    hasMore:false,
    curPage:1,
    list: []
  },

  onShow: function(options) {
    const params = {
      apiUrl: "/Myclass/index",
      requestMethod: "GET"
    }
    const ajaxRequest = util.request(params)
    ajaxRequest.then(res => {
      this.setData({
        showPage: true,
        list: res.data.list,
        hasMore:res.data.hasMore
      })
    }).catch(reject=>{
      console.log("s")
    })
  },

  /**
 * 页面上拉触底事件的处理函数
 */
  onReachBottom: function () {
    if (!this.data.hasMore) return;
    let postData = {
      p: this.data.curPage + 1
    }
    console.log(postData)
    const requestParams = {
      apiUrl: "/Myclass/index",
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