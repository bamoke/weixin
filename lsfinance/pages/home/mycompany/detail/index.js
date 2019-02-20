// pages/home/mycompany/detail/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showPage: false,
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
    if(!options.id) {
      wx.showModal({
        content: '参数错误',
        showCancel:false,
        success:function(res){
          if(res.confirm){
            wx.navigateBack({
              delta:1
            })
          }
        }
      })
    }
    const objectId = options.id
    const requestParams = {
      apiUrl:"/Mycom/detail",
      requestData: { id: objectId}
    }
    app.ajax(requestParams).then(res=>{
      console.log(res)
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