// pages/home/feedback/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  submitForm:function(e){
    const data = e.detail.value
    if(data.content == '') {
      wx.showToast({
        title: '请输入内容',
        image:"/static/images/icon-error.png"
      })
      return
    }
    if (data.contact == '') {
      wx.showToast({
        title: '请输入联系人信息',
        image: "/static/images/icon-error.png"
      })
      return
    }
    let requestParams = {
      apiUrl: '/Home/feedback',
      requestData: data,
      requestMethod:"POST"
    }
    app.ajax(requestParams).then(res => {
      wx.showToast({
        title: '提交成功，感谢您反馈',
        icon:"success"
      })
      setTimeout(function(){
        wx.navigateBack({
          delta:1
        })
      },1000)
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  }
})