//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    showPage: false,
    curPage: 1,
    course: [],
    column: [],
    article: [],
    banner: []
  },
  //事件处理函数

  onLoad: function () {
    const params = {
      apiUrl: "/Index/index",
      requestMethod: "GET"
    }
    const ajaxRequest = app.ajax(params)
    ajaxRequest.then(res => {
      console.log(res)
      this.setData({
        showPage: true,
        banner: res.data.banner,
        column: res.data.column,
        course: res.data.course,
        article: res.data.article
      })
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})