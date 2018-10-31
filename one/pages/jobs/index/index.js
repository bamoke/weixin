//index.js
//获取应用实例
const app = getApp()
import util from "../../../utils/util"
Page({
  data: {
    showPage:false,
    statusArr:["招聘中","已开始","已完成","已中止"],
    statusClassArr:["notBegin","started","complete","isEnd"],
    banner:"",
    list:[]
  },
  goPartDetail:function(){
    wx.navigateTo({
      url: '/pages/index/partdetail/partdetail'
    })
  },
  onLoad: function () {
    const params = {
      apiUrl: "/Parttime/index",
      requestMethod: "GET"
    }
    const ajaxRequest = util.request(params)
    ajaxRequest.then(res => {
      this.setData({
        showPage: true,
        banner: res.data.banner,
        hasMore: res.data.hasMore,
        list: res.data.list
      })
    })
  }
})
