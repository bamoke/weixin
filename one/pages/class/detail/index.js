//index.js
//获取应用实例
const app = getApp()
import util from "../../../utils/util"

Page({
  data: {
    showPage: false,
    hasMore:false,
    id:null,
    curPage:1,
    banner: "",
    dynamicList: []
  },

  onLoad: function(options) {
    const id = options.id
    const params = {
      apiUrl: "/Class/detail",
      requestData: {
        id: id
      },
      requestMethod: "GET"
    }
    const ajaxRequest = util.request(params)
    ajaxRequest.then(res => {
      this.setData({
        showPage: true,
        id:id,
        banner: res.data.banner,
        dynamicList: res.data.dynamicList,
        hasMore:res.data.hasMore
      })
    })
  },

  /**
 * 页面上拉触底事件的处理函数
 */
  onReachBottom: function () {
    if (!this.data.hasMore) return;
    let postData = {
      id:this.data.id,
      p: this.data.curPage + 1
    }
    console.log(postData)
    const requestParams = { 
      apiUrl: "/Class/detail",
      requestMethod: "GET",
      requestData: postData
    }
    const ajaxRequest = util.request(requestParams)
    ajaxRequest.then(res => {
      this.setData({
        hasMore: res.data.hasMore,
        dynamicList: this.data.dynamicList.concat(res.data.dynamicList),
        curPage: res.data.page
      })
    })
  }


})