// pages/home/mycompany/detail/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    comInfo: {
      name:"",
      comType:"",
      comStatus:"",
      startTime:"",
      shxyCode:"",
      address:""
    }
  },



  /** 
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const requestParams = {
      apiUrl:"/Home/company"
    }
    app.ajax(requestParams).then(res=>{
      this.setData({
        comInfo:res.info
      })
    })

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

  }

 
})