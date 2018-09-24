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
  onShareAppMessage(){
    
  }
})