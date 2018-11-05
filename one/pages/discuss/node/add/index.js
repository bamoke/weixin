// pages/discuss/node/add/index.js
const app = getApp()
import util from "../../../../utils/util"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    discussId:null,
    title:''
  },

  change:function(e){
    let value = e.detail.value
    this.setData({
      title:value
    })
  },
  saveNode:function(){
    if (this.data.title == '') {
      wx.showToast({
        title: '节点名称不能为空',
        image:"/static/images/icon-error.png"
      })
      return
    }

    const params = {
      apiUrl: "/Discuss/savenode",
      requestData: {
        discussid: this.data.discussId,
        title:this.data.title
      },
      requestMethod: "POST"
    }
    const ajaxRequest = util.request(params)
    ajaxRequest.then(res => {
      wx.showToast({
        title: res.msg,
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
    this.setData({
      discussId:options.discussid
    })
  }

})