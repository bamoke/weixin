// pages/ticket/index/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showPage:false,
    type:0,//0:正常进入;1:扫入场码进入
    code:""
  },
  scanCode: function () {
    wx.scanCode({
      success(res) {
        console.log(res)
        let requestParams = {
          apiUrl: '/Ticket/index',
          requestData: { type: 1 }
        }

        app.ajax(requestParams).then(res => {
          this.setData({
            code: res.data.code,
            hasResume: res.data.hasResume
          })
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.type){
      this.setData({type:options.type})
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let requestParams = {
      apiUrl: '/Ticket/index',
      requestData: {type:this.data.type}
    }

    app.ajax(requestParams).then(res => {
      this.setData({
        showPage:true,
        code:res.data.code,
        hasResume:res.data.hasResume
      })
    })
  }

 
})