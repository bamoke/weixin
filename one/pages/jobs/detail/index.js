//index.js
//获取应用实例
const app = getApp()
import util from "../../../utils/util"
import * as WxParse from '../../../wxParse/wxParse.js'
Page({
  data: {
    showPage:false,
    jobId:null,
    statusArr: ["招聘中", "已开始", "已完成"],
    statusClassArr: ["notBegin", "started", "isEnd"],
    info:{},
    isMember:false
  },
  goPartsign:function(){
    wx.navigateTo({
      url: '/pages/index/partsign/partsign'
    })
  },
  onLoad: function (options) {
    const jobId= options.id
    this.setData({ jobId})
  },
  /**
 * 生命周期函数--监听页面显示
 */
  onShow: function () {
    const requestParams = {
      apiUrl: "/Jobs/detail",
      requestData:{id:this.data.jobId},
      requestMethod: "GET"
    }
    const ajaxRequest = util.request(requestParams)
    ajaxRequest.then(res => {
      WxParse.wxParse('wxparse_content', 'html', res.data.mainInfo.content, this)
      this.setData({
        showPage: true,
        info: res.data.mainInfo,
        isMember:res.data.isMember
      })
      console.log(this.data)
    })
  },
    /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
