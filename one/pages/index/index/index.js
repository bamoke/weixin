//index.js
//获取应用实例
const app = getApp()
import util from "../../../utils/util"
Page({
  data: {
    showPage:false,
    indicatorColor:"#C4C4C4",
    indicatorActiveColor:"#1B7ED5",
    banner:[],
    courseList:[]
  },
  onLoad: function () {
    const params = {
      apiUrl: "/Index/index",
      requestMethod: "GET"
    }
    const ajaxRequest = util.request(params)
    ajaxRequest.then(res => {
      this.setData({
        showPage: true,
        banner: res.data.banner,
        courseList:res.data.courseList
      })
    })
  }
})
