// pages/discuss/content/add/index.js
const app = getApp()
import util from "../../../../utils/util"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    discussId: null,
    nodeId: null,
    content: '',
    colorSelected: 0,
    colorArr: ["bbb", "99cbf2", "7ed1d1", "7ed19b", "f5a693", "d1c27e", "d18c7e", "a97ed1"]
  },

  selectColor: function(e) {
    if (typeof e.target.dataset.index == 'undefined') return
    this.setData({
      colorSelected: e.target.dataset.index
    })
  },
  changeContent: function(e) {
    this.setData({
      content: e.detail.value
    })
  },
  saveContent: function() {
    if (this.data.content == '') {
      wx.showToast({
        title: '内容不能为空',
        image: "/static/images/icon-error.png"
      })
      return
    }

    const params = {
      apiUrl: "/Discuss/savecont",
      requestData: {
        discussid: this.data.discussId,
        nodeid: this.data.nodeId,
        content: this.data.content,
        color: this.data.colorArr[this.data.colorSelected]
      },
      requestMethod: "POST"
    }
    const ajaxRequest = util.request(params)
    ajaxRequest.then(res => {
      wx.showToast({
        title: res.msg,
        icon: "success"
      })
      setTimeout(function() {
        wx.navigateBack({
          delta: 1
        })
      }, 1000)

    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      discussId: options.discussid,
      nodeId: options.nodeid
    })

  }
})