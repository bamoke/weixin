//index.js
//获取应用实例
const app = getApp()
import util from "../../../utils/util"

Page({
  data: {
    showPage:false,
    curPage:1,
    hasMore:false,
    listDatas: []
  },
  onLoad: function() {
    var requestParams = {
      apiUrl:"/Course/index"
    }
    const request = util.request(requestParams)
    request.then(res=>{
      this.setData({
        showPage: true,
        banner:res.data.banner,
        hasMore:res.data.hasMore,
        listDatas:res.data.list
      })
    })

  },
  /**
     * 页面上拉触底事件的处理函数
     */
  onReachBottom: function () {
    if (!this.data.hasMore) return;
    const filter = this.data.filter
    let postData = {
      p: this.data.curPage + 1
    }
    filter.forEach(item => {
      if (item.selected > 0) {
        postData[item.catKey] = item.list[item.selected]
      }
    })
    console.log(postData)
    const requestParams = {
      apiUrl: "/Course/index",
      requestMethod: "GET",
      requestData: postData
    }
    const ajaxRequest = util.request(requestParams)
    ajaxRequest.then(res => {
      this.setData({
        hasMore: res.data.hasMore,
        listDatas: res.data.list
      })
    })
  }
})