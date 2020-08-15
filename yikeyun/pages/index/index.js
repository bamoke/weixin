//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    showPage: false,
    classList: []
  },
  //事件处理函数

  onShow: function () {
    const params = {
      apiUrl: "/Index/index",
      requestMethod: "GET"
    }
    const ajaxRequest = app.ajax(params)
    ajaxRequest.then(res => {
      this.setData({
        showPage: true,
        classList: res.data.classList
      })
    })
  }
})