// pages/home/mycompany/detail/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showPage: false,
    comInfo: {
      name:"珠海市巴莫克网络科技有限公司",
      comType:"小规模企业",
      comStatus:"代理中",
      startTime:"2018-09-01",
      shxyCode:"333",
      address:"珠海市横琴新区急撒打算"

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