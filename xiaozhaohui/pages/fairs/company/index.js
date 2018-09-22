// pages/fairs/company/index.js
import util from '../../../utils/util'
import * as WxParse from '../../../wxParse/wxParse.js'
import {
  eduArr,
  wagesArr,
  comSizeArr
} from '../../../utils/data'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showPage: false,
    eduArr,
    wagesArr,
    comSizeArr,
    _sourceUri: app.globalData.sourceBaseUri,
    defaultLogo: '/static/images/default-logo.jpg',
    currentTab: 0,
    jobInfo:{},
    comInfo:{},
    jobLoading:false
  },
  /**
   * swichTab
   */
  swichTab: function(e) {
    const index = e.currentTarget.dataset.index
    this.setData({
      currentTab: parseInt(index)
    })
  },
  loadMore:function(){
    if(this.data.jobLoading) return
    this.setData({jobLoading:true})
    const requestParams = {
      apiUrl:"/Jobs/get_comjobs",
      requestData:{
        p: parseInt(this.data.jobsInfo.page)+1,
        comid:parseInt(this.data.comInfo.id)
      },
      requestMethod:"GET"
    }
    const ajaxRequest = util.request(requestParams)
    ajaxRequest.then(res=>{
      let newList = this.data.jobsInfo.list.concat(res.info.list)
      let newJobsInfo = {
        list:newList,
        page:res.info.page,
        total:res.info.total,
        hasMore:res.info.hasMore
      }
      newJobsInfo.list = newList
      this.setData({
        jobLoading:false,
        jobsInfo:newJobsInfo
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const id = options.id
    const params = {
      apiUrl: "/Company/detail/id/" + id,
      requestMethod: "GET"
    }
    const ajaxRequest = util.request(params)
    ajaxRequest.then(res => {
      WxParse.wxParse('wxparse_introduce_content', 'html', res.comInfo.introduce, this)
      this.setData({
        showPage: true,
        comInfo: res.comInfo,
        jobsInfo: res.jobInfo
      })
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})