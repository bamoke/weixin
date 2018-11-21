// pages/myparttime/detail/index.js
const app = getApp()
import util from "../../../utils/util"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showPage:false,
    parrtimeId:null,
    parttimeInfo:{},
    StageArr: ['未开始', '进行中', '已完成', '已中止']
  },
  toDiscuss: function () {
    const requestParams = {
      apiUrl: "/ParttimeMy/discuss",
      requestData:{parttimeid:this.data.parttimeId},
      requestMethod: "GET",
      isShowLoad: false
    }
    const ajaxRequest = util.request(requestParams)
    ajaxRequest.then(res => {
      if (res.data.resumeid) {
        wx.navigateTo({
          url: '/pages/discuss/detail/index?id=' + res.data.discussid
        })
      } else {
        wx.showModal({
          content: '还没有创建讨论组',
          showCancel:false
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const parttimeId = options.parttimeid
    this.setData({ parttimeId})
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
    const parttimeId = this.data.parttimeId
    const requestParams = {
      apiUrl: "/ParttimeMy/detail",
      requestMethod: "GET",
      requestData: { id: parttimeId }
    }
    const ajaxRequest = util.request(requestParams)
    ajaxRequest.then(res => {
      this.setData({
        showPage: true,
        parttimeId,
        parttimeInfo: res.data.parttimeInfo
      })
    })
  }



  

})