// pages/home/mycompany/detail/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showPage: false,
    showDlInfo:false,
    showSlInfo:false,
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
 * handle
 */
  showOther(e){
    const type = e.currentTarget.dataset.type
    if(type == 'dl') {
      this.setData({
        showDlInfo: !this.data.showDlInfo,
        showSlInfo: false
      })
    }else if(type == 'sl') {
      this.setData({
        showSlInfo: !this.data.showSlInfo,
        showDlInfo:false
      })
    }
  },
  /** 
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var objectId = ""
    if(typeof options.id !== "undefined") {
      objectId = options.id
    }
    const requestParams = {
      apiUrl:"/Mycom/detail",
      requestData: { id: objectId}
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