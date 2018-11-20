// pages/discuss/index/index.js
const app = getApp()
import util from "../../../utils/util"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showPage:false,
    parttimeId:null,
    list:[]
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
    const params = {
      apiUrl: "/Discuss/index",
      requestMethod: "GET",
      requestData: { obj_id: parttimeId, type: 2 }
    }
    const ajaxRequest = util.request(params)
    ajaxRequest.then(res => {
      this.setData({
        showPage: true,
        list: res.data.list
      })
    }).catch(reject => {
      console.log("s")
    })
  }

})