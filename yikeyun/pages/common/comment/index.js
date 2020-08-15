// pages/common/comment/index.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showPage: true,
    proId: null,
    commentType: null,
    title: ""
  },

  /**
   * 提交评论
   */
  formSubmit: function (data) {
    var requestData = {
      pro_title: this.data.title,
      pro_id: this.data.proId,
      type: this.data.commentType,
      content: data.detail.value.content
    }
    if (requestData.content == '') {
      wx.showToast({
        title: '请输入评论内容',
        image: '/static/images/icon-error.png'        
      })
      return;
    }
    const requestParams = {
      apiUrl: '/Comment/doadd',
      requestData,
      requestMethod:"POST"
    }
    var myPromise = app.ajax(requestParams);
    myPromise.then(function(){
      wx.showModal({
        title:'提交成功',
        content:'评论将在通过审核后显示，感谢您的参与！',
        showCancel: false,
        success:function(){
        wx.navigateBack({
          delta:1
        })
        }
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      title:options.title,
      proId:options.proid,
      commentType:options.type

    })
  }

  
})