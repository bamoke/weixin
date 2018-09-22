//index.js
//获取应用实例
import util from '../../utils/util'
const app = getApp()

Page({
  data: {
    showPage: false,
    imgSourceUri: app.globalData.sourceBaseUri,
    curPage:1,
    fairs:[],
    banner:[]
  },
  //事件处理函数

  onLoad: function() {
    const params = {
      apiUrl:"/Index/index",
      requestMethod:"GET"
    }
    const ajaxRequest = util.request(params)
    ajaxRequest.then(res=>{
      this.setData({
        showPage:true,
        banner:res.banner,
        fairs: res.fairs
      })
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})