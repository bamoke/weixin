//index.js
//获取应用实例
const app = getApp()
import util from "../../../utils/util"

Page({
  data: {
    showPage: false,
    banner: "",
    dynamicList: []
  },
  onLoad: function() {
    const params = {
      apiUrl: "/Class/index",
      requestData: {
        id: this.data.courseId
      },
      requestMethod: "GET"
    }
    const ajaxRequest = util.request(params)
    ajaxRequest.then(res => {
      this.setData({
        showPage: true,
        banner: res.data.banner,
        dynamicList: res.data.dynamicList
      })
    })
  }


})