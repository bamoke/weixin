//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    dataLoaded: true
  },

  onLoad: function() {
    app.ajax({
      apiUrl:"/Index/index",
      isLoaded: this.data.dataLoaded
    }).then(res=>{

    })
  }

})