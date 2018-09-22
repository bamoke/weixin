// pages/job/list/index.js
import util from '../../../utils/util'
import { eduArr, wagesArr } from '../../../utils/data'
const app = getApp()
const filter = [{
  name: '区域',
  catKey: 'area',
  selected: 0,
  list: ['全部', '广州', '深圳', '珠海', '中山']
},
{
  name: '薪资',
  catKey: 'wage',
  selected: 0,
  list: ['全部', '面议', '2k-5k', '5k-8k', '8k-12k', '12k-15k', '15k-20k', '20k-30k']
}
]

Page({

  /**
   * 页面的初始数据
   */
  data: {
    eduArr,
    wagesArr,
    filter,
    imgSourceUri: app.globalData.sourceBaseUri,
    curOpenType: '', //当前展开的过滤选项类别
    showOpt: false, //是否展开过滤选项
    showPage:false,
    hasMore:false,
    curPage:1,
    isLoading:false,
    list:[],
    keywords:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const requestParams = {
      apiUrl: "/Jobs/vlist",
      requestMethod: "GET"
    }
    const ajaxRequest = util.request(requestParams)
    ajaxRequest.then(res => {
      this.setData({
        showPage: true,
        hasMore: res.info.hasMore,
        list: res.info.list
      })
    })
  },
  /**
   * Action
   */
  setkeywords: function (event){
    var keywords = event.detail.value
    this.setData({
      keywords
    })
  },
  gosearch: function (event){
    var keywords = event.detail.value || this.data.keywords;
    const requestParams = {
      apiUrl: "/Jobs/vlist",
      requestMethod: "GET",
      requestData: {}
    }
    if (keywords.trim()){
      requestParams.requestData.keywords = keywords
    }

    const ajaxRequest = util.request(requestParams)
    ajaxRequest.then(res => {
      this.setData({
        hasMore: res.info.hasMore,
        list: res.info.list
      })
    })
  },
  showFilterOpt: function(e) {
    // return;
    const type = e.currentTarget.dataset.type;
    const oldOpenType = this.data.curOpenType
    let updateData = {
      curOpenType: type
    }
    if (this.data.showOpt) {
      if (oldOpenType == type) {
        updateData.showOpt = false
      }
    } else {
      updateData.showOpt = true
    }
    this.setData({
      ...updateData
    })
  },
  // selected filter option
  selectFilter: function(e) {
    const index = e.currentTarget.dataset.optindex
    const curOpenType = this.data.curOpenType
    let postData = {}
    const newFilter = this.data.filter.map(item => {
      let res = { ...item
      }
      if (item.catKey === curOpenType) {
        res.selected = parseInt(index)
      }
      return res
    })
    this.setData({
      filter: newFilter,
      showOpt: false
    })
    // set post data
    newFilter.forEach(item => {
      if (item.selected > 0) {
        postData[item.catKey] = item.list[item.selected]
      }
    })
    console.log(postData)
  },
  // close filter option
  closeDynamic: function() {
    this.setData({
      showOpt: false
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
    if (!this.data.hasMore) return;
    const filter = this.data.filter
    let postData = {
      p: this.data.curPage + 1
    }
    filter.forEach(item => {
      if (item.selected > 0) {
        postData[item.catKey] = item.list[item.selected]
      }
    })
    console.log(postData)
    const requestParams = {
      apiUrl: "/Jobs/vlist",
      requestMethod: "GET",
      requestData:postData
    }
    const ajaxRequest = util.request(requestParams)
    ajaxRequest.then(res => {
      this.setData({
        hasMore: res.info.hasMore,
        list: this.data.list.concat(res.info.list),
        curPage:res.info.page
      })
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})