// pages/fairs/detail/index.js
import util from '../../../utils/util'
import { comSizeArr} from '../../../utils/data'
import * as WxParse from '../../../wxParse/wxParse.js'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showPage: false,
    _sourceUri: app.globalData.sourceBaseUri,
    defaultLogo: '/static/images/default-logo.jpg',
    comSizeArr,
    currentTab:0,
    fairsInfo: {},
    comInfo:{},
    loading:false
  },

  /**
   * Action
   */
  loadMore:function(){
    const fairId = this.data.fairsInfo.id
    const comInfo = this.data.comInfo
    const page = parseInt(comInfo.page) + 1
    const params = {
      apiUrl: "/Fairs/get_comlist/fid/" + fairId + '/p/'+page,
      requestMethod: "GET"
    }
    this.setData({loading:true})
    const ajaxRequest = util.request(params)
    ajaxRequest.then(res => {
      comInfo.page = parseInt(res.comInfo.page) + 1
      comInfo.total = res.comInfo.total
      comInfo.hasMore = res.comInfo.hasMore
      comInfo.list = comInfo.list.concat(res.comInfo.list)
      this.setData({
        comInfo,
        loading:false
      })
    })   
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const id = options.id;
    const params = {
      apiUrl: "/Fairs/detail/id/"+id,
      requestMethod: "GET"
    }
    const ajaxRequest = util.request(params)
    ajaxRequest.then(res => {
      WxParse.wxParse('wxparse_introduce_content', 'html', res.fairsInfo.introduce, this)
      WxParse.wxParse('wxparse_preach_content', 'html', res.fairsInfo.preach, this)
      this.setData({
        showPage: true,
        comInfo: res.comInfo,
        fairsInfo: res.fairsInfo
      })
    })
  },

  /**
   * switch nav
   */
  swichNav: function(e) {
    const index = e.currentTarget.dataset.index
    this.setData({
      currentTab: parseInt(index)
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